# Robotics Hub

> **One Platform. Full Governance.**
> Integrated governance, HSE and Non-Conformity platform for ABB Robotics Brasil & Argentina.

**Tagline:** Corporate governance ecosystem for operations, HSE, compliance and quality — built on Vercel + Supabase + Next.js

---

## 📄 Documentação Oficial

| Documento | Descrição |
|-----------|-----------|
| [README.md](README.md) | Visão geral do projeto (este arquivo) |
| [docs/schema/database.md](docs/schema/database.md) | Schema completo do banco (16+ tabelas) |
| [docs/schema/rbac.md](docs/schema/rbac.md) | Perfis de acesso e permissões detalhados |
| [docs/workflows/nc-flow.md](docs/workflows/nc-flow.md) | Fluxo NC completo em 9 etapas |
| [docs/workflows/hazard-flow.md](docs/workflows/hazard-flow.md) | Fluxo Hazard / SOT simplificado |
| [docs/workflows/complaint-flow.md](docs/workflows/complaint-flow.md) | Fluxo NPS / Reclamações |
| [docs/dashboards/architecture.md](docs/dashboards/architecture.md) | Dashboards sem Power BI |
| [docs/admin-guide/README.md](docs/admin-guide/README.md) | Guia de administração |
| [docs/ai-agents/AI-Agents-Tasks.md](docs/ai-agents/AI-Agents-Tasks.md) | Tarefas e bugs para agentes de IA |
| [docs/open-points.md](docs/open-points.md) | Pontos em aberto para validação |

**Documentação base:** Documentação do Projeto — Sistema Integrado de Registro e Gestão de Não Conformidades v0.1 (28/05/2026)

---

## 🎯 Objetivo

Criar uma **plataforma corporativa moderna, escalável e independente** para substituir gradualmente sistemas como Intelex, Trinapse, Power Platform e Power BI.

### Por que estamos criando este sistema

- **Padronizar** o registro e tratamento de NCs entre Brasil e Argentina
- **Garantir aderência** às normas ISO 9001, 14001, 45001 e Hazard/SOT
- **Centralizar** informações que hoje ficam fragmentadas em planilhas, e-mails e sistemas legados
- **Rastreabilidade ponta a ponta:** quem abriu, quem tratou, quais ações, quem aprovou, quando venceu, se foi eficaz
- **Reduzir tempo** de abertura — qualquer colaborador registra em < 2 minutos
- **Disponibilizar evidências** e histórico completo para auditorias e compliance
- **Gerar indicadores** gerenciais e operacionais (SLA, reincidência, risco, áreas críticas)
- **Reduzir dependência** de plataformas fragmentadas, preparando base escalável

**Scope:** Fábrica Sorocaba, Escritório São Paulo, Argentina, expansão futura

> **Nota:** Treinamentos, Controle de EPI, Controle de Acessos e Saída de Materiais possuem sistemas próprios e **não fazem parte** deste projeto. Podem ser referência para integrações futuras.

---

## 🏗️ Stack Tecnológica

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| **Frontend** | Next.js 15 | SSR, rotas dinâmicas, performance |
| **UI** | Tailwind + shadcn/ui | Moderno, acessível, customizável |
| **Charts** | Recharts + Tremor | Dashboards profissionais sem Power BI |
| **Backend** | Vercel Serverless Functions | Deploy automático, escalabilidade |
| **Banco de Dados** | Supabase (PostgreSQL) | RLS, Auth, Realtime, Storage |
| **ORM** | Prisma | Type-safe database access |
| **Auth** | Supabase Auth + RBAC | Email/senha, perfis granulares |
| **Storage** | Supabase Storage | Anexos, documentos, certificados |
| **Forms** | React Hook Form + Zod | Validação robusta |
| **Query** | TanStack Query | Cache, stale-while-revalidate |
| **State** | Zustand | Leve e simples |
| **Email** | Resend + React Email | Notificações transacionais |
| **PDF** | React PDF | Certificados, relatórios |
| **Deploy** | Vercel | CI/CD, preview deployments |
| **CI/CD** | GitHub Actions | Automação de testes e deploy |
| **Logs** | Sentry | Error tracking |

### Por que NÃO Microsoft Power Platform?

| Critério | Power Platform | Vercel + Supabase |
|----------|----------------|-------------------|
| **Custo** | ~$10/user/mês | **Gratuito** (open source) |
| **Integração** | Embed complexo | **Nativo** na aplicação |
| **Autenticação** | SSO separado | **Mesma auth** |
| **Mobile** | App separado | **Responsivo nativo** |
| **Manutenção** | Gateway/refresh | **Zero overhead** |
| **Real-time** | Limitado | **Supabase Realtime** grátis |
| **Customização** | Limitada | **Total controle** |
| **Vendor Lock-in** | Sim | **Não** |

Ver [docs/dashboards/architecture.md](docs/dashboards/architecture.md).

---

## 📦 Módulos (5)

### 1. Não Conformidade (Core)
- Fluxo completo em **9 etapas** com workflow estruturado
- Conformidade **ISO 9001, 14001, 45001**
- Geração automática ID: `NC-000001`
- Dropdowns dinâmicos (norma → itens da norma)
- Timeline visual com 12 status
- Aprovação multinível
- Análise de causa (5 Porquês / Ishikawa)
- Eficácia automática (90/180 dias)
- Reabertura automática se não eficaz
- Histórico completo para auditoria

### 2. Hazard / SOT
- Categorias: Segurança, Saúde, Meio Ambiente, Security Patrimonial
- Registro rápido (< 2 min) — mobile-first (chão de fábrica)
- Foto como evidência prioritária
- Geração automática ID: `HZ-000001` / `SOT-000001`
- Heatmap de risco, dashboard HSE

### 3. Gestão Documental ISO
- Procedimentos, instruções, formulários
- Controle de revisão, validade, aprovações
- Versionamento e histórico completo
- Alertas automáticos de expiração
- Vinculação com normas e NCs

### 4. NPS / Reclamações de Clientes
- Reclamações, feedbacks, incidentes
- SLA por cliente com escalonamento
- Geração automática de NC a partir de reclamação
- Dashboard NPS com tendência de satisfação
- Geração automática ID: `NPS-000001`

### 5. Auditorias
- Auditorias internas e externas
- Constatações e observações
- Vinculação com NCs
- Evidências

---

## 🔄 Fluxo NC — 9 Etapas

```
Abertura → Definição Resolvedor → Aceite → Ação Imediata (30d) →
Aprovação → Análise Causa (5 Porquês / Ishikawa) → Ação Corretiva →
Aprovação Final → Eficácia (90d/180d) → [Eficaz → Fecha | Não Eficaz → Reabre]
```

| # | Etapa | Responsável | Saída |
|---|-------|-------------|-------|
| 1 | Abertura | Originador | Registro com ID automático |
| 2 | Definição resolvedor | Qualidade/HSE | Responsável definido |
| 3 | Aceite | Resolvedor | Aceito ou rejeitado |
| 4 | Ação imediata | Resolvedor | Plano de contenção (30d) |
| 5 | Aprovação | Qualidade/HSE | Aprovada ou reprovada |
| 6 | Análise de causa | Resolvedor | Causa raiz (5P/Ishikawa) |
| 7 | Ação corretiva | Resolvedor | Ação com prazo e dono |
| 8 | Aprovação final | Qualidade/HSE | Pronto para eficácia |
| 9 | Eficácia | Qualidade/HSE | Fechamento ou reabertura |

Detalhes: [docs/workflows/nc-flow.md](docs/workflows/nc-flow.md)

---

## 📊 Dashboards (sem Power BI)

### Dashboard Executivo
Total NCs/Hazards/NPS, SLA compliance, risco alto, reincidência, tempo médio, áreas críticas, KPIs ISO

### Dashboard Qualidade
NC por norma/processo/unidade/país, tendência mensal, pareto, efetividade

### Dashboard HSE
Hazard por categoria/local, risco alto, áreas críticas, heatmap

### Dashboard Documental
Documentos vencendo, revisões pendentes, compliance

### Dashboard NPS
Reclamações por cliente/projeto, SLA, motivos, tendência satisfação

Ver: [docs/dashboards/architecture.md](docs/dashboards/architecture.md)

---

## 👥 Perfis de Acesso

| Perfil | Responsabilidade |
|--------|-----------------|
| **Usuário / Originador** | Abrir registros, acompanhar seus casos |
| **Resolvedor** | Receber tarefas, executar ações (imediata + corretiva) |
| **Qualidade / HSE** | Governar fluxo, aprovar, reabrir, definir responsáveis |
| **Administrador** | Gerenciar listas, permissões, parametrizações |
| **Gestores / Aprovadores** | Aprovar etapas críticas |
| **Auditor** | Visualização e análise de todos os registros |
| **Diretor** | Dashboards executivos |

Detalhes: [docs/schema/rbac.md](docs/schema/rbac.md)

---

## ⚡ Regras de Negócio

1. **Modularidade** — Todas as listas administráveis via UI (sem depender do dev)
2. **Interface Simples** — Registro em menos de 2 minutos
3. **Mobile First** — Funciona em celular/tablet (chão de fábrica, inspeções)
4. **Evidências** — Foto, vídeo, PDF, áudio, PPT, Excel, print
5. **Timeline Visual** — Linha do tempo de status em cada registro
6. **Originador registrado** — Nunca anônimo
7. **Dropdowns dinâmicos** — Norma → itens filtrados automaticamente
8. **Escalonamento automático** — SLA vencido → gestor alertado + status "Atrasado"
9. **Eficácia agendada** — 90 ou 180 dias automático
10. **Histórico completo** — Quem alterou, quando, o quê (reconstruir ciclo de vida)
11. **Multi-tenant** — `organization_id` em todas as tabelas
12. **Auto-IDs** — NC-000001, HZ-000001, SOT-000001, NPS-000001
13. **Papéis funcionais** — Aprovadores por papel, não por nome
14. **Aprovação multinível** — Etapas críticas exigem validação

---

## ⚠️ Pontos em Aberto

Ver [docs/open-points.md](docs/open-points.md) para a lista completa de validações pendentes:

1. Lista definitiva de itens por norma
2. Matriz final de aprovadores (papéis vs nomes)
3. Regras de prazo de eficácia (90 vs 180 dias)
4. Nomenclatura Hazard / SOT / SOFIA
5. Arquitetura de implantação (MVP intermediário?)
6. Integrações prioritárias (SAP, CRM, etc.)
7. Modelo de relatórios
8. Multi-tenant no MVP
9. Idiomas da interface (pt-BR + es-AR?)

---

## 🗺️ Roadmap

### Sprint 0 — Foundation
- [ ] Setup Base (Next.js, Supabase, Prisma, CI/CD)
- [ ] Layout Global (Sidebar, Header, Home Buttons)
- [ ] Banco Inicial (16+ tabelas, RLS, seeds)
- [ ] Autenticação e RBAC (login, signup, permissões, middleware)

### Sprint 1 — Não Conformidade (Core)
- [ ] Formulário NC completo
- [ ] Detalhe NC com timeline
- [ ] Dashboard NC (KPIs, charts)
- [ ] Ação Imediata
- [ ] Ação Corretiva
- [ ] Eficácia e Reabertura
- [ ] Admin de Módulos NC

### Sprint 2 — Hazard / HSE
- [ ] Registro rápido mobile-first
- [ ] Dashboard HSE

### Sprint 3 — Gestão Documental
- [ ] Revisões, aprovações, versionamento
- [ ] Alertas automáticos

### Sprint 4 — NPS / Reclamações
- [ ] Reclamações, SLA, dashboards

### Sprint 5 — Auditorias
- [ ] Gestão de auditorias, vinculação com NCs

### Sprint 6 — Workflow Engine
- [ ] Motor centralizado de workflow

### Sprint 7 — Dashboards Avançados
- [ ] Executivo, Documental, HSE

### Sprint 8 — Inteligência Artificial
- [ ] Sugestão causa raiz, classificação automática, OCR, insights

### Sprint 9 — Notificações
- [ ] Sistema de notificações (email + in-app)

### Sprint 10 — Integrações
- [ ] Scaffolds para SAP, CRM, Outlook, Teams

---

## 🗂️ Estrutura do Projeto

```
src/
├── app/
│   ├── (auth)/               # Login, Signup
│   ├── (dashboard)/          # Dashboard principal
│   └── (app)/
│       ├── nc/               # Não conformidades
│       ├── hazards/          # Hazard / SOT
│       ├── complaints/       # NPS / Reclamações
│       ├── documents/        # Documentos ISO
│       ├── audits/           # Auditorias
│       ├── pending/          # Minhas pendências
│       └── admin/            # Administração
│   └── api/                  # Route handlers
├── components/
│   ├── ui/                   # Componentes base
│   ├── layout/               # Sidebar, Header, Home Buttons
│   ├── forms/                # Formulários reutilizáveis
│   ├── nc/                   # Componentes NC
│   ├── hazards/              # Componentes Hazard
│   ├── complaints/           # Componentes NPS
│   ├── documents/            # Componentes Documentos
│   ├── audits/               # Componentes Auditorias
│   ├── dashboard/            # Charts, KPI Cards
│   ├── timeline/             # Timeline visual
│   └── workflow/             # Componentes Workflow
├── lib/
│   ├── supabase/             # Client + Server
│   ├── auth/                 # Middleware, permissões RBAC
│   ├── types/                # TypeScript types + enums
│   ├── utils/                # Helpers, ID generator
│   ├── validators/           # Validação (Zod)
│   ├── workflow/             # Workflow engine
│   ├── notifications/        # Sistema de notificações
│   └── integrations/         # Integrações futuras
└── styles/                   # CSS global

supabase/
├── migrations/               # Schema SQL versionado
├── seed/                     # Dados iniciais
└── rls/                      # Row Level Security

docs/
├── schema/                   # Database + RBAC
├── workflows/                # Fluxos de cada módulo
├── dashboards/               # Arquitetura de dashboards
├── api/                      # Documentação de API
├── admin-guide/              # Guia de administração
├── ai-agents/                # Tarefas para agentes de IA
└── open-points.md            # Validações pendentes
```

---

## 🏢 Empresa

**ABB Robotics Brasil** — Unidade Robotics BR/AR

## 🤝 Contribuindo

Projeto corporativo fechado. Contributions devem ser aprovadas pelo responsável.

## 📞 Contato

**Responsável Estratégico:** Gabriel Ciandrini
**E-mail:** gabriel.ciandrini@br.abb.com
**Empresa:** ABB Robotics Brasil
**Unidades:** Sorocaba (fábrica), São Paulo (escritório), Argentina

---

**Status:** 🚧 Em planejamento — kick-off concluído, documentação v0.1 consolidada
