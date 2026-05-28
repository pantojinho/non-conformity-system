import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

/**
 * Verify the requester is authenticated and has admin role.
 * Uses service-role client for profile lookup to bypass RLS.
 */
export async function verifyAdmin() {
  // 1. Authenticate via cookies (anon key + JWT)
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { authorized: false as const, error: "Não autenticado", status: 401 };
  }

  // 2. Lookup profile using service role (bypasses RLS)
  const adminClient = createAdminClient();
  const { data: userProfile, error: profileError } = await adminClient
    .from("users")
    .select("role_id, is_active, roles(name)")
    .eq("auth_user_id", user.id)
    .single();

  if (profileError || !userProfile) {
    return { authorized: false as const, error: "Perfil não encontrado", status: 403 };
  }

  if (!userProfile.is_active) {
    return { authorized: false as const, error: "Usuário inativo", status: 403 };
  }

  // 3. Check role — admin or super_admin
  const roleName = (userProfile.roles as unknown as { name: string })?.name;
  if (roleName !== "admin" && roleName !== "super_admin") {
    // Fallback: check by role_id against admin/super_admin role IDs
    const { data: adminRole } = await adminClient
      .from("roles")
      .select("id")
      .eq("name", "admin")
      .single();

    const { data: superAdminRole } = await adminClient
      .from("roles")
      .select("id")
      .eq("name", "super_admin")
      .single();

    const allowedIds = [adminRole?.id, superAdminRole?.id].filter(Boolean);

    if (!allowedIds.includes(userProfile.role_id)) {
      return {
        authorized: false as const,
        error: "Acesso negado — requer perfil administrador",
        status: 403,
      };
    }
  }

  return { authorized: true as const, userId: user.id };
}
