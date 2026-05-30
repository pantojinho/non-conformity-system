# Sprints - Robotics Portal (Non-Conformity System)

> Documento consolidado contendo roadmap completo, progresso atual, notas de desenvolvimento e possíveis bugs.

---

## 📋 Resumo de Progresso

**Sprint 0:** ✅ Concluída (28/05/2026)
- Autenticação Supabase (sem OAuth/signup)
- Roles de usuário (admin, gestor, técnico, viewer)
- 17 componentes UI
- i18n PT/EN/ES
- Dark/Light theme

**Sprint 1:** 🔄 Em andamento (30/05/2026)
- NPS (Net Promoter Score) - **70% funcional**
- NC Core (Non-Conformity) - **não iniciado**
- Dashboard - **parcial**

---

## 🚀 Sprint 0 — Foundation ✅ DONE

> **Fechado em:** 28/05/2026  
> **Commit:** `4d3cfc8` (último fix — verifyAdmin RLS bypass)  
> **Status:** 100% funcional em produção

### 1. Setup Base ✅

**Stack atual (instalado e configurado):**
- Next.js 15.3.8 + React 19 + TypeScript
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

### 2. Layout Global ✅

**Arquivos:** `src/components/layout/sidebar.tsx`, `header.tsx`, `home-buttons.tsx`, `navigation.tsx`, `src/app/layout.tsx`

**Checklist:**
- [x] Sidebar com navegação modular (5 módulos)
- [x] Header com dados do usuário e ações globais
- [x] Home Buttons (grandes botões de entrada)
- [x] Navegação dinâmica
- [x] Protected routes via middleware

### 3. Banco de Dados ✅

**Arquivos:** `supabase/migrations/001_initial.sql`, `002_auto_profile_and_superadmin.sql`, `003_add_nps_fields.sql`

**Checklist:**
- [x] 16+ tabelas via SQL migrations
- [x] Índices para performance (~25 índices)
- [x] Foreign keys com cascade delete
- [x] Seeds com dados iniciais (roles, orgs, normas, processos, business)
- [x] Enum types (status, risk_level, categories)
- [x] Row level security policies
- [x] Trigger auto-profile on signup (migration 002)
- [x] Role `super_admin` adicionada (migration 002)
- [x] Connection via psql testada e funcional

### 4. Autenticação e RBAC ✅

**Arquivos:** `src/lib/supabase/`, `src/lib/auth/`, `src/middleware.ts`, `src/app/(auth)/`

**Checklist:**
- [x] Login com Supabase Auth
- [x] Signup com verificação de email
- [x] Callback route para Supabase Auth
- [x] Perfis de usuário (role_id)
- [x] RBAC com 8 roles + permissões granulares (por módulo)
- [x] Middleware protegendo rotas
- [x] Helper `hasPermission(role, permission)`
- [x] `verifyAdmin()` com service-role client (bypass RLS) — shared lib

### 5. User Management CRUD ✅

**Arquivos:** `src/app/api/admin/users/route.ts`, `src/app/api/admin/users/[id]/route.ts`, `src/components/admin/`

**Checklist:**
- [x] CRUD de usuários (admin)
- [x] Atribuição de roles (8 perfis incluindo super_admin)
- [x] Filtros e busca
- [x] Ban/unban automático de auth user ao desativar/reativar
- [x] Reset de senha via admin
- [x] Admin real configurado: gabriel.ciandrini@br.abb.com (role admin, org ABB BR)

### 6. Deploy e Infra ✅

**Checklist:**
- [x] GitHub repo: `pantojinho/non-conformity-system`
- [x] Vercel: non-conformity-system.vercel.app (auto-deploy from master)
- [x] Supabase Pro: project `nqrqsrdugsuvrdqaiail`, MICRO compute, Americas
- [x] GitHub integration vinculada ao Supabase
- [x] Env vars configuradas no Vercel (SUPABASE_URL, ANON_KEY, SERVICE_ROLE_KEY)
- [x] Domínio roboticsportal.com.br configurado
- [x] Auto-migrate via GitHub Actions workflow

---

## 🎯 Sprint 1 — NPS & NC Core ← ATUAL

> **Status:** 70% concluído  
> **Data início:** 30/05/2026  
> **Próximos passos:** Criar bucket Storage, executar dados de teste, iniciar NC Core

### ✅ NPS (Reclamações & Feedback) — 90% Funcional

#### Funcionalidades Implementadas

**API Endpoints:**
- [x] `GET /api/nps` - Lista todos os registros
- [x] `POST /api/nps` - Cria novo registro
- [x] `GET /api/nps/[id]` - Detalhes + relações
- [x] `PATCH /api/nps/[id]` - Atualiza registro
- [x] `DELETE /api/nps/[id]` - Exclui registro
- [x] `GET/POST /api/nps/[id]/comments` - Comentários
- [x] `GET/POST /api/nps/[id]/attachments` - Anexos
- [x] `GET/POST /api/nps/[id]/actions` - Ações corretivas
- [x] `GET /api/nps/[id]/activity` - Timeline de atividades
- [x] `GET /api/nps/[id]/upload-url` - URL assinada para upload

**Páginas UI:**
- [x] `/complaints` - Lista de reclamações com cards
- [x] `/complaints/[id]` - Detalhes da reclamação
- [x] Dashboard com KPI cards

**Features:**
- [x] Card com: cliente, descrição, status, canal, NPS score
- [x] Dropdown de status: aberto, em_analise, em_andamento, resolvido, fechado
- [x] Botão de excluir registro (com confirmação)
- [x] Busca e filtros (por status, categoria)
- [x] KPI cards: NPS score, total, SLA, resolvidas
- [x] NPS score visual (10 dots com cores)
- [x] Indicadores de canal com emojis (📧, 📞, 📊, 🌐, 💬)
- [x] Badges de status e prioridade
- [x] Timeline de atividades
- [x] Formulário de comentários
- [x] Loading states e error handling

#### Schema do Banco

**Tabelas:**
- [x] `nps_records` - Tabela principal
- [x] `nps_comments` - Comentários
- [x] `nps_attachments` - Anexos
- [x] `nps_activity_log` - Log de atividades
- [x] `nps_corrective_actions` - Ações corretivas

**Campos principais:**
- [x] cliente, descricao, categoria, canal, prioridade, severidade, nota_nps
- [x] sla_prazo_dias, sla_data_limite, days_remaining, sla_status
- [x] Campos adicionais (migration 003): canal, prioridade, severidade

#### ⚠️ Issues Conhecidos

**1. Upload de anexos - Erro 500**
- **Causa:** Endpoint atual falha, mas rota `upload-url` criada
- **Solução pendente:**
  1. Bucket `nps-attachments` já existe ✓
  2. Implementar upload via signed URL
  3. Atualizar UI para usar nova rota

**2. Dados de teste vazios**
- **Solução:** Executar script `scripts/populate-nps-test-data-v2.sql` (simplificado)
- **Local:** `/home/pantojinho/temp/non-conformity-system/scripts/populate-nps-test-data-v2.sql`
- **Resultado:** 5 registros de teste com clientes reais (VW, Fiat, GM, Toyota, Mercedes)

**3. Códigos NPS nulos**
- **Solução:** Executar script `scripts/fix-nps-codes.sql`
- **Resultado:** Gera códigos NPS-000001 para registros com codigo=null

### ⏳ NC Core (Non-Conformity) — Não Iniciado

#### Arquivos Necessários
- `src/app/(app)/nc/new/page.tsx`
- `src/components/forms/nc-form.tsx`
- `src/lib/validators/nc.ts`
- `src/app/api/nc/create/route.ts`
- `src/app/(app)/nc/[id]/page.tsx`

#### Tarefas Pendentes
- [ ] API `/api/nc` - CRUD de não conformidades
- [ ] Página `/nc` - Lista de NCs
- [ ] Página `/nc/[id]` - Detalhes da NC
- [ ] Página `/nc/new` - Criar nova NC
- [ ] Workflow: análise → ação corretiva → validação → fechamento
- [ ] Vinculação NPS ↔ NC
- [ ] Análise de causa raiz (5 Whys, Ishikawa)

#### Possíveis Bugs
- Dropdowns não atualizarem dinamicamente
- Upload de anexos não funcionar em mobile
- Validação falhar em campos obrigatórios
- ID não gerar em sequência correta
- Form não resetar após submissão
- Timeline não mostrar status completo
- Comentários não persistirem
- Anexos não mostrarem
- Botões de ação não aparecerem para usuário certo

### 📊 Dashboard — Parcial

#### Tarefas Pendentes
- [ ] Gráficos de tendências (line/bar charts)
- [ ] Heatmap de NCs por departamento
- [ ] Distribuição de NPS por canal
- [ ] Alertas SLA overdue
- [ ] Top clientes com mais reclamações

#### Arquivos Necessários
- `src/components/dashboard/kpi-cards.tsx`
- `src/components/dashboard/charts/nc-by-norma.tsx`
- `src/components/dashboard/charts/nc-by-process.tsx`
- `src/components/dashboard/charts/nc-trend.tsx`
- `src/app/(dashboard)/nc/page.tsx`

#### Possíveis Bugs
- Charts não renderizarem dados
- Filtros não atualizarem gráficos
- KPI cards não atualizarem em tempo real
- Data não filtrar corretamente

---

## 🚀 Sprint 2 — NC Core Workflow ← PRÓXIMO

> **Dependências:** Sprint 1 ✅ concluído  
> **Ordem sugerida:** 7 → 9 → 10 → 11 → 12

### 7. Registro NC — Formulário Completo

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

### 11. Eficácia e Reabertura

**Arquivos necessários:**
- `src/components/nc/efficacy-section.tsx`
- `src/lib/workflow/transitions.ts`

**Tarefas:**
- [ ] Implementar agendamento automático de eficácia (90 ou 180 dias)
- [ ] Criar formulário de verificação de eficácia
- [ ] Implementar reabertura automática se não eficaz
- [ ] Implementar contagem de reincidência

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

---

## 🔥 Sprint 3 — Hazard / HSE

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

---

## 📄 Sprint 4 — Documents (ISO)

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

---

## ⚙️ Sprint 5 — Workflow Engine

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

---

## 🤖 Sprint 6 — Inteligência Artificial

### 22. Sugestão Automática de Causa Raiz

**Arquivos necessários:**
- `src/app/api/ai/suggest-root-cause/route.ts`

**Tarefas:**
- [ ] Implementar API de sugestão de causa raiz
- [ ] Integrar com modelo de IA (OpenAI / Claude)
- [ ] Implementar estrutura de prompt
- [ ] Implementar parsing da resposta
- [ ] Fornecer 3-5 sugestões baseadas em descrição

### 23. Classificação Automática

**Arquivos necessários:**
- `src/app/api/ai/classify-nc/route.ts`

**Tarefas:**
- [ ] Implementar API de classificação
- [ ] Classificar por norma
- [ ] Classificar por processo
- [ ] Classificar por categoria

### 24. OCR de Imagens

**Arquivos necessários:**
- `src/app/api/ai/ocr/route.ts`

**Tarefas:**
- [ ] Implementar OCR de imagens
- [ ] Integrar com serviço de OCR (Google Vision, AWS Textract)
- [ ] Extrair texto de fotos de evidências

---

## 📞 Sprint 7 — Notificações

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

---

## 🔧 Sprint 8 — Integrações

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

---

## 📈 Sprint 9 — Dashboards Avançados

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

### 21. Dashboard Documental

**Arquivos necessários:**
- `src/components/dashboard/documental-dashboard.tsx`
- `src/components/dashboard/charts/documents-expiring.tsx`
- `src/components/dashboard/charts/revisions-pending.tsx`

**Tarefas:**
- [ ] Criar KPIs de documentação
- [ ] Criar gráficos de vencimento
- [ ] Criar gráficos de revisões pendentes

---

## 🗂️ Estrutura de Arquivos

```
src/
├── app/
│   ├── (app)/
│   │   ├── complaints/          # NPS (✅)
│   │   │   ├── page.tsx         # Lista
│   │   │   ├── [id]/page.tsx    # Detalhes
│   │   │   └── new/             # Criar (pendente)
│   │   ├── dashboard/page.tsx   # Dashboard (parcial)
│   │   ├── nc/                  # NC (⏳)
│   │   └── hazards/             # Perigos (⏳)
│   └── api/
│       └── nps/
│           ├── route.ts         # CRUD (✅)
│           └── [id]/
│               ├── route.ts     # Detalhes/update/delete (✅)
│               ├── comments/    # Comentários (✅)
│               ├── attachments/ # Anexos (⚠️ precisa fix)
│               ├── actions/     # Ações corretivas (✅)
│               └── activity/    # Timeline (✅)

scripts/
├── populate-nps-test-data-v2.sql   # Dados de teste (✅)
└── fix-nps-codes.sql               # Fix códigos nulos (✅)
```

---

## 📝 Notas de Desenvolvimento

### 30/05/2026 - Sessão de testes NPS + Documentação

#### Feito:
- ✅ Corrigiu mapeamento de campos (cliente/description/canal/nota_nps)
- ✅ Adicionou botão de delete com confirmação
- ✅ Corrigiu dropdown de status (aberto/resolvido vs aberta/resolvida)
- ✅ Migration 003 aplicada (canal, prioridade, severidade)
- ✅ Consolidou documentação (SPRINTS.md)
  - Mergedeu AI-Agents-Tasks.md + SPRINTS.md em único arquivo
  - Removido docs/ai-agents/AI-Agents-Tasks.md (duplicado)
  - Roadmap completo com 9 sprints detalhados
- ✅ Criou scripts SQL:
  - `scripts/fix-nps-codes.sql` — Gera códigos NPS-000001 para nulos
  - `scripts/populate-nps-test-data-v2.sql` — Dados de teste simplificados
  - `scripts/create-test-user.sql` — Cria perfil de usuário teste
- ✅ Verificou endpoint de upload (`/api/nps/[id]/attachments`)
  - Implementado com Supabase Storage bucket `nps-attachments`
  - Validações: 10MB max, sanitização de nome
  - Gera registro + log de atividade

#### Issues Ativos:
⚠️ Upload de anexos - Erro 500
- Bucket `nps-attachments` existe (verificado)
- Endpoint implementado corretamente
- **Próximos passos:**
  1. Criar usuário teste: test@abb.com / test123!
  2. Executar script `scripts/create-test-user.sql`
  3. Testar upload na produção com Console aberto (F12)

#### Próximos passos imediatos:
1. Testar upload de anexos (aguardando usuário teste)
2. Executar scripts de dados de teste no Supabase
3. Testar completo NPS: listar, criar, editar, excluir, comentários, anexos
4. Iniciar desenvolvimento NC Core (Sprint 1, Task 7)

### Histórico anterior:
- ✅ 28/05/2026 - Sprint 0 concluída (100% funcional)
- 🔄 30/05/2026 - Sessão de testes NPS (sessão anterior)

---

## 🔗 Links Importantes

- **Produção:** https://roboticsportal.com.br
- **Repositório:** https://github.com/pantojinho/non-conformity-system
- **Supabase:** db.nqrqsrdugsuvrdqaiail.supabase.co
- **Debug Schema:** https://roboticsportal.com.br/api/debug-nps-schema

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

---

## 📝 Backlog

- [ ] CI/CD com GitHub Actions
- [ ] Dark mode toggle
- [ ] shadcn/ui setup (moved to Sprint 1)

---

## ⚠️ Exclusão de Documentos

> **Consolidado em:** 30/05/2026  
> **Ação:** Arquivo `docs/ai-agents/AI-Agents-Tasks.md` removido  
> **Razão:** Conteúdo integrado ao SPRINTS.md para evitar duplicação e facilitar manutenção

> Módulos de Treinamentos, Controle de EPI, Controle de Acessos e Saída de Materiais **não fazem parte** deste projeto — possuem sistemas próprios.