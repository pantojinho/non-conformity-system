# Fluxo Completo — Não Conformidade

## ETAPA 1 — ABERTURA
**Ator:** Qualquer usuário logado
**Campos obrigatórios:** País, Tipo, Norma, Processo, Business, Local, Detecção, Descrição, Risco, Anexos
**Sistema grava automaticamente:** Usuário logado, Data, Hora, ID gerado (NC-XXXXXX)
**Regra:** Originador **nunca** pode ser anônimo

## ETAPA 2 — DEFINIÇÃO DE RESOLVEDOR
**Pergunta ao originador:** "Você sabe quem deve resolver?"
- **SIM** → Usuário escolhe o resolvedor da lista
- **NÃO** → Sistema envia automaticamente:
  - Brasil → Aldo (Carrasco)
  - Argentina → Laureano
  - Eles definem o responsável

## ETAPA 3 — ACEITE DO RESOLVEDOR
**Ator:** Resolvedor
**Opções:**
- Aceitar → Segue para ação imediata
- Rejeitar → Volta para administradores

**Regra:** Evitar "ping pong" entre usuários

## ETAPA 4 — AÇÃO IMEDIATA
**Objetivo:** Conter o problema
**Exemplos:** Curativo, isolamento da área, troca temporária, limpeza, correção rápida
**Prazo:** 30 dias
**Campos:** Descrição ação, Evidência, Anexos, Data conclusão

## ETAPA 5 — APROVAÇÃO AÇÃO IMEDIATA
**Aprovadores:** Aldo, Laureano, Administradores
- **Aprovado** → Abre fluxo de ação corretiva
- **Rejeitado** → Volta para resolvedor

## ETAPA 6 — ANÁLISE DE CAUSA
**Campos:** Causa raiz, Método utilizado (5 Porquês / Ishikawa), Evidências, Anexos
**Formatos aceitos:** PDF, Imagens, Vídeos, PPT

## ETAPA 7 — AÇÃO CORRETIVA
**Objetivo:** Eliminar causa raiz
**Campos:** Plano definitivo, Responsável, Prazo, Evidências, Impacto esperado

## ETAPA 8 — APROVAÇÃO FINAL
**Aprovadores:** Aldo, Laureano, Time Qualidade

## ETAPA 9 — EFICÁCIA
**Agendamento automático:** 90 dias OU 180 dias
**Pergunta:** "A ação foi eficaz?"
- **Sim** → Fechar processo
- **Não** → Reabrir fluxo completo
