# Open Points — Validações Pendentes

> Extraído da Documentação do Projeto v0.1 (28/05/2026)

Apesar do bom nível de detalhamento, alguns pontos precisam ser formalmente confirmados:

---

## 1. Itens por Norma
- **O que falta:** Lista definitiva de itens por norma (ISO 9001, 14001, 45001)
- **Impacto:** Dropdown dinâmico no formulário de NC
- **Ação:** Validar com time de Qualidade qual é a lista oficial de itens por norma
- **Nota:** Itens precisam de manutenção anual (atualização normativa)

## 2. Matriz de Aprovadores
- **O que falta:** Matriz final de aprovadores por papel (substituindo referências nominais)
- **Impacto:** Workflow de aprovação em todas as etapas
- **Ação:** Traduzir nomes (Aldo, Laureano, etc.) para papéis funcionais (Gestor BR, Gestor AR, etc.)
- **Razão:** Reduzir dependência de pessoas específicas

## 3. Prazo de Eficácia
- **O que falta:** Regras finais por tipo de avaliação de eficácia
- **Opções atuais:** 90 dias (padrão), 180 dias (parametrizável)
- **Ação:** Definir quando usar 90 vs 180 dias — por categoria? Por risco? Por norma?
- **Impacto:** Agendamento automático no workflow

## 4. Nomenclatura Hazard / SOT / SOFIA
- **O que falta:** Nomenclatura final entre Hazard, SOT, SOFIA e observações preventivas
- **Opções citadas:** Hazard, SOT (Saúde, Segurança, Meio Ambiente, Security), SOFIA
- **Ação:** Alinhar com HSE qual é a nomenclatura oficial do módulo
- **Impacto:** IDs (HZ- vs SOT-), categorias, labels na interface

## 5. Arquitetura de Implantação
- **O que falta:** Arquitetura final oficial e estratégia de transição
- **Contexto:** Duas propostas existem:
  - MVP rápido com Power Platform (histórico)
  - Plataforma própria Vercel + Supabase (direção estratégica atual)
- **Ação:** Confirmar se vai direto para plataforma própria ou se precisa MVP intermediário
- **Impacto:** Roadmap, cronograma, recursos necessários

## 6. Integrações Prioritárias
- **O que falta:** Quais integrações são prioridade para fases futuras
- **Citadas:** SAP, CRM, Outlook, Teams, SharePoint
- **Ação:** Rankear por impacto e viabilidade
- **Impacto:** Sprint 10 (Integrações), preparação arquitetural

## 7. Relatórios Executivos e Operacionais
- **O que falta:** Modelo final de relatórios
- **Ação:** Definir formatos, periodicidade, destinatários
- **Impacto:** Dashboards, exportações, PDFs

## 8. Multi-tenant / Multiempresa
- **O que falta:** Confirmar se `organization_id` será obrigatório desde o início
- **Contexto:** Hoje é BR + AR, mas pode expandir para outras unidades ABB
- **Ação:** Confirmar se a estrutura multi-tenant precisa estar pronta no MVP
- **Impacto:** Schema do banco, RLS policies, UI de seleção de organização

## 9. Idioma da Interface
- **O que falta:** Confirmar idiomas suportados
- **Contexto:** BR (pt-BR) + AR (es-AR)
- **Ação:** Definir se i18n é necessário no MVP ou se começa só em pt-BR
- **Impacto:** Estrutura de tradução, labels, mensagens de erro

---

## Recomendação

Validar estes pontos em **workshop com Qualidade, HSE, responsáveis regionais e time de desenvolvimento**, convertendo-os em decisões formais antes de iniciar o Sprint 1.
