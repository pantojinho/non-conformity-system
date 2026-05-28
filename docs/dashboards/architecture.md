# Dashboards — Arquitetura sem Power BI

## Por que NÃO usar Power BI

| Critério | Power BI | Recharts (Next.js) |
|----------|----------|----------------------------|
| Custo | Licença Pro por usuário (~$10/user/mês) | **Gratuito** (open source) |
| Integração | Embed complexo, iframe | **Nativo** na aplicação |
| Autenticação | Precisa SSO/Entra ID separado | **Mesma auth** do sistema |
| Mobile | App separado | **Responsivo nativo** |
| Manutenção | Gateway, refresh, configs | **Zero overhead** |
| Real-time | Limitado (DirectQuery) | **Supabase Realtime** grátis |
| Customização | Limitada | **Total controle** UI/UX |

## Stack de Dashboards

```
Recharts (gráficos) + Supabase (dados) + Tailwind + shadcn/ui
```

### Recharts
- Gráficos declarativos em React
- Line, Bar, Pie, Area, Composed charts
- Tooltips, legends, animações
- https://recharts.org

## Dashboards Planejados

### 1. Dashboard Executivo
- Total NCs / Hazards / NPS
- Tempo médio de resolução
- Taxa de eficácia
- Reincidência
- Top processos / áreas / categorias
- Risco alto aberto
- Aging

### 2. Dashboard Qualidade
- NC por item de norma
- NC por auditoria (interna/externa)
- NC por processo e unidade
- NC por país
- Tendência mensal
- Pareto de causas

### 3. Dashboard HSE
- Hazard por categoria
- Hazard por local
- Risco alto
- Áreas críticas
- Tendência temporal

### 4. Dashboard NPS
- Reclamações por cliente/projeto
- SLA compliance
- Motivos principais
- Tendência de satisfação

## KPI Cards (Home)

Na home do sistema, mostrar cards rápidos:
- NCs abertas (contador)
- Hazards abertos (contador)
- Minhas pendências
- SLA atrasado
- Últimas ocorrências

## Dados em Tempo Real

Supabase Realtime permite:
- Atualização automática dos dashboards
- Sem necessidade de refresh
- Subscription por tabela
- Perfeito para acompanhamento operacional
