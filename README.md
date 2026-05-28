# Non-Conformity Management System

> Sistema web corporativo para gerenciamento de Não Conformidades (NC), Hazards e Reclamações de Clientes.

## 🎯 Objetivo

Plataforma estratégica para otimizar o ecossistema de auditoria interna e externa, gerenciando o histórico de NCs e implementando um fluxo estruturado para ações corretivas.

## 🏗️ Stack

- **Frontend:** Next.js (App Router)
- **Backend:** Vercel Serverless Functions
- **Banco de Dados:** Supabase (PostgreSQL + Auth + RLS + Storage + Realtime)
- **Deploy:** Vercel

## 📋 Módulos

| Módulo | Descrição |
|--------|-----------|
| **Não Conformidades** | Registro, classificação, histórico, fluxo de ações corretivas |
| **Hazards** | Cadastro de perigos, avaliação de risco |
| **Reclamações de Clientes** | Intake, triagem, vinculação com NC |

## 📁 Estrutura do Projeto

```
non-conformity-system/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Componentes React
│   ├── lib/              # Utilitários, configs, tipos
│   └── styles/           # Estilos globais
├── public/               # Assets estáticos
├── supabase/             # Migrations, seeds, RLS
├── docs/                 # Documentação do projeto
├── .env.example          # Variáveis de ambiente (template)
├── .gitignore
├── LICENSE
└── README.md
```

## 📄 Licença

MIT

---

> **Status:** 🏗️ Em planejamento — aguardando definições de escopo detalhadas.
