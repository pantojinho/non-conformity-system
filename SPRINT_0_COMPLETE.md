# Sprint 0 - Plano Completo (Expandido)

> **Objetivo:** Base sólida do sistema antes de começar business logic
> **Divisão:** Sprint 0.1 (Foundation) + Sprint 0.2 (Polish & Test)

---

## 📋 Sprint 0.1 - Foundation (DONE ✅)

### Backend & Infraestrutura
- [x] Next.js 15 + TypeScript + Tailwind CSS
- [x] Supabase client (browser + server + admin)
- [x] Auth (login/signup/callback)
- [x] RBAC com 8 perfis + permissões
- [x] Middleware protegendo rotas
- [x] Database schema (16+ tabelas)
- [x] Seeds (roles, orgs, normas, processos)
- [x] Deploy Vercel

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

## 🎨 Sprint 0.2 - Polish & Test (TODO)

### 1. Design System & Identidade Visual

#### 1.1 Paleta de Cores Oficial
- [ ] Definir paleta ABB Robotics (cores corporativas)
  - [ ] Primary color (ABB red/blue?)
  - [ ] Secondary color
  - [ ] Accent colors (success, warning, danger, info)
  - [ ] Neutral colors (gray scale)
- [ ] Criar CSS custom properties (além das atuais)
- [ ] Documentar paleta com tokens (design-tokens.css)
- [ ] Testar contraste WCAG AA em todas as combinações

#### 1.2 Tipografia
- [ ] Definir font stack oficial
  - [ ] Heading font (Roboto? Inter?)
  - [ ] Body font
  - [ ] Mono font (para código/IDs)
- [ ] Criar escala de tamanhos (text-xs até text-4xl)
- [ ] Definir line-heights
- [ ] Definir font weights (300, 400, 500, 600, 700)

#### 1.3 Ícones Consistentes
- [ ] Audit all icon usage atual
- [ ] Criar guideline de quais ícones usar para cada ação
- [ ] Substituir ícones inconsistentes (Lucide React é ok, mas padronizar)
- [ ] Criar mapeamento: conceito → ícone
- [ ] Documentar ícones no design system

#### 1.4 Shadows & Effects
- [ ] Definir escala de shadows (elevation)
  - [ ] xs, sm, md, lg, xl
- [ ] Definir border radius consistente
  - [ ] sm (buttons/inputs)
  - [ ] md (cards)
  - [ ] lg (modals)
  - [ ] full (badges/avatars)
- [ ] Definir blur/backdrop effects
- [ ] Definir hover effects transitions

#### 1.5 Spacing System
- [ ] Definir escala de espaçamento (4px base)
- [ ] Criar tokens de padding/margin
- [ ] Padronizar gaps em grids/flex

---

### 2. Componentes UI Avançados

#### 2.1 Form Components
- [ ] Checkbox (com dark mode)
- [ ] Radio group (com dark mode)
- [ ] Toggle switch (com dark mode)
- [ ] Date picker (mobile-friendly)
- [ ] Time picker
- [ ] File upload (drag & drop)
- [ ] Search input (debounced)
- [ ] Multi-select (chips)
- [ ] Password input com show/hide
- [ ] Number input com +/- buttons

#### 2.2 Navigation Components
- [ ] Breadcrumb navigation
- [ ] Tabs component
- [ ] Steps/Stepper (multi-step forms)
- [ ] Pagination
- [ ] Dropdown menu
- [ ] Context menu

#### 2.3 Data Display Components
- [ ] Table component
  - [ ] Sorting
  - [ ] Filtering
  - [ ] Pagination
  - [ ] Mobile-optimized (cards)
  - [ ] Row selection
  - [ ] Sticky header
- [ ] Data grid (advanced table)
- [ ] Accordion
- [ ] Collapsible
- [ ] Tabs para conteúdo
- [ ] Avatar component
- [ ] Avatar group
- [ ] Progress bar
- [ ] Progress stepper
- [ ] Skeleton loaders
  - [ ] Skeleton text
  - [ ] Skeleton avatar
  - [ ] Skeleton card
  - [ ] Skeleton table

#### 2.4 Feedback Components
- [ ] Toast notifications (já existe, melhorar)
  - [ ] Toast com progress bar
  - [ ] Toast stack position configurável
  - [ ] Toast animations customizáveis
- [ ] Snackbar (variant of toast)
- [ ] Confirmation dialog
- [ ] Alert dialog
- [ ] Tooltip
- [ ] Popover
- [ ] Popover menu

#### 2.5 Layout Components
- [ ] Container (max-width variants)
- [ ] Grid system
- [ ] Separator (dividers)
- [ ] Spacer
- [ ] Panel/Section
- [ ] Sheet (side panel)
- [ ] Drawer (side drawer)

---

### 3. Páginas & Views

#### 3.1 Auth Pages
- [ ] Login page
  - [ ] Melhorar visual atual
  - [ ] Adicionar logo/branding
  - [ ] Social login buttons (Google, Microsoft)
  - [ ] Forgot password link
  - [ ] Remember me checkbox
  - [ ] Loading states
  - [ ] Error handling inline
- [ ] Signup page
  - [ ] Multi-step form?
  - [ ] Validation real-time
  - [ ] Password strength indicator
  - [ ] Terms checkbox
- [ ] Forgot password page
- [ ] Reset password page
- [ ] Email verification page

#### 3.2 Dashboard
- [ ] Melhorar layout atual
  - [ ] Adicionar welcome message personalizada
  - [ ] Melhorar KPI cards (usar KPICard component)
  - [ ] Adicionar gráficos com Recharts
  - [ ] Adicionar activity feed
  - [ ] Adicionar quick actions
  - [ ] Mobile optimization
- [ ] Empty states (quando sem dados)
- [ ] Loading states (skeletons)

#### 3.3 User Settings
- [ ] Profile settings
  - [ ] Edit name, email, avatar
  - [ ] Change password
  - [ ] Language selector
  - [ ] Theme toggle (light/dark)
  - [ ] Timezone selector
- [ ] Notification preferences
  - [ ] Email notifications toggle
  - [ ] In-app notifications toggle
- [ ] Logout confirmation

#### 3.4 404 & Error Pages
- [ ] Custom 404 page
- [ ] Custom 500 page
- [ ] Custom 403 (forbidden) page
- [ ] Maintenance page

---

### 4. Internacionalização (i18n)

#### 4.1 Setup i18n
- [ ] Escolher biblioteca (next-intl ou react-i18next?)
- [ ] Configurar locales: pt-BR, en-US, es-AR
- [ ] Criar estrutura de arquivos de tradução
- [ ] Configurar locale detection (browser + user preference)
- [ ] Configurar locale switching

#### 4.2 Traduções
- [ ] Criar dicionário base (common)
  - [ ] Navigation labels
  - [ ] Buttons (Save, Cancel, Delete, etc.)
  - [ ] Status labels
  - [ ] Errors messages
  - [ ] Success messages
  - [ ] Date formats
  - [ ] Number formats
- [ ] Traduzir páginas Auth
- [ ] Traduzir Dashboard
- [ ] Traduzir Admin pages
- [ ] Traduzir componentes UI (validation errors, placeholders)
- [ ] Traduzir roles e permissions
- [ ] Traduzir normas ISO

#### 4.3 RTL Support (futuro)
- [ ] Considerar suporte para árabe/hebraico (direita-esquerda)

---

### 5. Testing & QA

#### 5.1 Backend Tests
- [ ] Testar todas as conexões Supabase
  - [ ] Auth (login, signup, logout, refresh)
  - [ ] Database queries
  - [ ] RLS policies
  - [ ] Admin endpoints (bypass RLS)
- [ ] Testar middleware em todas as rotas
- [ ] Testar RLS para cada role (8 perfis)
- [ ] Testar edge cases (network errors, timeouts)
- [ ] Testar rate limiting (se houver)

#### 5.2 UI Tests
- [ ] Testar todos os componentes em light mode
- [ ] Testar todos os componentes em dark mode
- [ ] Testar responsive em breakpoints
  - [ ] Mobile (< 640px)
  - [ ] Tablet (640px - 1024px)
  - [ ] Desktop (> 1024px)
- [ ] Testar focus states (keyboard navigation)
- [ ] Testar hover states (mouse)
- [ ] Testar loading states
- [ ] Testar error states
- [ ] Testar empty states

#### 5.3 Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers (Safari iOS, Chrome Android)

#### 5.4 Accessibility Tests
- [ ] Testar keyboard navigation (Tab, Enter, Escape, arrows)
- [ ] Testar screen readers (NVDA, VoiceOver, JAWS)
- [ ] Testar contrast ratios (WCAG AA)
- [ ] Testar focus indicators
- [ ] Testar ARIA labels e roles
- [ ] Testar semantic HTML

#### 5.5 Performance Tests
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals
  - [ ] LCP < 2.5s
  - [ ] FID < 100ms
  - [ ] CLS < 0.1
- [ ] Bundle size analysis
- [ ] Lazy loading otimizado
- [ ] Image optimization

---

### 6. Refinamento Visual

#### 6.1 Animations & Transitions
- [ ] Definir easing functions padrão
- [ ] Definir durations (fast, normal, slow)
- [ ] Criar animações utilitárias
  - [ ] fade-in
  - [ ] fade-out
  - [ ] slide-in
  - [ ] slide-out
  - [ ] scale-in
  - [ ] scale-out
  - [ ] bounce
  - [ ] shake (error)
- [ ] Aplicar animações consistentes em todos os componentes

#### 6.2 Micro-interactions
- [ ] Button press effect
- [ ] Input focus ring
- [ ] Card hover lift
- [ ] Link underline animation
- [ ] Checkbox check animation
- [ ] Toast slide-in animation
- [ ] Modal fade-in animation

#### 6.3 Empty States & Loading States
- [ ] Criar empty states ilustrados para:
  - [ ] No users
  - [ ] No NCs
  - [ ] No hazards
  - [ ] No documents
  - [ ] No audits
  - [ ] No results (search)
  - [ ] No notifications
- [ ] Criar loading states para:
  - [ ] Page load
  - [ ] Table load
  - [ ] Form submit
  - [ ] File upload
  - [ ] Chart load

#### 6.4 Error States
- [ ] Criar error states para:
  - [ ] Network error
  - [ ] 404 not found
  - [ ] 403 forbidden
  - [ ] 500 server error
  - [ ] Form validation error
  - [ ] File upload error

---

### 7. Accessibility (Acessibilidade)

#### 7.1 Keyboard Navigation
- [ ] Garantir Tab order lógico
- [ ] Garantir focus visible
- [ ] Esc fecha modais/dropdowns
- [ ] Enter/Space ativa buttons
- [ ] Arrows navegam lists/dropdowns
- [ ] Skip to content link

#### 7.2 Screen Reader Support
- [ ] ARIA labels em todos os botões icon-only
- [ ] ARIA live regions para toasts/alerts
- [ ] ARIA roles para componentes customizados
- [ ] ARIA descriptions para inputs complexos
- [ ] ARIA labels para chart data

#### 7.3 Visual Accessibility
- [ ] Contrast ratio ≥ 4.5:1 (WCAG AA)
- [ ] Text resizable até 200%
- [ ] Color não é único indicador de informação
- [ ] Focus indicators visíveis
- [ ] Links distinguíveis de texto

#### 7.4 Motion & Sensitivity
- [ ] Reduzir movimento (prefers-reduced-motion)
- [ ] Não flash > 3x/second
- [ ] Parar animações em motion settings

---

### 8. Documentation

#### 8.1 Design System Documentation
- [ ] Criar `/docs/design-system/`
  - [ ] `colors.md` - Paleta completa
  - [ ] `typography.md` - Fontes e tamanhos
  - [ ] `spacing.md` - Sistema de espaçamento
  - [ ] `shadows.md` - Shadows e elevações
  - [ ] `icons.md` - Guidelines de ícones
  - [ ] `components.md` - Catálogo de componentes
  - [ ] `patterns.md` - Padrões de UX comuns
  - [ ] `accessibility.md` - Guidelines de acessibilidade

#### 8.2 Component Documentation
- [ ] Criar Storybook? (opcional)
- [ ] Documentar props de cada componente
- [ ] Criar exemplos de uso
- [ ] Documentar variants e estados

#### 8.3 i18n Documentation
- [ ] Criar `/docs/i18n/`
  - [ ] `setup.md` - Como configurar
  - [ ] `translations.md` - Guia de tradução
  - [ ] `best-practices.md` - Melhores práticas

---

### 9. Configuration & Tooling

#### 9.1 ESLint & Prettier
- [ ] Configurar ESLint strict
- [ ] Configurar Prettier
- [ ] Adicionar pre-commit hooks (husky + lint-staged)
- [ ] Configurar CI/CD lint check

#### 9.2 TypeScript
- [ ] Strict mode enabled
- [ ] No implicit any
- [ ] Configurar path aliases
- [ ] Gerar types de Supabase

#### 9.3 Testing Tools
- [ ] Setup Vitest (unit tests)
- [ ] Setup Playwright (e2e tests)
- [ ] Setup Testing Library (component tests)
- [ ] Configurar coverage threshold (> 80%)

#### 9.4 Performance Monitoring
- [ ] Setup Vercel Analytics
- [ ] Setup Sentry (error tracking)
- [ ] Setup speed insights

---

### 10. Deployment & DevOps

#### 10.1 CI/CD
- [ ] Configurar GitHub Actions
  - [ ] Lint check
  - [ ] Type check
  - [ ] Build check
  - [ ] Run tests
  - [ ] Deploy to Vercel (preview on PR, production on merge)
- [ ] Configurar environment variables
- [ ] Configurar deploy preview environments

#### 10.2 Environment Management
- [ ] .env.local (dev)
- [ ] .env.production
- [ ] .env.staging
- [ ] Configurar Supabase projects (dev, staging, prod)

#### 10.3 Monitoring
- [ ] Vercel logs
- [ ] Supabase logs
- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (Vercel Analytics)

---

## 🎯 Sprint 0.2 Checklist Prioritizado

### 🔴 CRITICAL (Must Have Before Sprint 1)
1. Design system completo (cores, fontes, ícones)
2. Refinar páginas Auth (login/signup)
3. Implementar i18n (pt-BR, en-US, es-AR)
4. Testar todas as conexões Supabase
5. Testar dark mode em todos os componentes
6. Testar responsivo (mobile/tablet/desktop)
7. Accessibility básico (keyboard, ARIA, contrast)
8. Empty states e error states
9. Loading states consistentes
10. Deploy CI/CD configurado

### 🟡 HIGH (Should Have Before Sprint 1)
1. Componentes UI avançados (table, pagination, search)
2. Form components (checkbox, radio, toggle, date picker)
3. Tooltip e popover
4. Confirmation dialogs
5. Settings page (profile, notifications)
6. Custom 404/500 pages
7. Animations e micro-interactions
8. Browser testing (Chrome, Firefox, Safari, Edge)
9. Lighthouse score > 90
10. Documentation (design system, components)

### 🟢 MEDIUM (Nice to Have)
1. Storybook para componentes
2. Unit tests (Vitest)
3. E2E tests (Playwright)
4. Performance monitoring avançado
5. Sentry error tracking
6. RTL support
7. Custom scrollbars
8. Skeleton loaders avançados
9. Multi-select component
10. Drag & drop file upload

---

## 📊 Estimativa de Esforço

- **Sprint 0.1 (DONE):** ~40 horas
- **Sprint 0.2 CRITICAL:** ~60 horas
- **Sprint 0.2 HIGH:** ~40 horas
- **Sprint 0.2 MEDIUM:** ~20 horas

**Total Sprint 0.2:** ~120 horas

---

## 🚀 Quando Começar Sprint 1?

Sprint 1 (NC Core) só começa quando:

- [x] Sprint 0.1 DONE
- [ ] Sprint 0.2 CRITICAL DONE
- [ ] Design system aprovado visualmente
- [ ] i18n básico funcionando (pt-BR)
- [ ] Auth flows testados e aprovados
- [ ] Conexões Supabase 100% estáveis
- [ ] Responsivo testado em mobile/tablet/desktop
- [ ] Dark mode testado
- [ ] Accessibility básico validado
- [ ] Lighthouse score ≥ 90

---

## 📝 Notas

- **Design System:** Precisa aprovação visual de stakeholders antes de Sprint 1
- **i18n:** Começar com pt-BR, depois en-US e es-AR
- **Accessibility:** WCAG AA é o mínimo, WCAG AAA ideal
- **Performance:** Core Web Vitals são KPIs críticos
- **Testing:** Manual testing inicial, automação gradual

---

## 🔗 Links

- README principal: `README.md`
- UX Components: `UX_COMPONENTS.md`
- UX TODO: `UX_TODO.md`
- Database schema: `docs/schema/database.md`
- RBAC: `docs/schema/rbac.md`
- Workflows: `docs/workflows.md`
- Decisions: `docs/decisions.md`