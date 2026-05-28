# Fluxo Completo — Não Conformidade

> Versão validada — Documentação do Projeto v0.1 (28/05/2026)

## Visão Geral — 9 Etapas

| Etapa | Objetivo | Responsável | Saída Esperada | Observação |
|-------|----------|-------------|----------------|------------|
| 1. Abertura | Registrar o desvio | Originador | Registro com ID automático | < 2 min para casos simples |
| 2. Definição resolvedor | Atribuir tratativa | Qualidade/HSE/Gestor | Responsável definido | Se não conhecido → gestor define |
| 3. Aceite | Confirmar responsabilidade | Resolvedor | Aceito ou rejeitado | Rejeição → volta para redefinição |
| 4. Ação imediata | Conter o problema | Resolvedor | Plano de contenção | Prazo: até 30 dias |
| 5. Aprovação ação imediata | Validar contenção | Qualidade/HSE/Aprovador | Aprovada ou reprovada | Reprovada → volta ao resolvedor |
| 6. Análise de causa | Identificar causa raiz | Resolvedor/Área | Causa raiz documentada | 5 Porquês e/ou Ishikawa |
| 7. Ação corretiva | Eliminar causa | Resolvedor/Área | Ação com prazo e dono | Rejeitada → reinicia correção |
| 8. Aprovação final | Validar solução | Qualidade/HSE/Gestor | Pronto para eficácia | Aprovação multinível |
| 9. Eficácia | Verificar se funcionou | Qualidade/HSE/Aprovador | Fechamento ou reabertura | 90 dias (padrão) ou 180 dias (parametrizável) |

---

## Detalhamento por Etapa

### ETAPA 1 — ABERTURA
**Ator:** Qualquer usuário logado (originador)

**Campos obrigatórios:**
- País (Brasil / Argentina)
- Detecção/Origem (Auditoria interna, Auditoria externa, Dia a dia)
- Norma aplicável (ISO 9001, 14001, 45001)
- Item da norma (carregado dinamicamente pela norma selecionada)
- Processo (30+ processos mapeados)
- Local de ocorrência
- Business
- Risco (Baixo, Médio, Alto)
- Descrição (o que ocorreu, onde, requisito impactado, evidência observada)
- Evidências (fotos, documentos, prints, vídeos)

**Sistema grava automaticamente:**
- Usuário logado como originador (nunca anônimo)
- Data e hora
- ID gerado (NC-000001)
- Início do workflow

---

### ETAPA 2 — DEFINIÇÃO DE RESOLVEDOR
**Ator:** Qualidade / HSE / Gestor

**Pergunta ao originador:** "Você sabe quem deve resolver?"
- **SIM** → Usuário escolhe o resolvedor da lista
- **NÃO** → Sistema envia automaticamente:
  - Brasil → Aprovador/gestor designado
  - Argentina → Aprovador/gestor designado

**Nota:** Recomenda-se usar papéis funcionais (não nomes) para reduzir dependência de pessoas.

---

### ETAPA 3 — ACEITE DO RESOLVEDOR
**Ator:** Resolvedor

**Opções:**
- Aceitar → Segue para ação imediata
- Rejeitar → Volta para gestores redefinirem

**Regra:** Evitar "ping pong" entre usuários. Se rejeitar, deve justificar.

---

### ETAPA 4 — AÇÃO IMEDIATA / REMEDIAÇÃO
**Ator:** Resolvedor

**Objetivo:** Conter o problema no curto prazo

**Exemplos:**
- Curativo
- Isolamento da área
- Troca temporária
- Limpeza
- Correção rápida

**Prazo:** Até 30 dias

**Campos:**
- Descrição da ação
- Evidências (fotos, documentos)
- Anexos
- Data de conclusão

---

### ETAPA 5 — APROVAÇÃO DA AÇÃO IMEDIATA
**Ator:** Qualidade / HSE / Aprovador

- **Aprovada** → Abre fluxo de análise de causa
- **Reprovada** → Volta ao resolvedor para ajuste

---

### ETAPA 6 — ANÁLISE DE CAUSA
**Ator:** Resolvedor / Área responsável

**Campos:**
- Causa raiz documentada
- Método utilizado:
  - 5 Porquês
  - Ishikawa (Diagrama de Causa e Efeito)
  - Outro
- Evidências de análise
- Anexos

**Formatos aceitos:** PDF, Imagens, Vídeos, PPT, Excel

---

### ETAPA 7 — AÇÃO CORRETIVA
**Ator:** Resolvedor / Área responsável

**Objetivo:** Eliminar a causa raiz do problema

**Campos:**
- Plano definitivo
- Responsável pela execução
- Prazo
- Evidências
- Impacto esperado

**Se rejeitada:** Reinicia a etapa de correção.

---

### ETAPA 8 — APROVAÇÃO FINAL
**Ator:** Qualidade / HSE / Gestor (aprovação multinível)

Valida a solução proposta. Aprovado → segue para eficácia.

---

### ETAPA 9 — EFICÁCIA
**Ator:** Qualidade / HSE / Aprovador

**Agendamento automático:**
- 90 dias (padrão)
- 180 dias (parametrizável por categoria)

**Pergunta:** "A ação foi eficaz?"
- **Sim (Eficaz)** → Fechar processo
- **Não (Não eficaz)** → Reabrir fluxo, retornar ao resolvedor para novo ciclo

**Regra:** Sistema agenda automaticamente a verificação na data parametrizada.

---

## Regras de Negócio do Fluxo

1. Se a ação corretiva for aprovada → sistema programa automaticamente a avaliação de eficácia
2. Se a eficácia for positiva → processo pode ser fechado
3. Se a eficácia for negativa → caso reabre, retorna ao resolvedor para novo ciclo
4. Se a ação imediata for reprovada → retorna ao resolvedor para ajuste
5. Se o responsável não estiver definido → caso segue para aprovador/gestor
6. Sistema registra: originador, responsáveis por etapa, datas, prazos, aprovações, rejeições, comentários
7. Histórico permite reconstruir todo o ciclo de vida para auditoria
8. SLA vencido → status muda automaticamente para "Atrasado" + gestor recebe alerta

---

## Automações do Fluxo

- Notificação automática ao abrir registro
- Notificação quando responsável for definido
- Alerta de tarefa pendente
- Alerta de prazo vencendo
- Solicitação de aprovação por etapa
- Notificação de reabertura
- Aviso automático de eficácia na data parametrizada
- Escalonamento automático quando SLA vencido
