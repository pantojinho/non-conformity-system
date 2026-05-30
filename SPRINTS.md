# Sprints - Robotics Portal (Non-Conformity System)

## 📋 Resumo de Progresso

**Sprint 0:** ✅ Concluída (29/05/2026)
- Autenticação Supabase (sem OAuth/signup)
- Roles de usuário (admin, gestor, técnico, viewer)
- 17 componentes UI
- i18n PT/EN/ES
- Dark/Light theme

**Sprint 1:** 🔄 Em andamento (30/05/2026)
- Core de NC (Non-Conformity)
- NPS (Net Promoter Score) - **PARCIALMENTE FUNCIONAL**
- Dashboard

---

## 🎯 Sprint 1 - NC & NPS Core

### Status: 70% Concluído

#### ✅ Funcionalidades Implementadas

##### 1. NPS (Reclamações & Feedback)
- [x] API `/api/nps` - CRUD completo
- [x] API `/api/nps/[id]` - Detalhes + update + delete
- [x] API `/api/nps/[id]/comments` - Comentários
- [x] API `/api/nps/[id]/attachments` - Anexos
- [x] API `/api/nps/[id]/actions` - Ações corretivas
- [x] API `/api/nps/[id]/activity` - Timeline de atividades
- [x] Página `/complaints` - Lista de reclamações
- [x] Página `/complaints/[id]` - Detalhes da reclamação
- [x] Card com: cliente, descrição, status, canal, NPS score
- [x] Dropdown de status (aberto, em_analise, em_andamento, resolvido, fechado)
- [x] Botão de excluir registro
- [x] Busca e filtros (por status, categoria)
- [x] KPI cards: NPS score, total, SLA, resolvidas

##### 2. Schema do Banco
- [x] `nps_records` - Tabela principal
- [x] `nps_comments` - Comentários
- [x] `nps_attachments` - Anexos
- [x] `nps_activity_log` - Log de atividades
- [x] `nps_corrective_actions` - Ações corretivas
- [x] Campos: cliente, descricao, categoria, canal, prioridade, severidade, nota_nps
- [x] Campos SLA: sla_prazo_dias, sla_data_limite, days_remaining

##### 3. UI/UX
- [x] Cards responsivos (mobile/desktop)
- [x] NPS score visual (10 dots com cores)
- [x] Indicadores de canal com emojis (📧, 📞, 📊, 🌐, 💬)
- [x] Badges de status e prioridade
- [x] Timeline de atividades
- [x] Formulário de comentários
- [x] Loading states
- [x] Error handling

#### ⚠️ Issues Conhecidos

1. **Upload de anexos** - Erro 500
   - Causa: Bucket `nps-attachments` não existe no Supabase Storage
   - Solução: Criar bucket no Supabase Dashboard > Storage
   - Comando SQL:
     ```sql
     insert into storage.buckets (id, name, public)
     values ('nps-attachments', 'nps-attachments', true);
     ```

2. **Dados de teste vazios**
   - Solução: Executar script `scripts/populate-nps-test-data.sql`
   - Local: `/home/pantojinho/temp/non-conformity-system/scripts/populate-nps-test-data.sql`
   - Resultado: 5 registros de teste com clientes reais (VW, Fiat, GM, Toyota, Mercedes)

#### 🔄 Funcionalidades Pendentes

##### NC Core (Não iniciado)
- [ ] API `/api/nc` - CRUD de não conformidades
- [ ] Página `/nc` - Lista de NCs
- [ ] Página `/nc/[id]` - Detalhes da NC
- [ ] Página `/nc/new` - Criar nova NC
- [ ] Workflow: análise → ação corretiva → validação → fechamento
- [ ] Vinculação NPS ↔ NC
- [ ] Análise de causa raiz (5 Whys, Ishikawa)

##### Dashboard (Parcial)
- [ ] Gráficos de tendências (line/bar charts)
- [ ] Heatmap de NCs por departamento
- [ ] Distribuição de NPS por canal
- [ ] Alertas SLA overdue
- [ ] Top clientes com mais reclamações

---

## 📊 Sprint 2 - Planejado

### Data estimada: 10/06/2026

#### Funcionalidades planejadas:
1. Completar NC Core
2. Refinar dashboard com gráficos
3. Exportação de relatórios (PDF, Excel)
4. Notificações por email

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
│               ├── attachments/ # Anexos (✅)
│               ├── actions/     # Ações corretivas (✅)
│               └── activity/    # Timeline (✅)

scripts/
└── populate-nps-test-data.sql   # Dados de teste (✅)
```

---

## 🔗 Links Importantes

- **Produção:** https://roboticsportal.com.br
- **Repositório:** https://github.com/pantojinho/non-conformity-system
- **Supabase:** db.nqrqsrdugsuvrdqaiail.supabase.co
- **Debug Schema:** https://roboticsportal.com.br/api/debug-nps-schema

---

## 📝 Notas de Desenvolvimento

### 30/05/2026 - Sessão de testes NPS
- ✅ Corrigiu mapeamento de campos (cliente/description/canal/nota_nps)
- ✅ Adicionou botão de delete
- ✅ Corrigiu dropdown de status (aberto/resolvido vs aberta/resolvida)
- ⚠️ Upload de anexos precisa de bucket Storage
- 📝 Criou script de dados de teste

### Próximos passos:
1. Criar bucket `nps-attachments` no Supabase Storage
2. Executar script de dados de teste
3. Testar completo: listar, criar, editar, excluir, comentários, anexos
4. Iniciar desenvolvimento NC Core