# Robotics Hub

> **One Platform. Full Governance.**
> Integrated governance, HSE and Non-Conformity platform for ABB Robotics Brasil & Argentina.

**Tagline:** Corporate governance ecosystem for operations, HSE, compliance and quality — built on Vercel + Supabase + Next.js

---

## 🎯 Objetivo

Criar uma **plataforma corporativa moderna, escalável e independente de fornecedores Microsoft tradicionais** para substituir gradualmente sistemas como:
- Intelex
- Trinapse
- Power Platform
- Power BI

Sistema unificado para gestão de:
- ✅ Não Conformidades
- ✅ Hazard / SOT
- ✅ Gestão Documental ISO
- ✅ Reclamações de Clientes (NPS)
- ✅ Gestão de Auditorias
- ✅ Controle de Aprovações
- ✅ Analytics Corporativo
- ✅ Gestão de Processos
- ✅ Workflow Operacional
- ✅ Compliance ISO
- ✅ Governança BR + Argentina

**Scope:** Fábrica Sorocaba, Escritório São Paulo, Argentina, expansão futura

> **Nota:** Treinamentos, Controle de EPI, Controle de Acessos e Saída de Materiais possuem sistemas próprios e **não fazem parte** deste projeto.

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
| **Deploy** | Vercel | CI/CD, preview deployments |

### Por que NÃO usar Microsoft Power Platform?

| Critério | Power Platform | Vercel + Supabase |
|----------|----------------|-------------------|
| **Custo** | ~$10/user/mês | **Gratuito** (open source) |
| **Integração** | Embed complexo | **Nativo** na aplicação |
| **Autenticação** | SSO separado | **Mesma auth** do sistema |
| **Mobile** | App separado | **Responsivo nativo** |
| **Manutenção** | Gateway/refresh | **Zero overhead** |
| **Real-time** | Limitado (DirectQuery) | **Supabase Realtime** grátis |
| **Customização** | Limitada | **Total controle** |
| **Vendor Lock-in** | Sim | **Não** |

Ver [docs/dashboards/architecture.md](docs/dashboards/architecture.md) para detalhes.

---

## 📦 Módulos do Sistema

### 1. Não Conformidade
- Fluxo completo: abertura → ação imediata → aprovação → ação corretiva → análise de causa → eficácia → fechamento
- Conformidade ISO 9001, 14001, 45001
- Geração automática ID: `NC-000001`
- Dropdowns dinâmicos (norma → itens da norma)
- Timeline visual de status

**Features:** ✅ Timeline visual ✅ Histórico completo ✅ Reabertura automática ✅ Workflow de aprovação ✅ SLA ✅ Upload evidências ✅ Análise Ishikawa ✅ 5 porquês ✅ Analytics ✅ Dashboard operacional ✅ Rastreabilidade completa

### 2. Hazard / SOT
- Categorias: Segurança, Saúde, Meio Ambiente, Security
- Fluxo simplificado e rápido (< 2 min)
- Mobile-first (chão de fábrica)
- Foto como evidência prioritária
- Geração automática ID: `HZ-000001` / `SOT-000001`

**Features:** ✅ Registro rápido ✅ Upload foto instantâneo ✅ QR code por área ✅ Heatmap de risco ✅ Dashboard HSE ✅ SLA automático ✅ Alertas críticos

### 3. Gestão Documental ISO
- Controle de procedimentos, instruções, formulários
- Controle de revisão, validade, aprovações
- Históricos de publicações
- Alertas automáticos de expiração

**Features:** ✅ Controle de revisão ✅ Controle de validade ✅ Aprovação documental ✅ Histórico completo ✅ Alertas automáticos ✅ Expiração automática ✅ Vinculação com normas ✅ Vinculação com NC

### 4. NPS / Reclamações de Clientes
- Centralização de reclamações, feedbacks, incidentes
- SLA por cliente
- Geração automática NC a partir de reclamação
- Dashboard NPS

**Features:** ✅ SLA cliente ✅ Workflow atendimento ✅ Analytics cliente ✅ Tendência satisfação ✅ Escalonamento ✅ Geração automática NC ✅ Dashboard cliente ✅ Indicadores qualidade

### 5. Auditorias
- Gestão de auditorias internas e externas
- Constatações
- Observações
- Não conformidades
- Evidências

---

## 🔧 Workflow Engine Centralizado

Motor de workflow unificado com:
- ✅ Aprovações multinível
- ✅ Rejeições e reaberturas
- ✅ Escalonamento automático
- ✅ SLA com alertas
- ✅ Notificações
- ✅ Timeline visual
- ✅ Histórico completo
- ✅ Delegação de tarefas
- ✅ Regras condicionais
- ✅ Automações

---

## 👥 Perfis de Acesso

| Perfil | Capacidades |
|--------|-------------|
| **Usuário** | Abrir registros, consultar próprios, ver dashboards gerais |
| **Resolvedor** | Receber tarefas, executar ações, anexar evidências |
| **Qualidade/HSE** | Aprovar, reabrir, definir responsáveis, analisar eficácia |
| **Administrador** | Gerenciar listas, usuários, permissões, configurações |
| **Auditor** | Visualização e análise de dados |
| **Diretor** | Dashboards executivos |

---

## ⚡ Regras de Negócio

1. **Modularidade** — Todas as listas administráveis via UI (sem depender do dev)
2. **Interface Simples** — Registro em menos de 2 minutos
3. **Mobile First** — Funciona em celular/tablet (chão de fábrica)
4. **Evidências** — Foto, vídeo, PDF, áudio, PPT
5. **Timeline Visual** — Linha do tempo de status em cada registro
6. **Originador registrado** — Nunca anônimo
7. **Dropdowns dinâmicos** — Norma → itens filtrados automaticamente
8. **Escalonamento automático** — SLA vencido → gestor é alertado
9. **Eficácia agendada** — 90 ou 180 dias automático
10. **Histórico completo** — Quem alterou, quando, o quê
11. **Multi-tenant** — organization_id em TODAS as tabelas (prepared para expansão)
12. **Auto-IDs** — NC-BR-2026-000001, HZ-AR-2026-000001 (enterprise style)

---

## 📊 Dashboards

### Dashboard Executivo
- Total NCs/Hazards/NPS
- SLA compliance
- Risco alto
- Reincidência
- Tempo médio de resolução
- Áreas críticas
- Processos críticos
- KPIs ISO

### Dashboard Qualidade
- NC por norma/processo/unidade/país
- Tendência mensal
- Pareto de causas

### Dashboard HSE
- Hazard por categoria/local
- Risco alto
- Áreas críticas
- Tendência acidentes evitados

### Dashboard Documental
- Documentos vencendo
- Revisões pendentes
- Atrasos
- Compliance

### Dashboard NPS
- Reclamações por cliente/projeto
- SLA
- Motivos principais
- Tendência de satisfação

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
│   ├── dashboard/            # Charts, KPI Cards
│   ├── timeline/             # Timeline visual
│   └── workflow/             # Componentes Workflow
├── lib/
│   ├── supabase/             # Client (browser) + Server (SSR)
│   ├── auth/                 # Middleware, permissões RBAC
│   ├── types/                # TypeScript types + enums
│   ├── utils/                # Helpers, ID generator
│   ├── validators/           # Validação de formulários (Zod)
│   ├── workflow/             # Workflow engine
│   ├── notifications/        # Sistema de notificações
│   └── integrations/         # Integrações (SAP, CRM, etc.)
└── styles/                   # CSS global

supabase/
├── migrations/               # Schema SQL versionado
├── seed/                     # Dados iniciais
└── rls/                      # Row Level Security

docs/
├── schema/                   # Database schema
├── workflows/                # Fluxos de cada módulo
├── dashboards/               # Arquitetura de dashboards
├── api/                      # Documentação de API
├── admin-guide/              # Guia de administração
└── ai-agents/                # Tarefas para agentes de IA
```

---

## 🛠️ Próximos Passos (Roadmap)

### Sprint 0 — Foundation
- [ ] Setup Base (Next.js, Supabase, Auth, Layout, Database)
- [ ] Design System (cores, tipografia, componentes)
- [ ] CI/CD com GitHub Actions

### Sprint 1 — Non Conformity (MVP)
- [ ] Registro NC (formulário completo)
- [ ] Detalhe NC (timeline, workflow)
- [ ] Dashboard NC (KPIs, charts)
- [ ] Ação Imediata e Corretiva
- [ ] Eficácia e Reabertura
- [ ] Admin de Módulos NC

### Sprint 2 — Hazard / HSE
- [ ] Registro Hazard (mobile first)
- [ ] Dashboard HSE
- [ ] Heatmap de risco

### Sprint 3 — Documents
- [ ] Gestão Documental ISO
- [ ] Controle de revisão e validade
- [ ] Alertas automáticos

### Sprint 4 — NPS
- [ ] Reclamações de Clientes
- [ ] SLA
- [ ] Dashboard NPS

### Sprint 5 — Audits
- [ ] Gestão de Auditorias
- [ ] Vinculação com NC

### Sprint 6 — Workflow Engine
- [ ] Motor de workflow centralizado
- [ ] Regras condicionais
- [ ] Escalonamento automático

### Sprint 7 — Dashboards Avançados
- [ ] Dashboard Executivo
- [ ] Dashboard Documental
- [ ] Dashboard Treinamentos

### Sprint 8 — Inteligência Artificial
- [ ] Sugestão automática de causa raiz
- [ ] Classificação automática
- [ ] OCR de imagens
- [ ] Insights preditivos

### Sprint 9 — Notificações
- [ ] Sistema de notificações (email + in-app)

### Sprint 10 — Integrações
- [ ] Scaffolds para SAP, CRM, Outlook, Teams

---

## 📄 Licença

MIT — Copyright (c) 2026 Gabriel Pantojinho

---

## 🤝 Contribuindo

Este é um projeto corporativo fechado. Contributions devem ser aprovadas por Gabriel (Pantojo).

---

## 📞 Contato

**Responsável Estratégico:** Time Robotics BR/AR
**Coordenador:** Gabriel Pantojinho

---

**Status:** 🚧 Em desenvolvimento (MVP Sprint 1)
