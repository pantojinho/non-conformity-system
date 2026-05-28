# Decisões e Validações Pendentes — Robotics Hub

> Lista consolidada de decisões tomadas e pontos a validar com o time.
> Baseado na Documentação do Projeto v0.1 (28/05/2026) + materiais de apoio.
> Última atualização: 28/05/2026

---

## ✅ Já Decidido

| # | Ponto | Decisão |
|---|-------|---------|
| 5 | Arquitetura | **Next.js 15 + Supabase + Vercel** (Option B) |
| 8 | Escopo inicial | **5 módulos** (NC, Hazard, Documental, NPS, Auditorias) |
| — | Dashboards | **Recharts** nativo (sem Power BI, sem Tremor) |
| — | Admin | Todas as listas administráveis via UI (zero dependência do dev) |
| — | Power Apps | Pode ser usado como stopgap/MVP temporário, mas a base definitiva é a plataforma própria |
| — | Fora do escopo | Treinamentos, EPI, Acessos, Saída de Materiais (sistemas próprios existem) |
| — | Perfis | Usar papéis funcionais (não nomes) para escalabilidade |

**Decisões tomadas por:** Gabriel Ciandrini — 28/05/2026

---

## 🔴 Urgentes (antes de começar a desenvolver)

### 1. Itens das Normas ISO ❓

**Pergunta:** Qual a lista oficial de sub-itens de cada norma que vai no dropdown do sistema?

| Norma | Itens (listar abaixo) |
|-------|----------------------|
| ISO 9001 | 1. ___ 2. ___ 3. ___ 4. ___ 5. ___ |
| ISO 14001 | 1. ___ 2. ___ 3. ___ 4. ___ 5. ___ |
| ISO 45001 | 1. ___ 2. ___ 3. ___ 4. ___ 5. ___ |

- [ ] Essa lista é igual pra BR e AR? ___
- [ ] Quem mantém atualizado? ___
- [ ] Atualização anual ou sob demanda? ___
- [ ] Quando houver revisão de norma, qual o processo de atualização no sistema? ___

**Impacto:** Dropdown dinâmico no formulário NC, admin de normas, seeds do banco

---

### 2. Matriz de Aprovadores ❓

**Pergunta:** Quem aprova cada etapa? (responder com cargo/papel, não nome)

| Etapa | Quem aprova (papel) | Reserva (ausência) |
|-------|--------------------|--------------------|
| Ação imediata | ___ | ___ |
| Ação corretiva | ___ | ___ |
| Eficácia | ___ | ___ |
| Reabertura | ___ | ___ |

- [ ] Aprovação por papel (recomendado) ou por nome? ___
- [ ] Tem aprovador reserva pra férias/ausência? ___

**Impacto:** Workflow engine, RBAC, transições de status, notificações

---

### 3. Prazo de Eficácia ❓

**Pergunta:** Quando usar 90 dias vs 180 dias?

- [ ] Sempre 90 dias? ___
- [ ] Depende do quê? ___ (risco / tipo NC / norma / outro)
- [ ] Quem avalia se foi eficaz? ___
- [ ] O que conta como "eficaz"? ___

**Impacto:** Agendamento automático, workflow de reabertura, relatórios

---

### 4. Nomenclatura Hazard / SOT ❓

**Pergunta:** O nome oficial do módulo é:

- [ ] Hazard
- [ ] SOT
- [ ] SOFIA
- [ ] Observação preventiva
- [ ] Outro: ___

**E o prefixo do ID vai ser:**

- [ ] `HZ-000001`
- [ ] `SOT-000001`
- [ ] `SOF-000001`
- [ ] Outro: ___

- [ ] São tipos diferentes entre si ou categorias do mesmo módulo? ___

**Impacto:** IDs automáticos, labels na interface, filtros, dashboards

---

### 5. Escopo Final ❓ (parcialmente decidido ✅)

**Já definido, só confirmar:**

- [x] NC (core)
- [x] Hazard / SOT
- [x] Gestão Documental ISO
- [x] NPS / Reclamações
- [x] Auditorias

**A confirmar:**

- [ ] Algo mais entra na Fase 1? ___
- [ ] Treinamentos/EPI/Acessos/Saída — definitivamente fora ou adiado? ___

**Impacto:** Escopo do roadmap, estrutura de pastas, banco

---

### 6. Status Oficiais da Timeline ❓

- [ ] Qual será a lista final de status do processo?
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
- [ ] Haverá status diferentes por módulo? ___

**Impacto:** Enum de status, timeline visual, filtros, transições do workflow

---

### 7. Regra de Atribuição do Resolvedor ❓

- [ ] O resolvedor será definido manualmente ou automaticamente? ___
- [ ] Se o responsável não for conhecido na abertura, quem decide? ___
- [ ] Pode haver troca de resolvedor no meio do fluxo? ___
- [ ] Quem pode reatribuir? ___

**Contexto atual:** BR → gestor BR, AR → gestor AR (quando resolvedor não é conhecido)
**Impacto:** Workflow de definição de resolvedor, notificações, transições

---

### 8. Campos Obrigatórios por Tipo de Registro ❓

- [ ] Quais campos serão obrigatórios para NC? ___
- [ ] Quais serão obrigatórios para Hazard? ___
- [ ] Quais serão obrigatórios para Reclamações/NPS? ___
- [ ] Haverá campos dinâmicos por norma e por país? ___

**Impacto:** Validação de formulários (Zod), UX

---

### 9. Listas Parametrizáveis (Admin) ❓

- [ ] Quais listas poderão ser administradas sem desenvolvedor?
  - [ ] Processos
  - [ ] Normas
  - [ ] Itens de norma
  - [ ] Categorias
  - [ ] Status
  - [ ] Business
  - [ ] Locais
  - [ ] Tipos de detecção
  - [ ] Responsáveis
- [ ] Quem terá permissão para administrar essas listas? ___

**Princípio:** Todas as listas devem ser administráveis internamente
**Impacto:** Interface de admin, CRUD paramétrico

---

## 🟡 Importantes (definir durante o Sprint 1)

### 10. Classificação de Risco ❓

- [ ] Só baixo/médio/alto? ___
- [ ] Tem urgência separada de risco? ___
- [ ] Risco alto → prazo menor? ___
- [ ] Quem define o risco: originador ou Qualidade? ___
- [ ] O risco impacta prazo, prioridade e escalonamento? ___

**Impacto:** Formulários, filtros, dashboards, regras de SLA/escalonamento

---

### 11. SLA por Tipo ❓

| Tipo de registro | SLA (dias) |
|-----------------|-----------|
| NC baixo risco | ___ |
| NC médio risco | ___ |
| NC alto risco | ___ |
| Hazard | ___ |
| NPS/Reclamação | ___ |
| Documental | ___ |

- [ ] O SLA muda por risco (baixo, médio, alto)? ___
- [ ] O SLA muda por módulo (NC, Hazard, NPS, Documental)? ___
- [ ] Como funciona o escalonamento? ___
- [ ] Quantos níveis? ___
- [ ] Quem recebe o alerta? ___
- [ ] Prazo para cada nível? ___

**Impacto:** Motor de SLA, notificações, dashboards, status "Atrasado"

---

### 12. Numeração dos Registros ❓

- [ ] Sequência única global? ___
- [ ] Ou separada por país? (ex: `NC-BR-000001` vs `NC-000001`) ___
- [ ] Reinício anual? ___
- [ ] Ou sequência contínua? ___
- [ ] Opção enterprise: `NC-BR-2026-000001` (tipo-país-ano-seq)

**Impacto:** Gerador de IDs, sequences no banco, labels

---

### 13. Evidências e Anexos ❓

- [ ] Tipos aceitos: foto, vídeo, PDF, áudio, Excel, PPT, print? ___
- [ ] Limite de tamanho: ___ MB
- [ ] Evidência obrigatória pra alguns casos? Quais? ___

**Impacto:** Supabase Storage config, validação de upload, UX mobile

---

### 14. Reclamações / NPS ❓

- [ ] Toda reclamação gera NC automática? ___
- [ ] Ou só alguns tipos? Quais? ___
- [ ] Categorias de reclamação: ___
- [ ] Quem aprova/trata: ___

**Impacto:** Workflow NPS → NC, geração automática, SLA

---

### 15. Perfis e Permissões (detalhes) ❓

- [ ] Quais perfis finais existirão oficialmente?
  - [ ] Usuário
  - [ ] Resolvedor
  - [ ] Qualidade/HSE
  - [ ] Admin
  - [ ] Auditor
  - [ ] Diretor
  - [ ] Gestor/Aprovador

| Ação | Quem pode |
|------|----------|
| Ver todos os casos | ___ |
| Ver só os próprios | ___ |
| Reabrir caso | ___ |
| Excluir registro | ___ |
| Editar registro aberto | ___ |

**Impacto:** RBAC completo, RLS policies, interface condicional

---

### 16. Base de Hazard ❓

- [ ] A base de hazards será criada localmente desde o início? ___
- [ ] Ela substituirá alguma base global? ___
- [ ] Quem cadastra e mantém categorias e tipos de hazard? ___

**Impacto:** Módulo Hazard, migração de dados, admin

---

### 17. Critérios de Fechamento ❓

- [ ] Pra fechar uma NC precisa:
  - [ ] Ação imediata concluída
  - [ ] Ação corretiva aprovada
  - [ ] Eficácia positiva
  - [ ] Outro: ___
- [ ] Quem tem autoridade final pra fechar? ___

**Impacto:** Regras de transição de status, validação antes de fechar

---

### 18. Auditoria e Rastreabilidade ❓

- [ ] Log de tudo (status + campos + anexos)? ___
- [ ] Ou só mudança de status? ___
- [ ] Será possível rastrear: quem alterou, quando, o quê, valor anterior e novo?
- [ ] Val pra todos os módulos? ___

**Recomendação:** Log de tudo — status + campos + anexos + comentários
**Impacto:** Tabela activity_logs, triggers, UI de histórico

---

## 🟢 Pra depois (Sprint 6+)

### 19. Integrações Prioritárias ❓

- [ ] Qual integração vem primeiro? ___
- [ ] SAP? CRM? Outlook? Teams? SharePoint? ___
- [ ] Leitura ou gravação? ___
- [ ] Em qual fase cada integração entra? ___

**Impacto:** Arquitetura de integração, webhooks, OAuth, APIs

---

### 20. Países, Unidades e Idioma ❓

- [ ] Quais unidades entram na primeira fase? ___
- [ ] Apenas Brasil e Argentina ou mais locais no futuro? ___
- [ ] pt-BR no início, es-AR depois? ___
- [ ] Ou bilíngue desde o MVP? ___
- [ ] Os fluxos serão iguais nos dois países? ___

**Recomendação:** Começar pt-BR, preparar estrutura para es-AR
**Impacto:** i18n, multi-tenant, formulários por país, seeds

---

### 21. Dashboards — Indicadores e Filtros ❓

- [ ] Quais indicadores são obrigatórios já na Fase 1? ___
- [ ] Quais filtros serão necessários: país, área, processo, norma, risco, status, período? ___
- [ ] Haverá exportação para Excel/PDF? ___

**Decidido:** Dashboards nativos com Recharts (sem Power BI) — custo zero, integração nativa
**Impacto:** Componentes de dashboard, queries, performance

---

## Resumo de Impacto por Sprint

| Sprint | Pontos relacionados |
|--------|-------------------|
| Sprint 0 (Foundation) | #1, #4, #5, #6, #8, #9, #15 |
| Sprint 1 (NC) | #2, #3, #7, #10, #11, #12, #13, #15, #17, #18 |
| Sprint 2 (Hazard) | #4, #11, #13, #16 |
| Sprint 3 (Documental) | #11, #13 |
| Sprint 4 (NPS) | #11, #13, #14 |
| Sprint 5 (Auditorias) | #13, #18 |
| Sprint 6 (Workflow) | #2, #3, #7, #11, #17 |
| Sprint 7 (Dashboards) | #21 |

---

> **Recomendação:** Validar estes pontos em **workshop com Qualidade, HSE, responsáveis regionais e time de desenvolvimento**.
> **Bloqueantes definidos:** ✅ Arquitetura, ✅ Escopo, ✅ Dashboards, ✅ Admin
> **A resolver durante Sprint 1:** #1–4, #6–9, #10–18
