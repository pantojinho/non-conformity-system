# Pontos em Aberto — Validações Pendentes

> Lista consolidada de dúvidas e pontos em aberto para validar internamente antes/durante as sprints.
> Baseado na Documentação do Projeto v0.1 (28/05/2026) + materiais de apoio.

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

## 5. Arquitetura Oficial do Sistema

- [ ] A solução final será:
  - [ ] Power Apps + SharePoint/Dataverse + Power Automate + Power BI
  - [ ] Next.js + Supabase + Vercel + dashboards nativos
- [ ] Vai existir um **MVP em Microsoft 365** e depois migração?
- [ ] Ou o projeto já **nasce direto na arquitetura própria**?

**Impacto:** Stack inteira, cronograma, recursos, roadmap
**Sprint relacionada:** Sprint 0 (decisão fundamental)
**Status atual:** Direção estratégica aponta para Vercel + Supabase, mas precisa confirmação oficial

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

## Resumo de Impacto por Sprint

| Sprint | Pontos relacionados |
|--------|-------------------|
| Sprint 0 (Foundation) | #1 (itens norma), #4 (nomenclatura), #5 (arquitetura), #8 (escopo), #11 (status) |
| Sprint 1 (NC) | #2 (aprovadores), #3 (eficácia), #9 (resolvedor), #10 (SLA), #12 (risco) |
| Sprint 2 (Hazard) | #4 (nomenclatura), #10 (SLA), #11 (status) |
| Sprint 3 (Documental) | #10 (SLA), #11 (status) |
| Sprint 4 (NPS) | #7 (integrações), #10 (SLA) |
| Sprint 5 (Auditorias) | #11 (status) |
| Sprint 6 (Workflow) | #2 (aprovadores), #9 (resolvedor), #10 (SLA) |
| Sprint 7 (Dashboards) | #6 (estratégia dashboards), #12 (risco) |
| Sprint 10 (Integrações) | #7 (integrações) |

---

> **Recomendação:** Validar estes pontos em **workshop com Qualidade, HSE, responsáveis regionais e time de desenvolvimento** antes de iniciar o Sprint 1. Os pontos 5 (arquitetura) e 8 (escopo) são bloqueantes e devem ser decididos no Sprint 0.
