# AI Agents Tasks — Robotics Hub

> Lista de tarefas detalhadas e possíveis bugs para agentes de IA implementarem.
>
> **Nota:** Módulo de Treinamentos **não faz parte** deste projeto — já existe uma base própria.

## Visão Geral

Este documento descreve todas as tarefas de implementação do **Robotics Hub** (antigo non-conformity-system), incluindo fluxos, dashboards, autenticação e funcionalidades específicas.

---

## 📦 Sprint 0 — Foundation

### 1. Setup Base

**Arquivos necessários:**
- `package.json` com dependências:
  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - Prisma
  - Supabase
  - @tanstack/react-query
  - @tanstack/react-table
  - recharts
  - tremor
  - react-hook-form
  - zod
  - @hookform/resolvers
  - zustand
  - date-fns
  - clsx
  - tailwind-merge
- `turbo.json` (para monorepo futuro)
- `pnpm-workspace.yaml` (para monorepo futuro)
- `.env.example`

**Tarefas:**
- [ ] Inicializar Next.js 15 com TypeScript
- [ ] Configurar Tailwind + shadcn/ui
- [ ] Instalar Prisma + Supabase client
- [ ] Configurar CI/CD com GitHub Actions
- [ ] Configurar Sentry para erro tracking

**Possíveis Bugs:**
- Dependências conflitantes entre shadcn/ui e outros componentes
- Tailwind CSS não renderizar no Next.js App Router
- Supabase client não inicializar corretamente no ambiente de desenvolvimento

---

### 2. Layout Global

**Arquivos necessários:**
- `src/components/layout/sidebar.tsx`
- `src/components/layout/header.tsx`
- `src/components/layout/home-buttons.tsx`
- `src/components/layout/navigation.tsx`
- `src/app/layout.tsx`

**Tarefas:**
- [ ] Criar Sidebar com navegação modular (8 módulos)
- [ ] Criar Header com dados do usuário e ações globais
- [ ] Criar Home Buttons (grandes botões de entrada)
- [ ] Implementar navegação dinâmica
- [ ] Implementar dark mode toggle
- [ ] Criar protected routes wrapper

**Possíveis Bugs:**
- Sidebar não persistir estado entre navegações
- Header não atualizar dados do usuário em tempo real
- Navegação não travar rotas não autorizadas
- Dark mode não persistir no refresh

---

### 3. Banco de Dados Inicial

**Arquivos necessários:**
- `prisma/schema.prisma`
- `supabase/migrations/001_initial.sql`
- `supabase/seed/001_initial.sql`

**Tarefas:**
- [ ] Criar tabelas: users, roles, permissions, nc_records, hazards, documents, audit_logs, attachments
- [ ] Criar índices para performance
- [ ] Criar foreign keys com cascade delete
- [ ] Criar seeds com dados iniciais (normas, processos, status)
- [ ] Criar enum types (status, risk_level, categories)
- [ ] Criar row level security policies

**Possíveis Bugs:**
- Foreign keys com cascade delete causarem erros em cascata
- Índices não criarem para queries comuns
- Enum types não suportarem valores customizados
- RLS policies causarem bloqueios indevidos
- Sequences não iniciarem corretamente para IDs

---

### 4. Autenticação e RBAC

**Arquivos necessários:**
- `src/lib/supabase/auth.ts`
- `src/lib/auth/middleware.ts`
- `src/lib/auth/permissions.ts`
- `src/lib/auth/rbac.ts`
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/signup/page.tsx`
- `src/app/(auth)/logout/page.tsx`

**Tarefas:**
- [ ] Implementar login com Supabase Auth
- [ ] Implementar signup com verificação de email
- [ ] Criar perfis de usuário (role_id)
- [ ] Criar permissões granulares (por módulo)
- [ ] Criar middleware de proteção de rotas
- [ ] Implementar RBAC com check de permissões
- [ ] Criar helper `hasPermission(role, permission)`

**Possíveis Bugs:**
- Supabase client não autenticar corretamente no SSR
- Middleware não detectar usuário logado
- Permissões não atualizarem após mudança de perfil
- Session expirar sem redirecionamento correto
- Role não persistir no banco de dados

---

## 🚀 Sprint 1 — Non Conformity (MVP)

### 5. Registro NC — Formulário Completo

**Arquivos necessários:**
- `src/app/(app)/nc/new/page.tsx`
- `src/components/forms/nc-form.tsx`
- `src/lib/validators/nc.ts`
- `src/app/api/nc/create/route.ts`

**Tarefas:**
- [ ] Criar formulário modular com tabs:
  - Dados básicos (País, Tipo, Norma, Business, Processo)
  - Detecção e Local
  - Descrição e Anexos
  - Risco
- [ ] Implementar dropdowns dinâmicos:
  - Norma → carregar itens da norma
  - Business → filtrar por país
  - Processo → filtrar por business
- [ ] Implementar upload de evidências
- [ ] Validar campos obrigatórios (Zod)
- [ ] Gerar ID automaticamente (NC-000001)

**Possíveis Bugs:**
- Dropdowns não atualizarem dinamicamente
- Upload de anexos não funcionar em mobile
- Validação falhar em campos obrigatórios
- ID não gerar em sequência correta
- Form não resetar após submissão

---

### 6. Detalhe NC — Timeline e Workflow

**Arquivos necessários:**
- `src/app/(app)/nc/[id]/page.tsx`
- `src/components/timeline/status-timeline.tsx`
- `src/components/nc/comment-section.tsx`
- `src/components/nc/attachments-list.tsx`
- `src/app/api/nc/[id]/route.ts`

**Tarefas:**
- [ ] Criar timeline visual com status atual
- [ ] Implementar navegação entre etapas do workflow
- [ ] Implementar seção de comentários
- [ ] Implementar seção de anexos
- [ ] Implementar botões de ação:
  - Definir resolvedor
  - Aceitar / Rejeitar
  - Ação imediata
  - Ação corretiva
- [ ] Implementar histórico de alterações

**Possíveis Bugs:**
- Timeline não mostrar status completo
- Navegação entre etapas bloquear se não tiver permissão
- Comentários não persistirem
- Anexos não mostrarem
- Botões de ação não aparecerem para usuário certo

---

### 7. Dashboard NC — KPIs e Charts

**Arquivos necessários:**
- `src/components/dashboard/kpi-cards.tsx`
- `src/components/dashboard/charts/nc-by-norma.tsx`
- `src/components/dashboard/charts/nc-by-process.tsx`
- `src/components/dashboard/charts/nc-trend.tsx`
- `src/app/(dashboard)/nc/page.tsx`

**Tarefas:**
- [ ] Criar KPI cards: NC abertas, risco alto, SLA vencido, pendências
- [ ] Criar gráfico NC por norma (Bar chart)
- [ ] Criar gráfico NC por processo (Bar chart)
- [ ] Criar gráfico tendência mensal (Line chart)
- [ ] Implementar filtro por período
- [ ] Implementar filtro por país/unidade

**Possíveis Bugs:**
- Charts não renderizarem dados
- Filtros não atualizarem gráficos
- KPI cards não atualizarem em tempo real
- Data não filtrar corretamente

---

### 8. Ação Imediata

**Arquivos necessários:**
- `src/components/nc/immediate-action-section.tsx`
- `src/app/api/nc/[id]/immediate-action/route.ts`

**Tarefas:**
- [ ] Criar formulário de ação imediata
- [ ] Implementar prazo de 30 dias
- [ ] Implementar aprovação (Aldo, Laureano, Admins)
- [ ] Implementar evidências
- [ ] Implementar status: pendente, em_andamento, concluida, rejeitada

**Possíveis Bugs:**
- Prazo não calcular corretamente
- Aprovação não disparar notificação
- Evidências não salvar
- Status não atualizar após aprovação

---

### 9. Ação Corretiva

**Arquivos necessários:**
- `src/components/nc/corrective-action-section.tsx`
- `src/lib/workflow/rules.ts`

**Tarefas:**
- [ ] Criar formulário de análise de causa (5 porquês / Ishikawa)
- [ ] Criar formulário de ação corretiva
- [ ] Implementar link com ação imediata
- [ ] Implementar aprovação final
- [ ] Implementar cálculo de impacto esperado

**Possíveis Bugs:**
- Form não validar causa raiz
- Ação corretiva não vincular com NC
- Aprovação final não disparar workflow de eficácia

---

### 10. Eficácia e Reabertura

**Arquivos necessários:**
- `src/components/nc/efficacy-section.tsx`
- `src/lib/workflow/transitions.ts`

**Tarefas:**
- [ ] Implementar agendamento automático de eficácia (90 ou 180 dias)
- [ ] Criar formulário de verificação de eficácia
- [ ] Implementar reabertura automática se não eficaz
- [ ] Implementar contagem de reincidência

**Possíveis Bugs:**
- Agendamento não disparar notificação
- Data de eficácia não calcular
- Reabertura não resetar workflow
- Reincidência não contar corretamente

---

### 11. Admin de Módulos NC

**Arquivos necessários:**
- `src/app/(app)/admin/nc/processes/page.tsx`
- `src/app/(app)/admin/nc/norms/page.tsx`
- `src/app/(app)/admin/nc/business/page.tsx`
- `src/app/(app)/admin/nc/status/page.tsx`
- `src/app/api/admin/nc/*`

**Tarefas:**
- [ ] CRUD de processos
- [ ] CRUD de normas
- [ ] CRUD de itens de norma (dropdown dinâmico)
- [ ] CRUD de business
- [ ] CRUD de status (fluxo)
- [ ] CRUD de riscos

**Possíveis Bugs:**
- Status não aparecerem no dropdown
- Normas não filtrarem itens corretamente
- CRUD não salvar no banco
- Validação não impedir exclusão de status em uso

---

## 🔥 Sprint 2 — Hazard / HSE

### 12. Registro Hazard — Mobile First

**Arquivos necessários:**
- `src/app/(app)/hazards/new/page.tsx`
- `src/components/forms/hazard-form.tsx`
- `src/lib/validators/hazard.ts`
- `src/app/api/hazards/create/route.ts`

**Tarefas:**
- [ ] Criar formulário rápido (< 2 min)
- [ ] Implementar upload de foto instantâneo
- [ ] Implementar dropdown de categorias (Segurança, Saúde, Meio Ambiente, Security)
- [ ] Implementar QR code por área
- [ ] Implementar heatmap de risco (dashboard)

**Possíveis Bugs:**
- Foto não uploadar em mobile
- QR code não gerar
- Categorias não aparecerem
- Form não validar campos obrigatórios
- Form não salvar dados

---

### 13. Dashboard HSE

**Arquivos necessários:**
- `src/components/dashboard/hse-dashboard.tsx`
- `src/components/dashboard/charts/hazard-by-category.tsx`
- `src/components/dashboard/charts/hazard-by-location.tsx`
- `src/components/dashboard/charts/risk-level-distribution.tsx`

**Tarefas:**
- [ ] Criar KPIs: Hazard abertos, risco alto, áreas críticas
- [ ] Criar gráfico hazard por categoria (Bar)
- [ ] Criar gráfico hazard por local (Bar)
- [ ] Criar gráfico distribuição de risco (Pie)
- [ ] Criar heatmap de risco (opcional)

**Possíveis Bugs:**
- Heatmap não renderizar
- Gráficos não mostrar dados
- KPIs não atualizarem

---

## 📄 Sprint 3 — Documents (ISO)

### 14. Gestão Documental ISO

**Arquivos necessários:**
- `src/app/(app)/documents/page.tsx`
- `src/app/(app)/documents/\[id\]/page.tsx`
- `src/components/documents/document-card.tsx`
- `src/lib/workflow/document-workflow.ts`
- `src/app/api/documents/*`

**Tarefas:**
- [ ] Criar CRUD de documentos
- [ ] Implementar controle de revisão
- [ ] Implementar controle de validade
- [ ] Implementar aprovação documental
- [ ] Implementar expiração automática
- [ ] Implementar vinculação com normas

**Possíveis Bugs:**
- Documentos vencendo não alertarem
- Revisão não incrementar automaticamente
- Aprovação não disparar notificação
- Vinculação com norma não salvar

---

## 📊 Sprint 4 — NPS / Reclamações

### 15. NPS e Reclamações

**Arquivos necessários:**
- `src/app/(app)/complaints/page.tsx`
- `src/app/(app)/complaints/new/page.tsx`
- `src/components/complaints/complaint-card.tsx`
- `src/lib/workflow/complaint-workflow.ts`
- `src/app/api/complaints/*`

**Tarefas:**
- [ ] Criar CRUD de reclamações
- [ ] Implementar SLA cliente
- [ ] Implementar workflow de atendimento
- [ ] Implementar geração automática NC a partir de reclamação
- [ ] Implementar dashboard NPS

**Possíveis Bugs:**
- SLA não calcular
- NC não gerar automaticamente
- Dashboard NPS não mostrar dados

---

## 🔐 Sprint 5 — Access Control

### 16. Controle de Acesso

**Arquivos necessários:**
- `src/app/(app)/access-control/page.tsx`
- `src/app/(app)/access-control/log/page.tsx`
- `src/components/access-control/access-log.tsx`
- `src/app/api/access-control/*`

**Tarefas:**
- [ ] Criar CRUD de portaria
- [ ] Implementar aprovação de acessos
- [ ] Implementar log de entradas/saídas
- [ ] Implementar filtre por local (Sorocaba, São Paulo, Argentina)

**Possíveis Bugs:**
- Log não persistir
- Aprovação não funcionar
- Filtros não atualizarem

---

## 📤 Sprint 6 — Material Exit

### 17. Saída de Materiais

**Arquivos necessários:**
- `src/app/(app)/material-exit/page.tsx`
- `src/app/(app)/material-exit/new/page.tsx`
- `src/components/material-exit/material-exit-form.tsx`
- `src/app/api/material-exit/*`

**Tarefas:**
- [ ] Criar CRUD de saídas
- [ ] Implementar aprovação
- [ ] Implementar log de histórico
- [ ] Implementar justificativas

**Possíveis Bugs:**
- Histórico não persistir
- Aprovação não disparar notificação

---

## 🔍 Sprint 7 — Audits

### 18. Gestão de Auditorias

**Arquivos necessários:**
- `src/app/(app)/audits/page.tsx`
- `src/app/(app)/audits/\[id\]/page.tsx`
- `src/components/audits/audit-form.tsx`
- `src/app/api/audits/*`

**Tarefas:**
- [ ] Criar CRUD de auditorias (interna/externa)
- [ ] Implementar constatações
- [ ] Implementar vinculação com NC
- [ ] Implementar evidências

**Possíveis Bugs:**
- Vinculação com NC não salvar
- Evidências não uploadar

---

## ⚙️ Sprint 8 — Workflow Engine

### 20. Motor de Workflow Centralizado

**Arquivos necessários:**
- `src/lib/workflow/engine.ts`
- `src/lib/workflow/transitions.ts`
- `src/lib/workflow/rules.ts`
- `src/lib/workflow/states.ts`

**Tarefas:**
- [ ] Criar definição de estados e transições
- [ ] Criar regras condicionais de aprovação
- [ ] Criar regras de escalonamento
- [ ] Criar regras de SLA
- [ ] Criar regras de notificação
- [ ] Implementar validação de permissões em cada transição

**Possíveis Bugs:**
- Transições não validar permissões
- Regras não dispararem corretamente
- SLA não calcular

---

## 📈 Sprint 10 — Dashboards Avançados

### 21. Dashboard Executivo

**Arquivos necessários:**
- `src/components/dashboard/executive-dashboard.tsx`
- `src/components/dashboard/charts/nc-hazard-nps.tsx`
- `src/components/dashboard/charts/sla-compliance.tsx`
- `src/components/dashboard/charts/reincidencia.tsx`

**Tarefas:**
- [ ] Criar KPIs globais
- [ ] Criar gráficos principais
- [ ] Implementar filtros de período
- [ ] Implementar filtros de país/unidade

**Possíveis Bugs:**
- Dashboards não renderizarem
- Filtros não funcionarem

---

### 22. Dashboard Documental

**Arquivos necessários:**
- `src/components/dashboard/documental-dashboard.tsx`
- `src/components/dashboard/charts/documents-expiring.tsx`
- `src/components/dashboard/charts/revisions-pending.tsx`

**Tarefas:**
- [ ] Criar KPIs de documentação
- [ ] Criar gráficos de vencimento
- [ ] Criar gráficos de revisões pendentes

**Possíveis Bugs:**
- Documentos vencendo não alertarem
- Gráficos não renderizarem

---

## 🤖 Sprint 9 — Inteligência Artificial

### 24. Sugestão Automática de Causa Raiz

**Arquivos necessários:**
- `src/app/api/ai/suggest-root-cause/route.ts`

**Tarefas:**
- [ ] Implementar API de sugestão de causa raiz
- [ ] Integrar com modelo de IA (OpenAI / Claude)
- [ ] Implementar estrutura de prompt
- [ ] Implementar parsing da resposta
- [ ] Fornecer 3-5 sugestões baseadas em descreção

**Possíveis Bugs:**
- IA não retornar resposta formatada
- Prompt não passar contexto correto
- API não validar permissão

---

### 25. Classificação Automática

**Arquivos necessários:**
- `src/app/api/ai/classify-nc/route.ts`

**Tarefas:**
- [ ] Implementar API de classificação
- [ ] Classificar por norma
- [ ] Classificar por processo
- [ ] Classificar por categoria

**Possíveis Bugs:**
- Classificação incorreta
- API não validar permissão

---

### 26. OCR de Imagens

**Arquivos necessários:**
- `src/app/api/ai/ocr/route.ts`

**Tarefas:**
- [ ] Implementar OCR de imagens
- [ ] Integrar com serviço de OCR (Google Vision, AWS Textract)
- [ ] Extrair texto de fotos de evidências

**Possíveis Bugs:**
- OCR não funcionar em imagens de baixa qualidade
- Texto não extrair corretamente
- API não validar permissão

---

### 27. Insights Preditivos

**Arquivos necessários:**
- `src/app/api/ai/predictive-insights/route.ts`

**Tarefas:**
- [ ] Implementar análise preditiva
- [ ] Identificar tendências de risco
- [ ] Identificar áreas críticas

**Possíveis Bugs:**
- Insights não gerarem
- Métricas incorretas

---

## 📞 Sprint 10 — Notificações

### 28. Sistema de Notificações

**Arquivos necessários:**
- `src/components/notifications/notification-center.tsx`
- `src/lib/notifications/sender.ts`
- `src/app/api/notifications/*`

**Tarefas:**
- [ ] Implementar envio de email (Resend)
- [ ] Implementar envio de push notifications (se aplicável)
- [ ] Implementar notificações in-app
- [ ] Implementar templates de email
- [ ] Implementar categorias de notificação

**Possíveis Bugs:**
- Email não disparar
- Notificações não aparecerem

---

## 🔧 Sprint 11 — Integrações

### 29. Integrações Futuras

**Arquivos necessários:**
- `src/lib/integrations/sap.ts`
- `src/lib/integrations/crm.ts`
- `src/lib/integrations/outlook.ts`
- `src/lib/integrations/teams.ts`

**Tarefas:**
- [ ] Criar scaffolds para integrações
- [ ] Implementar autenticação OAuth
- [ ] Implementar webhooks
- [ ] Implementar polling

**Possíveis Bugs:**
- OAuth não funcionar
- Integrações não conectar
- Erros não tratados

---

## 📋 Possíveis Bugs Comuns

### Autenticação
- [ ] Session expirar sem redirecionamento
- [ ] Middleware não detectar usuário logado
- [ ] Permissões não atualizarem
- [ ] Role não persistir no banco

### Banco de Dados
- [ ] Foreign keys com cascade delete causarem erros
- [ ] Índices não criarem para queries
- [ ] Enum types não suportarem valores customizados
- [ ] RLS policies causarem bloqueios

### Uploads
- [ ] Anexos não salvar
- [ ] Fotos não uploadar em mobile
- [ ] Evidências não aparecerem
- [ ] File sizes limitados incorretamente

### Workflows
- [ ] Transições não validar permissões
- [ ] Agendamentos não dispararem
- [ ] SLA não calcular
- [ ] Reabertura não resetar

### Dashboards
- [ ] Charts não renderizarem
- [ ] Filtros não atualizarem
- [ ] KPIs não atualizarem em tempo real
- [ ] Data não filtrar

### Forms
- [ ] Validação falhar
- [ ] Dropdowns não atualizarem dinamicamente
- [ ] Form não resetar
- [ ] Submit não funcionar

---

## 🚨 Prioridade de Bugs

### Critical (Bloqueiam desenvolvimento)
1. Autenticação não inicializar
2. Banco de dados não conectar
3. Uploads não funcionarem
4. Workflows não validar permissões

### High (Atrasam Milestones)
1. Dashboards não renderizarem
2. Charts não mostrar dados
3. Filtros não funcionarem
4. Timeline não atualizar

### Medium (Atrasam UX)
1. Mobile não responsivo
2. Dark mode não persistir
3. Notificações não dispararem
4. Formulários não resetarem

### Low (Melhoria de UX)
1. Loading states não aparecerem
2. Toasts não mostrar
3. Transições não suavizarem
4. Tooltip não aparecerem
