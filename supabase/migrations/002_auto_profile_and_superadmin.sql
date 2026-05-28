-- ============================================================
-- Migration 002: Auto-create profile on signup + super_admin role
-- ============================================================

-- 1. Add super_admin role (if not exists)
INSERT INTO public.roles (id, name, description, permissions)
VALUES (
  'b0000000-0000-0000-0000-000000000008',
  'super_admin',
  'Super administrador — acesso total, gerenciar admins',
  '{"*": {"*": true}}'
) ON CONFLICT DO NOTHING;

-- 2. Function: auto-create public.users row when auth user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (auth_user_id, email, name, role_id, organization_id, country, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    (SELECT id FROM public.roles WHERE name = 'usuario' LIMIT 1),
    (SELECT id FROM public.organizations LIMIT 1),
    'brasil',
    true
  );
  RETURN NEW;
END;
$$;

-- 3. Trigger on auth.users INSERT
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Function: auto-update auth_user_id when public.users row links to auth
-- (for cases where admin creates user via dashboard first, then auth signup happens)
CREATE OR REPLACE FUNCTION public.link_auth_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If this INSERT has no auth_user_id but there's an existing auth user with same email
  IF NEW.auth_user_id IS NULL THEN
    NEW.auth_user_id := (
      SELECT id FROM auth.users WHERE email = NEW.email LIMIT 1
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_user_insert_link_auth ON public.users;
CREATE TRIGGER on_user_insert_link_auth
  BEFORE INSERT ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.link_auth_user();
