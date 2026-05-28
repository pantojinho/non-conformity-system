# Checklist — Validações com Aldo e Time de Qualidade

> Lista prática para levar na reunião. Preencher as respostas junto com o time.
> Data: ___/___/______
> Participantes: ___________________________

---

## 🔴 Urgentes (antes de começar a desenvolver)

### 1. Itens das Normas ISO

**Pergunta:** Qual a lista oficial de sub-itens de cada norma que vai no dropdown do sistema?

| Norma | Itens (listar abaixo) |
|-------|----------------------|
| ISO 9001 | 1. ___ 2. ___ 3. ___ 4. ___ 5. ___ |
| ISO 14001 | 1. ___ 2. ___ 3. ___ 4. ___ 5. ___ |
| ISO 45001 | 1. ___ 2. ___ 3. ___ 4. ___ 5. ___ |

- [ ] Essa lista é igual pra BR e AR? ___
- [ ] Quem mantém atualizado? ___
- [ ] Atualização anual ou sob demanda? ___

---

### 2. Matriz de Aprovadores

**Pergunta:** Quem aprova cada etapa? (responder com cargo/papel, não nome)

| Etapa | Quem aprova (papel) | Reserva (ausência) |
|-------|--------------------|--------------------|
| Ação imediata | ___ | ___ |
| Ação corretiva | ___ | ___ |
| Eficácia | ___ | ___ |
| Reabertura | ___ | ___ |

- [ ] Aprovação por papel (recomendado) ou por nome? ___
- [ ] Tem aprovador reserva pra férias/ausência? ___

---

### 3. Prazo de Eficácia

**Pergunta:** Quando usar 90 dias vs 180 dias?

- [ ] Sempre 90 dias? ___
- [ ] Depende do quê? ___ (risco / tipo NC / norma / outro)
- [ ] Quem avalia se foi eficaz? ___
- [ ] O que conta como "eficaz"? ___

---

### 4. Nomenclatura Hazard / SOT

**Pergunta:** O nome oficial do módulo é:

- [ ] Hazard
- [ ] SOT
- [ ] SOFIA
- [ ] Outro: ___

**E o prefixo do ID vai ser:**
- [ ] `HZ-000001`
- [ ] `SOT-000001`
- [ ] `SOF-000001`
- [ ] Outro: ___

- [ ] São tipos diferentes ou categorias do mesmo módulo? ___

---

### 5. Escopo Final

**Já definido, só confirmar:**

- [x] NC (core)
- [x] Hazard / SOT
- [x] Gestão Documental ISO
- [x] NPS / Reclamações
- [x] Auditorias
- [ ] Algo mais entra na Fase 1? ___
- [ ] Treinamentos/EPI/Acessos/Saída — definitivamente fora ou adiado? ___

---

## 🟡 Importes (definir durante o Sprint 1)

### 6. Classificação de Risco

- [ ] Só baixo/médio/alto? ___
- [ ] Tem urgência separada de risco? ___
- [ ] Risco alto → prazo menor? ___
- [ ] Quem define o risco: originador ou Qualidade? ___

### 7. SLA por Tipo

| Tipo de registro | SLA (dias) |
|-----------------|-----------|
| NC baixo risco | ___ |
| NC médio risco | ___ |
| NC alto risco | ___ |
| Hazard | ___ |
| NPS/Reclamação | ___ |
| Documental | ___ |

- [ ] Como funciona o escalonamento? ___
- [ ] Quantos níveis? ___

### 8. Numeração dos Registros

- [ ] Sequência única global? ___
- [ ] Ou separada por país? (ex: `NC-BR-000001` vs `NC-000001`) ___
- [ ] Reinício anual? ___
- [ ] Ou sequência contínua? ___

### 9. Evidências e Anexos

- [ ] Tipos aceitos: foto, vídeo, PDF, áudio, Excel, PPT, print? ___
- [ ] Limite de tamanho: ___ MB
- [ ] Evidência obrigatória pra alguns casos? Quais? ___

### 10. Reclamações / NPS

- [ ] Toda reclamação gera NC automática? ___
- [ ] Ou só alguns tipos? Quais? ___
- [ ] Categorias de reclamação: ___
- [ ] Quem aprova/trata: ___

---

## 🟢 Pra depois (Sprint 6+)

### 11. Integrações Prioritárias

- [ ] Qual integração vem primeiro? ___
- [ ] SAP? CRM? Outlook? Teams? SharePoint? ___
- [ ] Leitura ou gravação? ___

### 12. Idiomas

- [ ] pt-BR no início, es-AR depois? ___
- [ ] Ou bilíngue desde o MVP? ___

### 13. Perfis e Permissões (detalhes)

| Ação | Quem pode |
|------|----------|
| Ver todos os casos | ___ |
| Ver só os próprios | ___ |
| Reabrir caso | ___ |
| Excluir registro | ___ |
| Editar registro aberto | ___ |

### 14. Critérios de Fechamento

- [ ] Pra fechar uma NC precisa:
  - [ ] Ação imediata concluída
  - [ ] Ação corretiva aprovada
  - [ ] Eficácia positiva
  - [ ] Outro: ___
- [ ] Quem tem autoridade final pra fechar? ___

### 15. Auditoria e Logs

- [ ] Log de tudo (status + campos + anexos)? ___
- [ ] Ou só mudança de status? ___
- [ ] Val pra todos os módulos? ___

---

## ✅ Já Decidido

| # | Ponto | Decisão |
|---|-------|---------|
| 5 | Arquitetura | **Next.js + Supabase + Vercel** (Option B) |
| 8 | Escopo inicial | **5 módulos** (NC, Hazard, Documental, NPS, Auditorias) |
| - | Dashboards | **Tremor + Recharts** (sem Power BI) |
| - | Admin | Listas administráveis sem depender do dev |

---

> Preencher e devolver para o Gabriel Ciandrini / time de desenvolvimento.
