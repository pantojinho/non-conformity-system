-- Criar usuário de teste para upload de anexos
-- Email: test@abb.com
-- Senha: test123!

-- 1. Criar usuário no Supabase Auth (você precisa fazer isso via Dashboard ou CLI)
-- Nota: Esta parte precisa ser feita via Supabase Dashboard > Authentication > Add user

-- 2. Após criar o auth user, execute o comando abaixo para criar o perfil vinculado:
INSERT INTO public.users (
  auth_user_id,
  name,
  email,
  role_id,
  organization_id,
  active
)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'test@abb.com' LIMIT 1),
  'Teste Upload',
  'test@abb.com',
  (SELECT id FROM public.roles WHERE name = 'admin' LIMIT 1),
  'a0000000-0000-0000-0000-000000000001',
  true
)
ON CONFLICT (auth_user_id) DO NOTHING;

SELECT 'Perfil de teste criado! Email: test@abb.com, Senha: test123!' AS result;