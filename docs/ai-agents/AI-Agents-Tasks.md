# AI Agents Tasks — Robotics Hub

> Lista de tarefas detalhadas e possíveis bugs para agentes de IA implementarem.
>
> **Nota:** Módulos de Treinamentos, Controle de EPI, Controle de Acessos e Saída de Materiais **não fazem parte** deste projeto — possuem sistemas próprios.

## Visão Geral

Este documento descreve todas as tarefas de implementação do **Robotics Hub** (antigo non-conformity-system), incluindo fluxos, dashboards, autenticação e funcionalidades específicas.

---

## 📦 Sprint 0 — Foundation

> Sprint 0 is substantially complete. Items marked `[ ]` are deferred to backlog or Sprint 1.

### 1. Setup Base — ✅ DONE

**Stack atual (instalado e configurado):**
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS 4
- Supabase client (browser + server + admin)
- @tanstack/react-query
- recharts (para gráficos)
- react-hook-form + zod + @hookform/resolvers
- zustand (state management)
- date-fns + clsx + tailwind-merge

**Checklist:**
- [x] Next.js 15 + TypeScript + Tailwind CSS
- [x] Supabase client (browser + server + admin)
- [x] `.env.example` configurado

**Deferido:**
- [ ] shadcn/ui setup → Sprint 1
- [ ] CI/CD com GitHub Actions → Backlog
- [ ] Dark mode toggle → Backlog

---

### 2. Layout Global — ✅ DONE

**Arquivos:** `src/components/layout/sidebar.tsx`, `header.tsx`, `home-buttons.tsx`, `navigation.tsx`, `src/app/layout.tsx`

**Checklist:**
- [x] Sidebar com navegação modular (5 módulos)
- [x] Header com dados do usuário e ações globais
- [x] Home Buttons (grandes botões de entrada)
- [x] Navegação dinâmica
- [x] Protected routes via middleware

**Deferido:**
- [ ] Dark mode toggle → Backlog

---

### 3. Banco de Dados — ✅ DONE

**Arquivos:** `supabase/migrations/`, `supabase/seeds/`

**Checklist:**
- [x] 16+ tabelas via SQL migrations (users, roles, permissions, nc_records, hazards, documents, audit_logs, attachments, etc.)
- [x] Índices para performance
- [x] Foreign keys com cascade delete
- [x] Seeds com dados iniciais (roles, orgs, normas, processos, business)
- [x] Enum types (status, risk_level, categories)
- [x] Row level security policies

---

### 4. Autenticação e RBAC — ✅ DONE

**Arquivos:** `src/lib/supabase/`, `src/lib/auth/`, `src/middleware.ts`, `src/app/(auth)/`

**Checklist:**
- [x] Login com Supabase Auth
- [x] Signup com verificação de email
- [x] Callback route para Supabase Auth
- [x] Perfis de usuário (role_id)
- [x] RBAC com 7 roles + permissões granulares (por módulo)
- [x] Middleware protegendo rotas
- [x] Helper `hasPermission(role, permission)`

---

### 5. User Management CRUD — ✅ DONE

**Checklist:**
- [x] CRUD de usuários (admin)
- [x] Atribuição de roles
- [x] Filtros e busca

---

## 🚀 Sprint 1 — Non Conformity (MVP)

### 6. Registro NC — Formulário Completo

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

### 7. Detalhe NC — Timeline e Workflow

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

### 8. Dashboard NC — KPIs e Charts

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

### 9. Ação Imediata

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

### 10. Ação Corretiva

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

### 11. Eficácia e Reabertura

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

### 12. Admin de Módulos NC

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

### 13. shadcn/ui Setup

**Tarefas:**
- [ ] Instalar e configurar shadcn/ui
- [ ] Adicionar componentes base (Button, Input, Select, Dialog, etc.)
- [ ] Substituir componentes custom onde apropriado

---

## 🔥 Sprint 2 — Hazard / HSE

### 14. Registro Hazard — Mobile First

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

### 15. Dashboard HSE

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

### 16. Gestão Documental ISO

**Arquivos necessários:**
- `src/app/(app)/documents/page.tsx`
- `src/app/(app)/documents/[id]/page.tsx`
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

### 17. NPS e Reclamações

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

## 🔍 Sprint 5 — Audits

### 18. Gestão de Auditorias

**Arquivos necessários:**
- `src/app/(app)/audits/page.tsx`
- `src/app/(app)/audits/[id]/page.tsx`
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

## ⚙️ Sprint 6 — Workflow Engine

### 19. Motor de Workflow Centralizado

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

### 20. Dashboard Executivo

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

### 21. Dashboard Documental

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

## 🤖 Sprint 7 — Inteligência Artificial

### 22. Sugestão Automática de Causa Raiz

**Arquivos necessários:**
- `src/app/api/ai/suggest-root-cause/route.ts`

**Tarefas:**
- [ ] Implementar API de sugestão de causa raiz
- [ ] Integrar com modelo de IA (OpenAI / Claude)
- [ ] Implementar estrutura de prompt
- [ ] Implementar parsing da resposta
- [ ] Fornecer 3-5 sugestões baseadas em descrição

**Possíveis Bugs:**
- IA não retornar resposta formatada
- Prompt não passar contexto correto
- API não validar permissão

---

### 23. Classificação Automática

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

### 24. OCR de Imagens

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

### 25. Insights Preditivos

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

## 📞 Sprint 8 — Notificações

### 26. Sistema de Notificações

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

## 🔧 Sprint 9 — Integrações

### 27. Integrações Futuras

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

## 📋 Backlog

- [ ] CI/CD com GitHub Actions
- [ ] Dark mode toggle
- [ ] shadcn/ui setup (moved to Sprint 1)

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
