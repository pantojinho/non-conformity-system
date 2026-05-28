import { verifyAdmin } from "@/lib/auth/verify-admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

// PATCH /api/admin/users/[id] — Update user
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { name, role_id, organization_id, country, unit, is_active, password } =
      body;

    const adminClient = createAdminClient();

    // First, get the user to find their auth_user_id
    const { data: existingUser, error: fetchError } = await adminClient
      .from("users")
      .select("id, auth_user_id, is_active")
      .eq("id", id)
      .single();

    if (fetchError || !existingUser) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Build update object
    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name;
    if (role_id !== undefined) updateData.role_id = role_id;
    if (organization_id !== undefined)
      updateData.organization_id = organization_id;
    if (country !== undefined) updateData.country = country;
    if (unit !== undefined) updateData.unit = unit || null;
    if (is_active !== undefined) updateData.is_active = is_active;

    // Update public.users
    const { data: userData, error: updateError } = await adminClient
      .from("users")
      .update(updateData)
      .eq("id", id)
      .select(
        `
        id,
        email,
        name,
        role_id,
        organization_id,
        country,
        unit,
        is_active,
        created_at,
        roles(name),
        organizations(name)
      `
      )
      .single();

    if (updateError) {
      console.error("Error updating user:", updateError);
      return NextResponse.json(
        { error: `Erro ao atualizar usuário: ${updateError.message}` },
        { status: 400 }
      );
    }

    // If toggling is_active to false, ban the auth user too
    if (is_active === false && existingUser.auth_user_id) {
      await adminClient.auth.admin.updateUserById(
        existingUser.auth_user_id,
        { ban_duration: "876000h" } // Effectively permanent ban
      );
    } else if (is_active === true && existingUser.auth_user_id) {
      // Unban the user
      await adminClient.auth.admin.updateUserById(
        existingUser.auth_user_id,
        { ban_duration: "none" }
      );
    }

    // If password is provided, update it
    if (password && existingUser.auth_user_id) {
      await adminClient.auth.admin.updateUserById(
        existingUser.auth_user_id,
        { password }
      );
    }

    const user = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role_id: userData.role_id,
      role_name: (userData.roles as unknown as { name: string })?.name ?? "-",
      organization_id: userData.organization_id,
      organization_name:
        (userData.organizations as unknown as { name: string })?.name ?? "-",
      country: userData.country,
      unit: userData.unit,
      is_active: userData.is_active,
      created_at: userData.created_at,
    };

    return NextResponse.json({ user });
  } catch (err) {
    console.error("Unexpected error in PATCH /api/admin/users/[id]:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] — Soft delete (deactivate)
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { id } = await params;
    const adminClient = createAdminClient();

    // Get user first
    const { data: existingUser, error: fetchError } = await adminClient
      .from("users")
      .select("id, auth_user_id")
      .eq("id", id)
      .single();

    if (fetchError || !existingUser) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // Soft delete: set is_active = false
    const { error: updateError } = await adminClient
      .from("users")
      .update({ is_active: false })
      .eq("id", id);

    if (updateError) {
      console.error("Error deactivating user:", updateError);
      return NextResponse.json(
        { error: "Erro ao desativar usuário" },
        { status: 500 }
      );
    }

    // Also disable the auth user
    if (existingUser.auth_user_id) {
      await adminClient.auth.admin.updateUserById(
        existingUser.auth_user_id,
        { ban_duration: "876000h" }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error in DELETE /api/admin/users/[id]:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
