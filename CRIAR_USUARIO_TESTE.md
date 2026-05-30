# Como criar usuário de teste para upload de anexos

## Método 1: Via Supabase Dashboard (Recomendado)

1. Acesse: https://supabase.com/dashboard/project/nqrqsrdugsuvrdqaiail/auth/users
2. Clique em "Add user"
3. Preencha:
   - Email: `test@abb.com`
   - Senha: `test123!`
   - Auto Confirm User: ✅ marcado
4. Clique em "Create user"

5. Acesse SQL Editor: https://supabase.com/dashboard/project/nqrqsrdugsuvrdqaiail/sql/new
6. Copie e cole o conteúdo do arquivo `scripts/create-test-user.sql`
7. Execute o SQL

## Método 2: Via Supabase CLI (Avançado)

```bash
npx supabase gen types typescript --linked
npx supabase db reset
```

## Após criar usuário

1. Acesse: https://roboticsportal.com.br/login
2. Email: `test@abb.com`
3. Senha: `test123!`
4. Navegue para: /complaints
5. Clique em qualquer registro
6. Tente fazer upload de um anexo

## Se ainda der erro 500

Abra o console do navegador (F12) e verifique:
1. Aba Console - procure por erros vermelhos
2. Aba Network - procure pela requisição POST /api/nps/[id]/attachments
3. Clique na requisição e veja o Response

Me envie o erro exato que aparecer.