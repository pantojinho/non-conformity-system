# Perfis de Acesso, Permissões e Administração

> Baseado na Documentação do Projeto v0.1 (28/05/2026)

---

## Perfis

| Perfil | Responsabilidade Principal | Permissões |
|--------|--------------------------|------------|
| **Usuário comum / Originador** | Abrir registros e acompanhar seus casos | Criar registro, anexar evidências, consultar histórico próprio |
| **Resolvedor** | Receber e executar tarefas do fluxo | Aceitar/rejeitar responsabilidade, registrar ação imediata, análise de causa e ação corretiva |
| **Qualidade / HSE** | Governar o fluxo e validar etapas | Definir responsáveis, aprovar etapas, reabrir casos, acompanhar indicadores |
| **Administrador** | Manter a plataforma | Gerenciar listas, permissões, parametrizações, dashboards e regras |
| **Gestores / Aprovadores** | Aprovar etapas críticas | Aprovação de ação imediata, ação corretiva e análise de eficácia |
| **Auditor** | Visualização e análise | Consultar todos os registros, histórico, evidências e dashboards |
| **Diretor** | Dashboards executivos | Acesso a indicadores consolidados, KPIs, tendências |

---

## Matriz de Permissões por Módulo

### Não Conformidade

| Ação | Usuário | Resolvedor | Qualidade/HSE | Admin | Gestor | Auditor | Diretor |
|------|---------|------------|---------------|-------|--------|---------|---------|
| Abrir NC | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Ver próprias NCs | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Ver todas NCs | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Aceitar/Rejeitar tarefa | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Definir resolvedor | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Ação imediata | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Aprovar ação imediata | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Análise de causa | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Ação corretiva | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Aprovação final | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Avaliar eficácia | ❌ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Reabrir caso | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Anexar evidências | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Comentar | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |

### Administração

| Ação | Admin |
|------|-------|
| Gerenciar processos | ✅ |
| Gerenciar normas e itens | ✅ |
| Gerenciar business | ✅ |
| Gerenciar status | ✅ |
| Gerenciar usuários | ✅ |
| Gerenciar permissões | ✅ |
| Configurar SLA | ✅ |
| Configurar regras workflow | ✅ |

---

## Princípio: Zero Dependência do Desenvolvedor

Todas as listas, categorias e estruturas devem ser **administráveis pela equipe interna** via interface de Administração.

---

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

---

## Interface de Administração

Rotas em `/admin/*`:
- `/admin/processes` — CRUD de processos
- `/admin/norms` — CRUD de normas e itens
- `/admin/users` — Gestão de perfis
- `/admin/business` — Business units
- `/admin/status` — Configuração de fluxo

---

## Nota Importante

**Recomendação:** Traduzir referências nominais (ex: "Aldo", "Laureano") para papéis funcionais (ex: "Gestor BR", "Gestor AR"). Isso reduz dependência de pessoas específicas e torna o sistema escalável.
