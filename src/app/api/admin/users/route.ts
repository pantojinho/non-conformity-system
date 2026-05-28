import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Helper: verify the requester is authenticated and has admin role
async function verifyAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { authorized: false, error: "Não autenticado", status: 401 };
  }

  const { data: userProfile, error: profileError } = await supabase
    .from("users")
    .select("role_id, is_active, roles(name)")
    .eq("auth_user_id", user.id)
    .single();

  if (profileError || !userProfile) {
    return { authorized: false, error: "Perfil não encontrado", status: 403 };
  }

  if (!userProfile.is_active) {
    return { authorized: false, error: "Usuário inativo", status: 403 };
  }

  // Check if the role is admin or super_admin
  const roleName = (userProfile.roles as unknown as { name: string })?.name;
  if (roleName !== "admin" && roleName !== "super_admin") {
    const { data: adminRole } = await supabase
      .from("roles")
      .select("id")
      .eq("name", "admin")
      .single();

    const { data: superAdminRole } = await supabase
      .from("roles")
      .select("id")
      .eq("name", "super_admin")
      .single();

    const allowedIds = [adminRole?.id, superAdminRole?.id].filter(Boolean);

    if (!allowedIds.includes(userProfile.role_id)) {
      return {
        authorized: false,
        error: "Acesso negado — requer perfil administrador",
        status: 403,
      };
    }
  }

  return { authorized: true, userId: user.id };
}

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

    // 1. Create auth user
    const { data: authData, error: authError } =
      await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
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

    // 2. Insert into public.users
    const { data: userData, error: insertError } = await adminClient
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
      console.error("Error inserting user:", insertError);
      // Cleanup: delete the auth user if public insert fails
      await adminClient.auth.admin.deleteUser(authUserId);
      return NextResponse.json(
        { error: `Erro ao criar perfil: ${insertError.message}` },
        { status: 400 }
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

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error in POST /api/admin/users:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
