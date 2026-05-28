# Non-Conformity Management System

> Plataforma web corporativa para gestão integrada de **Não Conformidades**, **Hazard/SOT** e **Reclamações de Clientes (NPS)** — em conformidade com ISO 9001, 14001 e 45001.

## 🎯 Objetivo

Sistema modular, escalável e totalmente administrável internamente para:

- Gestão de não conformidades (ISO 9001 / 14001 / 45001)
- Registro de Hazard / SOT (Saúde, Segurança, Meio Ambiente, Security)
- Observações preventivas
- Reclamações de clientes / NPS
- Workflow de ações imediatas e corretivas com aprovação multinível
- Análise de eficácia automática
- Dashboards executivos e operacionais

**Escopo geográfico:** Brasil (Sorocaba + São Paulo) e Argentina

---

## 🏗️ Stack Tecnológica

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| **Frontend** | Next.js 14+ (App Router) | SSR, rotas dinâmicas, performance |
| **UI/Dashboards** | Tremor + Recharts | Dashboards profissionais sem Power BI |
| **Backend** | Vercel Serverless Functions | Deploy automático, escalabilidade |
| **Banco de Dados** | Supabase (PostgreSQL) | RLS, Auth, Realtime, Storage |
| **Autenticação** | Supabase Auth + RBAC | Email/senha, perfis granulares |
| **Armazenamento** | Supabase Storage | Anexos (fotos, vídeos, PDFs, PPT) |
| **Deploy** | Vercel | CI/CD, preview deployments |

### Por que NÃO Power BI?
- Custo por usuário (licença Pro)
- Integração complexa (iframe/SSO separado)
- Zero controle de UI
- Refresh limitado

**Tremor + Recharts** = dashboards nativos na app, mesmas permissões, tempo real via Supabase Realtime, custo zero adicional. Ver [docs/dashboards/architecture.md](docs/dashboards/architecture.md).

---

## 📋 Módulos

### Módulo 1 — Não Conformidade / Observação
- Fluxo completo: abertura → ação imediata → aprovação → ação corretiva → análise de causa → eficácia → fechamento
- Conformidade ISO 9001, 14001, 45001
- Geração automática de ID: `NC-000001`
- Dropdowns dinâmicos (norma → itens da norma)
- Timeline visual do status

### Módulo 2 — Hazard / SOT
- Categorias: Segurança, Saúde, Meio Ambiente, Security Patrimonial
- Fluxo simplificado e rápido (< 2 min para registrar)
- Mobile-first (chão de fábrica)
- Foto como evidência prioritária
- Geração automática de ID: `HZ-000001` / `SOT-000001`

### Módulo 3 — NPS / Reclamações de Clientes
- Intake de reclamações com categorias (Qualidade, Atendimento, Prazo, Instalação, Service)
- Geração automática de NC ou ação corretiva vinculada
- SLA com escalonamento automático
- Integrações futuras: SAP, CRM, Outlook, Teams
- Geração automática de ID: `NPS-000001`

---

## 🗂️ Estrutura do Projeto

```
src/
├── app/
│   ├── (auth)/               # Login, Signup
│   ├── (dashboard)/          # Dashboard principal
│   ├── (app)/
│   │   ├── nc/               # Não conformidades
│   │   ├── hazards/          # Hazard / SOT
│   │   ├── complaints/       # NPS / Reclamações
│   │   ├── pending/          # Minhas pendências
│   │   └── admin/            # Administração (listas, normas, usuários)
│   └── api/                  # Route handlers
├── components/
│   ├── ui/                   # Componentes base (Tremor)
│   ├── layout/               # Sidebar, Header, Home Buttons
│   ├── forms/                # Formulários reutilizáveis
│   ├── nc/                   # Componentes específicos NC
│   ├── hazards/              # Componentes específicos Hazard
│   ├── complaints/           # Componentes específicos NPS
│   ├── dashboard/            # Charts, KPI Cards
│   ├── timeline/             # Timeline visual de status
│   └── admin/                # Componentes de administração
├── lib/
│   ├── supabase/             # Client (browser) + Server (SSR)
│   ├── auth/                 # Middleware, permissões RBAC
│   ├── types/                # TypeScript types + enums
│   ├── utils/                # Helpers, gerador de ID
│   └── validators/           # Validação de formulários (Zod)
└── styles/                   # CSS global

supabase/
├── migrations/               # Schema SQL versionado
├── seed/                     # Dados iniciais (normas, processos)
└── rls/                      # Row Level Security policies

docs/
├── schema/                   # Database schema detalhado
├── workflows/                # Fluxos de cada módulo
├── dashboards/               # Arquitetura de dashboards
├── api/                      # Documentação de API
└── admin-guide/              # Guia de administração
```

---

## 🔄 Fluxo NC — Visão Geral

```
Abertura → Definição Resolvedor → Aceite → Ação Imediata (30d) → Aprovação
    → Análise Causa (5 Porquês / Ishikawa) → Ação Corretiva → Aprovação Final
    → Eficácia (90d/180d auto) → [Eficaz → Fecha | Não Eficaz → Reabre]
```

Detalhes completos: [docs/workflows/nc-flow.md](docs/workflows/nc-flow.md)

---

## 📊 Dashboards

### Dashboard Executivo
Total NCs/Hazards/NPS, tempo médio resolução, taxa eficácia, reincidência, aging

### Dashboard Qualidade
NC por norma/processo/unidade/país, tendência mensal, pareto

### Dashboard HSE
Hazard por categoria/local, risco alto, áreas críticas

### Dashboard NPS
Reclamações por cliente/projeto, SLA, motivos, tendência satisfação

Ver: [docs/dashboards/architecture.md](docs/dashboards/architecture.md)

---

## 👥 Perfis de Acesso

| Perfil | Capacidades |
|--------|-------------|
| **Usuário** | Abrir registros, consultar próprios, ver dashboards |
| **Resolvedor** | Receber tarefas, executar ações, anexar evidências |
| **Qualidade/HSE** | Aprovar, reabrir, definir responsáveis, analisar eficácia |
| **Administrador** | Gerenciar listas, usuários, permissões, configurações |

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

---

## 🗺️ Roadmap

### Fase 1 — MVP (2-4 semanas)
- [ ] Setup Next.js + Supabase + Auth
- [ ] Abertura de NC com fluxo básico
- [ ] Abertura de Hazard
- [ ] Aprovação de ação imediata
- [ ] Dashboard inicial com KPIs
- [ ] Deploy na Vercel

### Fase 2 — Gestão Completa
- [ ] Fluxo de ação corretiva completo
- [ ] Análise de eficácia automática
- [ ] Dashboards avançados (Qualidade, HSE)
- [ ] SLA + Escalonamento
- [ ] Administração de listas

### Fase 3 — NPS / Reclamações
- [ ] Módulo de reclamações de clientes
- [ ] Dashboard NPS
- [ ] Geração automática de NC a partir de reclamação
- [ ] SLA por cliente

### Fase 4 — Inteligência
- [ ] Sugestão automática de causa raiz (IA)
- [ ] Classificação automática por IA
- [ ] OCR de imagens
- [ ] Insights preditivos
- [ ] Integrações (SAP, CRM, Teams)

---

## 📄 Licença

MIT — Copyright (c) 2026 Gabriel Pantojinho
