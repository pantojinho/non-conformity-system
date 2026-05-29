# Sprint 0 — Plano Completo (Estado Final)

> **Objetivo:** Base sólida do sistema antes de começar business logic
> **Divisão:** Sprint 0.1 (Foundation) + Sprint 0.2 (Polish & Test)
> **Última atualização:** 29/05/2026

---

## 📋 Sprint 0.1 — Foundation ✅ (TUDO CONCLUÍDO)

### Backend & Infraestrutura
- [x] Next.js 15 + TypeScript + Tailwind CSS v4
- [x] Supabase client (browser + server + admin)
- [x] Auth (login/callback via Supabase Auth)
- [x] RBAC com 8 perfis + permissões granulares + auto-profile trigger
- [x] Middleware protegendo rotas + session refresh
- [x] Database schema (16+ tabelas via SQL migrations)
- [x] Seeds (roles, orgs, normas, processos, negócios)
- [x] Deploy Vercel + domínio roboticsportal.com.br

### Layout Básico
- [x] Sidebar desktop
- [x] Sidebar mobile (drawer)
- [x] Mobile header com hamburger
- [x] Layout responsivo (flex)
- [x] Dark mode base

### Componentes UI Base
- [x] Button (5 variants)
- [x] Card (composição)
- [x] Badge (6 variants)
- [x] Alert (5 variants)
- [x] Input/Select/Textarea
- [x] Modal
- [x] Toast (context)
- [x] Loading states
- [x] EmptyState
- [x] KPICard

### CRUD Users (Admin)
- [x] User table
- [x] User form modal
- [x] Delete confirmation
- [x] Role badges (color-coded)
- [x] Dark mode support

---

## 🎨 Sprint 0.2 — Polish & Test ✅ (essencial completo)

### 1. Design System & Identidade Visual
- [x] Paleta ABB definida (#FF000F primária, #1A1A2E sidebar/login)
- [x] Font: Inter (Google Fonts)
- [x] Tailwind CSS v4 com custom properties
- [x] Dark mode via @custom-variant dark (classe .dark no html)
- [x] Tema claro e escuro com toggle no header (Sun/Moon)
- [x] Sidebar SEMPRE escura por design (consistente com login)
- [ ] WCAG AA contrast testing (pendente)
- [ ] Design tokens documentados (pendente)

### 2. Componentes UI

#### Feitos ✅ (17 componentes)
- [x] Badge
- [x] Button
- [x] Card
- [x] Alert
- [x] Input
- [x] Select
- [x] Textarea
- [x] Modal
- [x] Toast
- [x] Loading
- [x] EmptyState
- [x] KPICard
- [x] Table
- [x] Tooltip
- [x] ConfirmationDialog
- [x] Checkbox
- [x] LanguageSwitcher

#### Pendentes (nice-to-have)
- [ ] Radio group
- [ ] Toggle switch
- [ ] Date picker
- [ ] File upload
- [ ] Multi-select
- [ ] Breadcrumb
- [ ] Tabs
- [ ] Steps/Stepper
- [ ] Pagination
- [ ] Dropdown menu
- [ ] Accordion
- [ ] Skeleton loaders
- [ ] Popover
- [ ] Avatar component
- [ ] Progress bar

### 3. Páginas & Views
- [x] Login page (sem Google OAuth, sem signup — plataforma interna)
- [x] Dashboard com KPI cards (ícones visíveis, cores por card)
- [x] Admin Users (CRUD completo)
- [x] Settings pages (profile, security, preferences)
- [x] Custom 404 page
- [x] Error states (EmptyState component)
- [ ] Forgot password page
- [ ] Reset password page

### 4. Internacionalização (i18n)
- [x] next-intl configurado (sem middleware, lê cookie NEXT_LOCALE)
- [x] 3 locales: pt-BR, en-US, es-AR
- [x] Locale files completos (~200+ strings cada)
- [x] LanguageSwitcher no header (bandeiras + labels)
- [x] Todas as páginas integradas com useTranslations()
- [x] Troca de idioma funcional (confirmado no browser)
- [ ] RTL support (futuro, não prioritário)

### 5. Auth & Security
- [x] Login email/senha (Supabase Auth)
- [x] Signup removido e bloqueado no middleware (plataforma interna)
- [x] Google OAuth removido
- [x] Logout via dropdown no header
- [x] Middleware: auth Supabase + locale cookie (3 iterações de fix)
- [x] RBAC com 8 perfis + auto-profile trigger
- [x] Test user: gestor.teste@br.abb.com (role: Gestor)

### 6. UX & Visual Polish
- [x] Ícones Lucide com dark: variants (37+ SVGs auditados)
- [x] KPI cards com iconColor (red/orange/blue/green/purple) visíveis em ambos temas
- [x] Ícone robô (Bot Lucide) no login (substituiu wifi)
- [x] Header com dropdown de usuário (perfil, config, sair)
- [x] Header com toggle de tema (Sun/Moon)
- [x] Transições suaves entre temas (200ms global)
- [ ] Animações de entrada (fade-in, slide-in)
- [ ] Skeleton loaders para loading states
- [ ] Micro-interactions (button press, card hover lift)

### 7. Deployment
- [x] Vercel auto-deploy (push → deploy)
- [x] Domínio roboticsportal.com.br ativo
- [x] SSL via Vercel
- [ ] CI/CD GitHub Actions (pendente)
- [ ] Preview deployments em PRs (pendente)

### 8. Testes
- [x] Teste manual browser (login, dashboard, admin/users, settings, i18n, dark mode)
- [ ] Testes unitários (Vitest)
- [ ] Testes E2E (Playwright)
- [ ] Lighthouse score
- [ ] Cross-browser testing

---

## 📝 Decisões Técnicas Importantes

- **Middleware:** NÃO usar createMiddleware do next-intl (quebra auth Supabase). Usar cookie NEXT_LOCALE + updateSession do Supabase diretamente
- **Tailwind v4 dark mode:** requer `@custom-variant dark { &:where(.dark, .dark *) { @slot; } }` no CSS
- **Login:** SEM Google OAuth, SEM signup — plataforma interna, admin regista utilizadores
- **Sidebar:** SEMPRE escura (#1A1A2E) em ambos os temas (design decision)
- **i18n:** next-intl sem middleware próprio — locale de cookie, request.ts lê cookie
- **KPI icons:** usar iconColor direto (text-red-600 dark:text-red-400), NÃO usar bg-clip-text/text-transparent (fica invisível em SVGs)
- **Ícone login:** Bot (Lucide) — robô industrial, contextual com ABB Robotics

---

## 🎯 Pronto para Sprint 1 — NC Core

Com a base sólida da Sprint 0, o sistema está pronto para:

- [ ] Formulário NC completo (React Hook Form + Zod)
- [ ] Lista de NCs com filtros
- [ ] Detalhe NC com timeline visual
- [ ] Ação Imediata + Ação Corretiva
- [ ] Eficácia e Reabertura
- [ ] Admin de Módulos NC

---

## 🔗 Links

- Produção: https://roboticsportal.com.br
- Repo: pantojinho/non-conformity-system
- README: `README.md`
- Summary: `SPRINT_0_SUMMARY.md`
- UX Components: `UX_COMPONENTS.md`
- Database schema: `docs/schema/database.md`
- RBAC: `docs/schema/rbac.md`
- Decisions: `docs/decisions.md`
