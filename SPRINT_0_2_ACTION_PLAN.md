# Sprint 0.2 - Action Plan (Plano de Ação Imediato)

> **Foco:** Polir visual, cores, ícones, i18n, testes antes de Sprint 1

---

## 🎯 Fase 1 - Design System & Identidade Visual (PRIORIDADE #1)

### Tarefa 1.1: Definir Paleta de Cores ABB Robotics
**Status:** ⏳ TODO
**Responsável:** Gabriel (aprovação visual)
**Estimativa:** 2 horas

**O que fazer:**
1. Pesquisar branding ABB Robotics (cores oficiais)
2. Definir primary color (ABB red? blue?)
3. Definir secondary color
4. Definir palette: success, warning, danger, info
5. Definir neutral scale (grays)
6. Testar contraste WCAG AA

**Entregável:** Documento `/docs/design-system/colors.md` com hex codes + CSS tokens

---

### Tarefa 1.2: Definir Tipografia
**Status:** ⏳ TODO
**Responsável:** Gabriel (aprovação visual)
**Estimativa:** 1 hora

**O que fazer:**
1. Escolher font family oficial (Roboto? Inter?)
2. Definir escala de tamanhos (text-xs até text-4xl)
3. Definir line-heights
4. Definir font weights (300, 400, 500, 600, 700)

**Entregável:** Documento `/docs/design-system/typography.md`

---

### Tarefa 1.3: Padronizar Ícones
**Status:** ⏳ TODO
**Responsável:** AI agent + Gabriel revisão
**Estimativa:** 2 horas

**O que fazer:**
1. Audit all icon usage atual
2. Criar mapeamento: conceito → ícone Lucide
3. Substituir ícones inconsistentes
4. Criar guideline de uso de ícones
5. Documentar ícones no design system

**Entregável:** Documento `/docs/design-system/icons.md` + code changes

---

### Tarefa 1.4: Aplicar Design System aos Componentes UI
**Status:** ⏳ TODO
**Responsável:** AI agent
**Estimativa:** 3 horas

**O que fazer:**
1. Atualizar `src/app/globals.css` com novos tokens
2. Atualizar todos componentes UI com nova paleta
3. Atualizar componentes com nova tipografia
4. Testar dark mode com novos tokens
5. Testar contraste

**Entregável:** Componentes UI atualizados + CSS tokens aplicados

---

## 🎯 Fase 2 - Melhorar Pages Auth (PRIORIDADE #2)

### Tarefa 2.1: Redesign Login Page
**Status:** ⏳ TODO
**Responsível:** AI agent + Gabriel aprovação
**Estimativa:** 2 horas

**O que fazer:**
1. Adicionar logo/branding ABB
2. Melhorar layout e spacing
3. Adicionar ilustração/hero image
4. Melhorar visual de form (inputs, buttons)
5. Adicionar social login buttons (Google, Microsoft)
6. Adicionar "Forgot password?" link
7. Adicionar "Remember me" checkbox
8. Melhorar loading states
9. Melhorar error handling (inline)
10. Testar mobile/tablet/desktop

**Entregável:** `src/app/(auth)/login/page.tsx` redesign

---

### Tarefa 2.2: Redesign Signup Page
**Status:** ⏳ TODO
**Responsível:** AI agent + Gabriel aprovação
**Estimativa:** 2 horas

**O que fazer:**
1. Adicionar logo/branding ABB
2. Melhorar layout (multi-step?)
3. Adicionar password strength indicator
4. Adicionar terms checkbox
5. Melhorar validation real-time
6. Melhorar visual com novo design system
7. Testar mobile/tablet/desktop

**Entregável:** `src/app/(auth)/signup/page.tsx` redesign

---

### Tarefa 2.3: Criar Forgot Password Page
**Status:** ⏳ TODO
**Responsível:** AI agent
**Estimativa:** 1 hora

**O que fazer:**
1. Criar página `/forgot-password`
2. Form com email input
3. Submit button com loading
4. Success message
5. Link back to login

**Entregável:** `src/app/(auth)/forgot-password/page.tsx`

---

### Tarefa 2.4: Criar Reset Password Page
**Status:** ⏳ TODO
**Responsível:** AI agent
**Estimativa:** 1 hora

**O que fazer:**
1. Criar página `/reset-password/[token]`
2. Form com password + confirm password
3. Validation (match passwords)
4. Strength indicator
5. Submit button com loading
6. Success message + link to login

**Entregável:** `src/app/(auth)/reset-password/[token]/page.tsx`

---

## 🎯 Fase 3 - Internacionalização i18n (PRIORIDADE #3)

### Tarefa 3.1: Setup i18n
**Status:** ⏳ TODO
**Responsível:** AI agent
**Estimativa:** 2 horas

**O que fazer:**
1. Instalar `next-intl` ou `react-i18next`
2. Configurar locales: pt-BR, en-US, es-AR
3. Criar estrutura `/locales/pt-BR/`, `/locales/en-US/`, `/locales/es-AR/`
4. Criar arquivo `common.json` base
5. Configurar locale detection (browser + user pref)
6. Criar locale switcher component
7. Adicionar locale switcher no header

**Entregável:** i18n configurado + locale switcher

---

### Tarefa 3.2: Traduzir Common Terms
**Status:** ⏳ TODO
**Responsível:** AI agent + Gabriel revisão
**Estimativa:** 3 horas

**O que fazer:**
1. Criar dicionário `common.json`:
   - Navigation labels (Dashboard, NCs, Hazards, Documents, etc.)
   - Buttons (Save, Cancel, Delete, Submit, etc.)
   - Status labels (Open, Closed, Pending, etc.)
   - Errors messages
   - Success messages
   - Date formats
   - Number formats
2. Traduzir para pt-BR, en-US, es-AR
3. Aplicar traduções em componentes UI

**Entregável:** `locales/*/common.json` + componentes traduzidos

---

### Tarefa 3.3: Traduzir Auth Pages
**Status:** ⏳ TODO
**Responsível:** AI agent + Gabriel revisão
**Estimativa:** 2 horas

**O que fazer:**
1. Traduzir login page (labels, placeholders, buttons, errors)
2. Traduzir signup page
3. Traduzir forgot password page
4. Traduzir reset password page

**Entregável:** Auth pages traduzidas (3 idiomas)

---

### Tarefa 3.4: Traduzir Dashboard
**Status:** ⏳ TODO
**Responsível:** AI agent + Gabriel revisão
**Estimativa:** 2 horas

**O que fazer:**
1. Traduzir dashboard labels
2. Traduzir KPI titles
3. Traduzir activity feed
4. Traduzir quick actions

**Entregável:** Dashboard traduzido (3 idiomas)

---

## 🎯 Fase 4 - Testing & QA (PRIORIDADE #4)

### Tarefa 4.1: Testar Conexões Supabase
**Status:** ⏳ TODO
**Responsível:** AI agent + Gabriel manual
**Estimativa:** 2 horas

**O que fazer:**
1. Testar Auth:
   - [ ] Login com email/senha
   - [ ] Login com Google (se implementado)
   - [ ] Signup
   - [ ] Logout
   - [ ] Refresh token
   - [ ] Password reset flow
2. Testar Database queries:
   - [ ] List users
   - [ ] Create user
   - [ ] Update user
   - [ ] Delete user
3. Testar RLS policies:
   - [ ] Admin bypass
   - [ ] User can see own data
   - [ ] User cannot see others' data
4. Testar edge cases:
   - [ ] Network error
   - [ ] Timeout
   - [ ] Invalid credentials
   - [ ] Duplicate email

**Entregável:** Checklist de testes passando + report

---

### Tarefa 4.2: Testar Dark Mode
**Status:** ⏳ TODO
**Responsível:** AI agent + Gabriel manual
**Estimativa:** 1 hora

**O que fazer:**
1. Testar todos componentes UI em dark mode:
   - [ ] Button (todas variants)
   - [ ] Card
   - [ ] Badge
   - [ ] Alert
   - [ ] Input/Select/Textarea
   - [ ] Modal
   - [ ] Toast
   - [ ] KPICard
2. Testar pages em dark mode:
   - [ ] Login
   - [ ] Signup
   - [ ] Dashboard
   - [ ] Admin/users
3. Testar contraste em dark mode
4. Corrigir issues encontrados

**Entregável:** Dark mode testado e funcionando

---

### Tarefa 4.3: Testar Responsivo
**Status:** ⏳ TODO
**Responsível:** AI agent + Gabriel manual
**Estimativa:** 2 horas

**O que fazer:**
1. Testar mobile (< 640px):
   - [ ] Login page
   - [ ] Signup page
   - [ ] Dashboard
   - [ ] Sidebar mobile
   - [ ] Header mobile
2. Testar tablet (640px - 1024px):
   - [ ] Mesmas páginas acima
   - [ ] Sidebar responsivo
3. Testar desktop (> 1024px):
   - [ ] Mesmas páginas acima
   - [ ] Sidebar desktop
4. Corrigir issues encontradas

**Entregável:** Responsivo testado e funcionando

---

### Tarefa 4.4: Testar Acessibilidade Básica
**Status:** ⏳ TODO
**Responsível:** AI agent + Gabriel manual
**Estimativa:** 1 hora

**O que fazer:**
1. Testar keyboard navigation:
   - [ ] Tab order lógico
   - [ ] Enter/Space ativa buttons
   - [ ] Esc fecha modais
   - [ ] Arrows navegam dropdowns
2. Testar focus indicators:
   - [ ] Focus visible em todos elementos interativos
3. Testar ARIA labels:
   - [ ] Botões icon-only têm aria-label
   - [ ] Inputs têm aria-label quando necessário
4. Testar contrast ratios:
   - [ ] Usar Lighthouse para verificar
5. Corrigir issues encontradas

**Entregável:** Acessibilidade básica validada

---

### Tarefa 4.5: Browser Testing
**Status:** ⏳ TODO
**Responsável:** Gabriel (manual)
**Estimativa:** 1 hora

**O que fazer:**
1. Testar em Chrome:
   - [ ] Login funciona
   - [ ] Dashboard carrega
   - [ ] Dark mode funciona
   - [ ] Responsivo funciona
2. Testar em Firefox:
   - [ ] Mesmos testes acima
3. Testar em Safari:
   - [ ] Mesmos testes acima
4. Testar em Edge:
   - [ ] Mesmos testes acima
5. Testar em mobile:
   - [ ] Safari iOS
   - [ ] Chrome Android

**Entregável:** Report de compatibilidade de browsers

---

## 🎯 Fase 5 - Empty States & Error States (PRIORIDADE #5)

### Tarefa 5.1: Criar Empty States
**Status:** ⏳ TODO
**Responsível:** AI agent
**Estimativa:** 2 horas

**O que fazer:**
1. Criar empty states para:
   - [ ] No users (admin/users)
   - [ ] No NCs (nc)
   - [ ] No hazards (hazards)
   - [ ] No documents (documents)
   - [ ] No audits (audits)
   - [ ] No results (search)
   - [ ] No notifications
2. Usar componente EmptyState
3. Adicionar ícones Lucide apropriados
4. Adicionar CTAs quando aplicável
5. Testar em dark mode

**Entregável:** Empty states implementados nas páginas list

---

### Tarefa 5.2: Criar Error States
**Status:** ⏳ TODO
**Responsível:** AI agent
**Estimativa:** 2 horas

**O que fazer:**
1. Criar error pages:
   - [ ] 404 Not Found (`src/app/not-found.tsx`)
   - [ ] 500 Server Error (`src/app/error.tsx`)
   - [ ] 403 Forbidden (custom page)
2. Criar error states inline:
   - [ ] Network error (to retry)
   - [ ] Form validation error
   - [ ] File upload error
3. Usar componente Alert para errors inline
4. Testar em dark mode

**Entregável:** Error pages e error states implementados

---

### Tarefa 5.3: Melhorar Loading States
**Status:** ⏳ TODO
**Responsível:** AI agent
**Estimativa:** 1 hora

**O que fazer:**
1. Criar loading skeletons para:
   - [ ] Table rows
   - [ ] Cards
   - [ ] KPI cards
   - [ ] Activity feed
2. Usar componente LoadingSkeleton
3. Testar em dark mode

**Entregável:** Loading skeletons implementados

---

## 🎯 Fase 6 - Settings Page (PRIORIDADE #6)

### Tarefa 6.1: Criar Profile Settings Page
**Status:** ⏳ TODO
**Responsível:** AI agent
**Estimativa:** 2 horas

**O que fazer:**
1. Criar página `/settings/profile`
2. Form com:
   - [ ] Name input
   - [ ] Email input (readonly)
   - [ ] Avatar upload
   - [ ] Save button
3. Atualizar perfil no Supabase
4. Show toast em sucesso/erro
5. Testar validação

**Entregável:** `src/app/(app)/settings/profile/page.tsx`

---

### Tarefa 6.2: Criar Security Settings Page
**Status:** ⏳ TODO
**Responsível:** AI agent
**Estimativa:** 1 hora

**O que fazer:**
1. Criar página `/settings/security`
2. Form com:
   - [ ] Current password
   - [ ] New password
   - [ ] Confirm new password
   - [ ] Change password button
3. Atualizar senha no Supabase
4. Validation (match passwords)
5. Show toast em sucesso/erro

**Entregável:** `src/app/(app)/settings/security/page.tsx`

---

### Tarefa 6.3: Criar Preferences Settings Page
**Status:** ⏳ TODO
**Responsível:** AI agent
**Estimativa:** 1 hora

**O que fazer:**
1. Criar página `/settings/preferences`
2. Form com:
   - [ ] Language selector (pt-BR, en-US, es-AR)
   - [ ] Theme toggle (light/dark/auto)
   - [ ] Timezone selector
   - [ ] Save button
3. Salvar preferências no Supabase user metadata
4. Show toast em sucesso/erro

**Entregável:** `src/app/(app)/settings/preferences/page.ts.tsx`

---

## 🎯 Fase 7 - Componentes UI Avançados (OPTIONAL)

### Tarefa 7.1: Criar Table Component
**Status:** ⏳ TODO
**Responsível:** AI agent
**Estimativa:** 3 horas

**O que fazer:**
1. Criar componente Table:
   - [ ] Sorting por coluna
   - [ ] Filtering por coluna
   - [ ] Pagination
   - [ ] Mobile-optimized (cards instead of rows)
   - [ ] Row selection
   - [ ] Sticky header
   - [ ] Empty state
   - [ ] Loading state
2. Aplicar novo design system
3. Testar dark mode
4. Testar responsivo

**Entregável:** `src/components/ui/table.tsx`

---

### Tarefa 7.2: Criar Tooltip Component
**Status:** ⏳ TODO
**Responsível:** AI agent
**Estimativa:** 1 hora

**O que fazer:**
1. Criar componente Tooltip
2. Suportar positioning (top, bottom, left, right)
3. Suportar delay
4. Suportar dark mode
5. ARIA tooltip role

**Entregável:** `src/components/ui/tooltip.tsx`

---

### Tarefa 7.3: Criar Confirmation Dialog
**Status:** ⏳ TODO
**Responsível:** AI agent
**Estimativa:** 1 hora

**O que fazer:**
1. Criar componente ConfirmationDialog
2. Reutilizar Modal component
3. Adicionar title, message, cancel button, confirm button
4. Suportar variant (danger para delete)
5. Testar dark mode

**Entregável:** `src/components/ui/confirmation-dialog.tsx`

---

## 📊 Cronograma Sugerido

### Semana 1 (Fase 1-2): Design System + Auth Pages
- **Dia 1-2:** Tarefas 1.1-1.4 (Design System)
- **Dia 3-4:** Tarefas 2.1-2.2 (Login/Signup redesign)
- **Dia 5:** Tarefas 2.3-2.4 (Forgot/Reset password)

### Semana 2 (Fase 3-4): i18n + Testing
- **Dia 1-2:** Tarefas 3.1-3.2 (Setup i18n + Common terms)
- **Dia 3:** Tarefas 3.3-3.4 (Translate Auth + Dashboard)
- **Dia 4:** Tarefas 4.1-4.2 (Test Supabase + Dark mode)
- **Dia 5:** Tarefas 4.3-4.5 (Responsivo + Acessibilidade + Browsers)

### Semana 3 (Fase 5-6): Empty/Error States + Settings
- **Dia 1-2:** Tarefas 5.1-5.3 (Empty/Error/Loading states)
- **Dia 3-4:** Tarefas 6.1-6.2 (Profile + Security settings)
- **Dia 5:** Tarefa 6.3 (Preferences settings)

### Semana 4 (Fase 7 + Polish): Componentes Avançados
- **Dia 1:** Tarefa 7.1 (Table component)
- **Dia 2:** Tarefa 7.2-7.3 (Tooltip + Confirmation)
- **Dia 3-4:** Review final + bug fixes
- **Dia 5:** Deploy + handoff para Sprint 1

---

## ✅ Criteria para Concluir Sprint 0.2

Sprint 0.2 está DONE quando:

- [ ] Design system documentado e aprovado visualmente
- [ ] Login page redesenhado e aprovado
- [ ] Signup page redesenhada e aprovada
- [ ] i18n configurado (pt-BR, en-US, es-AR)
- [ ] Auth pages traduzidas (3 idiomas)
- [ ] Dashboard traduzido (3 idiomas)
- [ ] Todas conexões Supabase testadas e estáveis
- [ ] Dark mode testado e funcionando
- [ ] Responsivo testado em mobile/tablet/desktop
- [ ] Acessibilidade básica validada
- [ ] Empty states implementados
- [ ] Error pages implementadas
- [ ] Settings pages funcionando
- [ ] Lighthouse score ≥ 90
- [ ] Browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Deploy Vercel funcional

---

## 🚀 Próximo Passo: Começar Tarefa 1.1

**O que você quer fazer agora?**

1. Começar Tarefa 1.1 (Definir Paleta de Cores) - preciso de input de cores ABB
2. Começar Tarefa 1.2 (Definir Tipografia) - qual font preferir?
3. Começar Tarefa 1.3 (Padronizar Ícones) - vou auditar e criar guideline
4. Criar design tokens CSS primeiro, depois aplicar aos componentes
5. Outra sugestão?