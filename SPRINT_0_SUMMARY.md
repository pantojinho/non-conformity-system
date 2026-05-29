# Sprint 0 — Resumo Final ✅

> Concluída em: 29/05/2026
> Repo: pantojinho/non-conformity-system
> Produção: https://roboticsportal.com.br
> Stack: Next.js 15 + Supabase + Tailwind CSS v4 + TypeScript

## Entregues

### Sprint 0.1 — Foundation ✅
- Next.js 15 + TypeScript + Tailwind CSS v4
- Supabase (browser + server + admin clients)
- Auth (login/callback via Supabase Auth)
- RBAC com 8 perfis + permissões granulares + auto-profile trigger
- Middleware protegendo rotas + session refresh
- Database schema (16+ tabelas via SQL migrations)
- Seeds (roles, orgs, normas, processos, negócios)
- Layout (sidebar desktop/mobile + header)
- User Management CRUD (admin)
- Deploy Vercel + domínio roboticsportal.com.br

### Sprint 0.2 — Polish & Test ✅ (essencial completo)
- Design system ABB (#FF000F primária, Inter font)
- 17 componentes UI (Badge, Button, Card, Alert, Input, Select, Textarea, Modal, Toast, Loading, EmptyState, KPICard, Table, Tooltip, ConfirmationDialog, Checkbox, LanguageSwitcher)
- Dark/Light theme com toggle (Sun/Moon)
- i18n funcional (PT-BR, EN-US, ES-AR) — next-intl
- Login limpo (sem Google, sem signup)
- Header com dropdown + logout
- Settings pages (profile, security, preferences)
- KPI cards com ícones visíveis em ambos temas
- Admin Users funcional
- Custom 404 + EmptyState component

## Decisões Técnicas
- Middleware: auth Supabase + cookie locale (SEM createMiddleware do next-intl)
- Tailwind v4: @custom-variant dark explícito
- Sidebar: sempre escura por design
- Login: plataforma interna, admin regista users
- KPI icons: iconColor direto, não bg-clip-text

## Pendentes (nice-to-have, não bloqueia Sprint 1)
- Radio, Toggle, Date picker, File upload componentes
- Skeleton loaders, animações de entrada
- Forgot/Reset password pages
- CI/CD GitHub Actions
- Testes automatizados (Vitest, Playwright)
- WCAG AA audit completo

## Usuários de Teste
- Admin: gabriel.ciandrini@br.abb.com
- Gestor: gestor.teste@br.abb.com

## Commits Principais
- a3a9ea0: UX components library (Sprint 0.1)
- 9f48f05: Sprint 0.2 (i18n, settings, table, tooltip, checkbox, language-switcher)
- fix middleware (3 iterações)
- fix i18n integration + dark mode + icons

## Pronto para Sprint 1 — NC Core
- Formulário NC completo (React Hook Form + Zod)
- Lista de NCs com filtros
- Detalhe NC com timeline visual
- Ação Imediata + Ação Corretiva
- Eficácia e Reabertura
- Admin de Módulos NC
