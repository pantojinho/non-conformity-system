import { verifyAdmin } from "@/lib/auth/verify-admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

// GET /api/admin/users — List all users with role and org names
export async function GET() {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const adminClient = createAdminClient();

  const { data, error } = await adminClient
    .from("users")
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
      updated_at,
      roles(name),
      organizations(name)
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }

  const users = data.map((u) => ({
    id: u.id,
    email: u.email,
    name: u.name,
    role_id: u.role_id,
    role_name: (u.roles as unknown as { name: string })?.name ?? "-",
    organization_id: u.organization_id,
    organization_name:
      (u.organizations as unknown as { name: string })?.name ?? "-",
    country: u.country,
    unit: u.unit,
    is_active: u.is_active,
    created_at: u.created_at,
  }));

  // Also fetch roles and orgs for dropdowns
  const [rolesResult, orgsResult] = await Promise.all([
    adminClient.from("roles").select("id, name").order("name"),
    adminClient.from("organizations").select("id, name").order("name"),
  ]);

  return NextResponse.json({
    users,
    roles: rolesResult.data ?? [],
    organizations: orgsResult.data ?? [],
  });
}

// POST /api/admin/users — Create a new user
// NOTE: The trigger on_auth_user_created auto-creates a public.users row
// with role 'usuario' when an auth user is created. We UPDATE that row
// instead of inserting a new one to avoid duplicate key errors.
export async function POST(request: Request) {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { email, password, name, role_id, organization_id, country, unit } =
      body;

    if (!email || !password || !name || !role_id || !organization_id) {
      return NextResponse.json(
        {
          error:
            "Campos obrigatórios: email, senha, nome, perfil, organização",
        },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();

    // 1. Create auth user (triggers on_auth_user_created → auto-creates public.users row)
    const { data: authData, error: authError } =
      await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { name },
      });

    if (authError) {
      console.error("Error creating auth user:", authError);
      return NextResponse.json(
        {
          error: `Erro ao criar usuário de autenticação: ${authError.message}`,
        },
        { status: 400 }
      );
    }

    const authUserId = authData.user.id;

    // 2. UPDATE the profile auto-created by the trigger
    const { data: userData, error: updateError } = await adminClient
      .from("users")
      .update({
        name,
        role_id,
        organization_id,
        country: country ?? "brasil",
        unit: unit ?? null,
        is_active: true,
      })
      .eq("auth_user_id", authUserId)
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
      console.error("Error updating auto-created profile:", updateError);
      // Cleanup: delete the auth user if profile update fails
      await adminClient.auth.admin.deleteUser(authUserId);
      return NextResponse.json(
        { error: `Erro ao criar perfil: ${updateError.message}` },
        { status: 400 }
      );
    }

    // Edge case: trigger didn't create profile (unlikely but handle it)
    if (!userData) {
      console.warn("Trigger didn't create profile, inserting manually...");
      const { data: insertData, error: insertError } = await adminClient
        .from("users")
        .insert({
          auth_user_id: authUserId,
          email,
          name,
          role_id,
          organization_id,
          country: country ?? "brasil",
          unit: unit ?? null,
          is_active: true,
        })
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

      if (insertError) {
        console.error("Error inserting user manually:", insertError);
        await adminClient.auth.admin.deleteUser(authUserId);
        return NextResponse.json(
          { error: `Erro ao criar perfil: ${insertError.message}` },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { user: formatUser(insertData) },
        { status: 201 }
      );
    }

    return NextResponse.json({ user: formatUser(userData) }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error in POST /api/admin/users:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

function formatUser(userData: Record<string, unknown>) {
  return {
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
}
