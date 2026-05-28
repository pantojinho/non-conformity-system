# Guia de Administração

## Princípio: Zero Dependência do Desenvolvedor

Todas as listas, categorias e estruturas devem ser **administráveis pela equipe interna** via interface de Administração.

## Tabelas Administráveis via UI

| Tabela | O que gerencia |
|--------|---------------|
| tb_processos | Lista de processos da empresa |
| tb_normas | Normas ISO ativas |
| tb_itens_norma | Itens por norma (dropdown dinâmico) |
| tb_deteccao | Tipos de detecção |
| tb_local_ocorrencia | Locais de ocorrência |
| tb_business | Business units |
| tb_status | Status do fluxo |
| tb_usuarios_perfis | Perfis e permissões |

## Perfis de Acesso

### Usuário Comum
- Abrir registros (NC, Hazard, Reclamação)
- Consultar próprios registros
- Ver dashboards gerais

### Resolvedor
- Receber tarefas atribuídas
- Executar ações (imediata e corretiva)
- Anexar evidências
- Atualizar status

### Qualidade / HSE
- Aprovar ações
- Reabrir processos
- Definir responsáveis
- Analisar eficácia

### Administrador
- Gerenciar todas as listas paramétricas
- Gerenciar usuários e permissões
- Configurar SLA e regras
- Acesso total ao sistema
- Dashboards completos

## Interface de Administração

Rotas em `/admin/*`:
- `/admin/processes` — CRUD de processos
- `/admin/norms` — CRUD de normas e itens
- `/admin/users` — Gestão de perfis
- `/admin/business` — Business units
- `/admin/status` — Configuração de fluxo
