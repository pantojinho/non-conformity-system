# Pontos em Aberto — Validações Pendentes

> Lista consolidada de dúvidas e pontos em aberto para validar internamente antes/durante as sprints.
> Baseado na Documentação do Projeto v0.1 (28/05/2026) + materiais de apoio.
> Última atualização: 28/05/2026

---

## 1. Itens das Normas ISO

- [ ] Qual será a lista **final de itens** da ISO 9001, ISO 14001 e ISO 45001 dentro do sistema?
- [ ] Essa lista será **igual para Brasil e Argentina** ou terá diferenças locais?
- [ ] Quem será o **responsável por manter** essa base atualizada?
- [ ] Quando houver revisão de norma, qual será o **processo de atualização** no sistema?

**Impacto:** Dropdown dinâmico no formulário NC, admin de normas, seeds do banco
**Sprint relacionada:** Sprint 0 (seeds), Sprint 1 (formulário NC)

---

## 2. Matriz de Aprovadores

- [ ] Quem aprova cada etapa do fluxo?
  - [ ] Ação imediata
  - [ ] Ação corretiva
  - [ ] Eficácia
  - [ ] Reabertura
- [ ] A aprovação será por **cargo/papel** ou por **nome de pessoa**?
- [ ] Haverá **aprovador reserva** por ausência/férias?

**Impacto:** Workflow engine, RBAC, transições de status, notificações
**Sprint relacionada:** Sprint 0 (RBAC), Sprint 1 (workflow NC)
**Recomendação:** Usar papéis funcionais (não nomes) para escalabilidade

---

## 3. Prazo e Regra de Eficácia

- [ ] O prazo será sempre **90 dias** ou pode ser **180 dias** em alguns casos?
- [ ] O prazo muda conforme **tipo de NC**, **risco** ou **norma**?
- [ ] Quem faz a **avaliação de eficácia**?
- [ ] O que exatamente caracteriza **"eficaz"** e **"não eficaz"**?

**Impacto:** Agendamento automático, workflow de reabertura, relatórios
**Sprint relacionada:** Sprint 1 (eficácia)

---

## 4. Nomenclatura Oficial dos Registros

- [ ] Qual será a nomenclatura final entre:
  - Hazard
  - SOT
  - SOFIA
  - Observação preventiva
- [ ] São tipos **diferentes** entre si ou **mesmo tipo com categorias diferentes**?
- [ ] Quais **prefixos oficiais** serão usados nos códigos?

**Impacto:** IDs automáticos (HZ-, SOT-, SOF-, etc.), labels na interface, filtros, dashboards
**Sprint relacionada:** Sprint 0 (enums), Sprint 2 (módulo Hazard)

---

## 5. Arquitetura Oficial do Sistema ✅ DECIDIDO

- [x] **Decisão:** Next.js + Supabase + Vercel + dashboards nativos (Option B)
- [x] Power Apps pode ser usado como stopgap/MVP temporário se necessário, mas a base definitiva é a plataforma própria
- [x] Stack confirmada:
  - Frontend: Next.js 15 + Tailwind + shadcn/ui
  - Backend: Supabase (PostgreSQL) + Prisma
  - Deploy: Vercel
  - Dashboards: Tremor + Recharts (sem Power BI)
  - Auth: Supabase Auth + RBAC

**Decisão tomada em:** 28/05/2026
**Decidido por:** Gabriel Ciandrini

---

## 6. Estratégia de Dashboards

- [ ] Dashboards em **Power BI** ou **nativos da plataforma** (Tremor + Recharts)?
- [ ] Quais indicadores são **obrigatórios já na Fase 1**?
- [ ] Quais **filtros** serão necessários: país, área, processo, norma, risco, status, período?
- [ ] Haverá **exportação** para Excel/PDF?

**Impacto:** Componentes de dashboard, queries, performance
**Sprint relacionada:** Sprint 1 (dashboards NC), Sprint 7 (avançados)
**Recomendação atual:** Dashboards nativos (sem Power BI) — custo zero, integração nativa

---

## 7. Integrações Futuras

- [ ] Quais integrações são **realmente prioritárias**?
  - [ ] SAP
  - [ ] CRM
  - [ ] Outlook
  - [ ] Teams
  - [ ] SharePoint
- [ ] Integrações serão só **consulta** ou também **gravação de dados**?
- [ ] Em qual **fase** cada integração entra?

**Impacto:** Arquitetura de integração, webhooks, OAuth, APIs
**Sprint relacionada:** Sprint 10 (integrações)

---

## 8. Escopo Final do Projeto

- [ ] O sistema final cobre somente:
  - [ ] NC
  - [ ] Hazard/SOT
  - [ ] Documental ISO
  - [ ] NPS/Reclamações
  - [ ] Auditorias
- [ ] Ou ainda haverá alguma parte de:
  - [ ] Treinamentos
  - [ ] EPI
  - [ ] Acessos
  - [ ] Saída de materiais
- [ ] Esses módulos estão **fora definitivamente** ou apenas **adiados**?

**Impacto:** Escopo do roadmap, estrutura de pastas, banco
**Status atual:** Treinamentos, EPI, Acessos e Saída de Materiais estão FORA do escopo (sistemas próprios existem)

---

## 9. Regra de Atribuição do Resolvedor

- [ ] O resolvedor será definido **manualmente** ou **automaticamente**?
- [ ] Se o responsável não for conhecido na abertura, **quem decide**?
- [ ] Pode haver **troca de resolvedor** no meio do fluxo?
- [ ] Quem pode **reatribuir**?

**Impacto:** Workflow de definição de resolvedor, notificações, transições
**Sprint relacionada:** Sprint 1 (fluxo NC)
**Contexto atual:** BR → gestor BR, AR → gestor AR (quando resolvedor não é conhecido)

---

## 10. SLA por Tipo de Caso

- [ ] Qual será o **SLA de cada tipo** de registro?
- [ ] O SLA muda por **risco** (baixo, médio, alto)?
- [ ] O SLA muda por **módulo** (NC, Hazard, NPS, Documental)?
- [ ] Qual será a **regra de escalonamento**?
  - [ ] Quem recebe o alerta?
  - [ ] Quantos níveis de escalonamento?
  - [ ] Prazo para cada nível?

**Impacto:** Motor de SLA, notificações, dashboards, status "Atrasado"
**Sprint relacionada:** Sprint 1 (SLA NC), Sprint 6 (workflow engine)

---

## 11. Status Oficiais da Timeline

- [ ] Qual será a **lista final de status** do processo?
- [ ] Opções consolidadas até agora:
  - [ ] Aberto
  - [ ] Responsável definido
  - [ ] Em aceite
  - [ ] Em ação imediata
  - [ ] Em aprovação (ação imediata)
  - [ ] Em análise de causa
  - [ ] Em ação corretiva
  - [ ] Em aprovação final
  - [ ] Em eficácia
  - [ ] Fechado
  - [ ] Reaberto
  - [ ] Atrasado / SLA vencido
- [ ] Haverá status **diferentes por módulo**?

**Impacto:** Enum de status, timeline visual, filtros, transições do workflow
**Sprint relacionada:** Sprint 0 (enums), Sprint 1 (timeline NC)

---

## 12. Classificação de Risco

- [ ] O sistema vai usar só **baixo, médio e alto**?
- [ ] Haverá também conceito de **urgência** separado de risco?
- [ ] O risco impacta **prazo**, **prioridade** e **escalonamento**?
- [ ] Quem define o risco: **originador**, **resolvedor** ou **Qualidade/HSE**?

**Impacto:** Formulários, filtros, dashboards, regras de SLA/escalonamento
**Sprint relacionada:** Sprint 1 (formulário NC)

---

## 13. Campos Obrigatórios por Tipo de Registro

- [ ] Quais campos serão **obrigatórios para NC**?
- [ ] Quais serão **obrigatórios para Hazard**?
- [ ] Quais serão **obrigatórios para Reclamações/NPS**?
- [ ] Haverá **campos dinâmicos por norma e por país**?

**Impacto:** Validação de formulários (Zod), UX, experiência do usuário
**Sprint relacionada:** Sprint 1 (NC), Sprint 2 (Hazard), Sprint 4 (NPS)

---

## 14. Listas Parametrizáveis (Admin)

- [ ] Quais listas poderão ser **administradas sem desenvolvedor**?
  - [ ] Processos
  - [ ] Normas
  - [ ] Itens de norma
  - [ ] Categorias
  - [ ] Status
  - [ ] Business
  - [ ] Locais
  - [ ] Tipos de detecção
  - [ ] Responsáveis
- [ ] Quem terá **permissão para administrar** essas listas?

**Impacto:** Interface de admin, CRUD paramétrico, independência do dev
**Sprint relacionada:** Sprint 0 (tabelas paramétricas), Sprint 1 (admin NC)
**Princípio:** Todas as listas devem ser administráveis internamente

---

## 15. Evidências e Anexos

- [ ] Quais **tipos de arquivo** serão aceitos oficialmente?
  - [ ] Foto
  - [ ] Vídeo
  - [ ] PDF
  - [ ] Áudio
  - [ ] Excel
  - [ ] PPT
  - [ ] Print
- [ ] Haverá **limite de tamanho**?
- [ ] Haverá **obrigatoriedade de anexar evidência** em alguns tipos de caso?

**Impacto:** Supabase Storage config, validação de upload, UX mobile
**Sprint relacionada:** Sprint 0 (storage), Sprint 1 (upload NC), Sprint 2 (foto Hazard)

---

## 16. Base de Hazard

- [ ] A base de hazards será **criada localmente** desde o início?
- [ ] Ela **substituirá alguma base global**?
- [ ] Quem **cadastra e mantém** categorias e tipos de hazard?

**Impacto:** Módulo Hazard, migração de dados, admin
**Sprint relacionada:** Sprint 2 (Hazard)

---

## 17. Regras de Reclamações / NPS

- [ ] Toda reclamação de cliente vai **gerar NC automaticamente**?
- [ ] Ou somente **alguns tipos**?
- [ ] Quais **categorias de reclamação** entram no sistema?
- [ ] Quem será o **responsável por aprovar e tratar** essas ocorrências?

**Impacto:** Workflow NPS → NC, geração automática, SLA
**Sprint relacionada:** Sprint 4 (NPS)

---

## 18. Países, Unidades e Idioma

- [ ] Quais **unidades entram na primeira fase**?
- [ ] Apenas Brasil e Argentina ou **mais locais no futuro**?
- [ ] O sistema será **bilíngue** (pt-BR + es-AR) desde o início?
- [ ] Os **fluxos serão iguais** nos dois países?

**Impacto:** i18n, multi-tenant, formulários por país, seeds
**Sprint relacionada:** Sprint 0 (i18n setup), Sprint 1 (formulários)
**Recomendação:** Começar pt-BR, preparar estrutura para es-AR

---

## 19. Perfis e Permissões (Detalhado)

- [ ] Quais **perfis finais** existirão oficialmente?
  - [ ] Usuário
  - [ ] Resolvedor
  - [ ] Qualidade/HSE
  - [ ] Admin
  - [ ] Auditor
  - [ ] Diretor
  - [ ] Gestor/Aprovador
- [ ] Quem pode **ver tudo** e quem vê **só seus próprios casos**?
- [ ] Quem pode **reabrir**?
- [ ] Quem pode **excluir** ou **editar** registro já aberto?

**Impacto:** RBAC completo, RLS policies, interface condicional
**Sprint relacionada:** Sprint 0 (RBAC), Sprint 1 (NC)

---

## 20. Numeração dos Registros

- [ ] Os códigos serão:
  - [ ] `NC-000001`
  - [ ] `HZ-000001`
  - [ ] `SOT-000001`
  - [ ] `NPS-000001`
- [ ] A sequência será **única global** ou **separada por país/unidade**?
- [ ] Haverá **reinício anual** ou **sequência contínua**?

**Impacto:** Gerador de IDs, sequences no banco, labels
**Sprint relacionada:** Sprint 0 (ID generator), Sprint 1 (NC)
**Opção enterprise:** `NC-BR-2026-000001` (tipo-país-ano-seq)

---

## 21. Critérios de Fechamento

- [ ] O que exatamente **permite fechar** uma NC?
- [ ] Precisa:
  - [ ] Ação imediata concluída
  - [ ] Ação corretiva aprovada
  - [ ] Eficácia positiva
- [ ] Quem tem **autoridade final** para fechar o caso?

**Impacto:** Regras de transição de status, validação antes de fechar
**Sprint relacionada:** Sprint 1 (workflow NC)

---

## 22. Auditoria e Rastreabilidade

- [ ] Quais **eventos precisam ficar gravados** em log?
- [ ] Apenas **mudança de status** ou também **alteração de campo**?
- [ ] Será possível rastrear:
  - [ ] Quem alterou
  - [ ] Quando alterou
  - [ ] O que alterou
  - [ ] Valor anterior e novo
- [ ] Isso valerá para **todos os módulos**?

**Impacto:** Tabela activity_logs, triggers, UI de histórico
**Sprint relacionada:** Sprint 0 (activity_logs), Sprint 1 (histórico NC)
**Recomendação:** Log de tudo — status + campos + anexos + comentários

---

## 🔴 Os 7 Pontos Criticos — Decisões que Precisam Ser Tomadas

**Status (28/05/2026):**
- ✅ **5 — Arquitetura** — Definida: Next.js + Supabase + Vercel (Option B)
- ⚠️ **6 — Integrações** — A definir (impacto Sprint 10)
- ❓ **1-4, 7, 8-22** — Pendentes (resolver durante Sprint 1)

---

## Resumo de Impacto por Sprint

| Sprint | Pontos relacionados |
|--------|-------------------|
| Sprint 0 (Foundation) | #1, #4, #8, #11, #13, #14, #18, #19, #20, #22 |
| Sprint 1 (NC) | #2, #3, #9, #10, #12, #13, #15, #19, #21, #22 |
| Sprint 2 (Hazard) | #4, #10, #11, #13, #15, #16 |
| Sprint 3 (Documental) | #10, #11, #13, #15 |
| Sprint 4 (NPS) | #6, #10, #13, #17 |
| Sprint 5 (Auditorias) | #11, #13, #15 |
| Sprint 6 (Workflow) | #2, #3, #9, #10, #21 |
| Sprint 7 (Dashboards) | #7, #12 |
| Sprint 9 (Notificações) | #10, #15 |

---

> **Recomendação:** Validar estes pontos em **workshop com Qualidade, HSE, responsáveis regionais e time de desenvolvimento**.
> **Bloqueantes definidos:** ✅ #5 (Arquitetura), ✅ #8 (Escopo)
> **A resolver durante Sprint 1:** #1, #2, #3, #4, #7 (e os demais nas sprints subsequentes)
