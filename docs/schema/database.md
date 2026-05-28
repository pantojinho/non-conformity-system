# Database Schema — Robotics Hub

> Versão baseada na Documentação do Projeto v0.1 (28/05/2026)

## Visão Geral

Base de dados modular com 16+ tabelas, preparada para multi-tenant (`organization_id` em todas as tabelas desde o início).

---

## Tabelas Principais

### `users`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| email | TEXT (unique) | |
| name | TEXT | |
| role_id | FK → roles | Perfil do usuário |
| organization_id | FK → organizations | Multi-tenant |
| country | ENUM (brasil, argentina) | |
| unit | TEXT | Sorocaba, São Paulo, Buenos Aires, etc. |
| is_active | BOOLEAN | |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

### `roles`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| name | TEXT | usuario, resolvedor, qualidade_hse, admin, gestor, auditor, diretor |
| description | TEXT | |
| permissions | JSONB | Permissões granulares por módulo |

### `permissions`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| role_id | FK → roles | |
| module | TEXT | nc, hazard, document, nps, audit, admin |
| action | TEXT | create, read, update, delete, approve, reopen |
| resource | TEXT | registro, acao, eficacia, dashboard, lista |

### `organizations`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| name | TEXT | ABB Robotics Brasil, ABB Robotics Argentina, etc. |
| country | TEXT | |
| active | BOOLEAN | |

### `nc_records`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| codigo | TEXT (unique) | Auto-gerado: NC-000001 |
| organization_id | FK → organizations | Multi-tenant |
| tipo_registro | ENUM | nc, hazard, sot, nps, observacao |
| pais | ENUM | brasil, argentina |
| unidade | TEXT | Sorocaba, São Paulo, Buenos Aires |
| business | FK → tb_business | Robotics, Service, Automotive, Industries |
| processo | FK → tb_processos | (30+ processos mapeados) |
| norma | FK → tb_normas | ISO 9001, 14001, 45001 |
| item_norma | FK → tb_itens_norma | Carregado dinamicamente pela norma |
| tipo_hazard | ENUM | null, seguranca, saude, meio_ambiente, security |
| deteccao | FK → tb_deteccao | Auditoria interna, externa, dia_a_dia |
| local_ocorrencia | FK → tb_local_ocorrencia | Cliente, local_trabalho, fornecedor, trajeto, outros |
| cliente | TEXT | Quando aplicável |
| descricao | TEXT | O que, onde, requisito impactado, evidência observada |
| impacto | TEXT | Impacto percebido |
| risco | ENUM | baixo, medio, alto |
| status | ENUM | Ver tabela de status abaixo |
| originador_id | FK → users | Nunca anônimo |
| resolvedor_id | FK → users | Responsável pela resolução |
| gestor_id | FK → users | Gestor/aprovador |
| data_abertura | TIMESTAMPTZ | Auto preenchido |
| data_fechamento | TIMESTAMPTZ | |
| prazo_sla_dias | INTEGER | Prazo em dias |
| prazo_sla_data | DATE | Data limite calculada |
| anexos | JSONB | Lista de URLs |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

### `hazards`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| codigo | TEXT (unique) | HZ-000001 ou SOT-000001 |
| organization_id | FK → organizations | |
| tipo | ENUM | hazard, sot |
| pais | ENUM | brasil, argentina |
| unidade | TEXT | |
| categoria | ENUM | seguranca, saude, meio_ambiente, security |
| local | TEXT | |
| risco | ENUM | baixo, medio, alto |
| descricao | TEXT | |
| area | TEXT | |
| processo | FK → tb_processos | |
| responsavel_id | FK → users | |
| status | ENUM | aberto, em_analise, acao_corretiva, verificacao, fechado |
| evidencias | JSONB | URLs (foto prioritária) |
| originador_id | FK → users | |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

### `documents`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| codigo | TEXT (unique) | |
| organization_id | FK → organizations | |
| title | TEXT | |
| tipo | ENUM | procedimento, instrucao, formulario |
| revision | INTEGER | Incremento automático |
| processo | FK → tb_processos | |
| norma | FK → tb_normas | |
| owner_id | FK → users | Dono do documento |
| approver_id | FK → users | Aprovador |
| expiration_date | DATE | |
| file_url | TEXT | |
| status | ENUM | rascunho, em_revisao, aprovado, publicado, expirado |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

### `nps_records`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| codigo | TEXT (unique) | NPS-000001 |
| organization_id | FK → organizations | |
| cliente | TEXT | |
| projeto | TEXT | |
| pedido | TEXT | |
| categoria | ENUM | qualidade, atendimento, prazo, instalacao, service |
| impacto | TEXT | |
| area_responsavel | FK → tb_processos | |
| responsavel_id | FK → users | |
| data_ocorrencia | DATE | |
| descricao | TEXT | |
| evidencias | JSONB | |
| sla_prazo_dias | INTEGER | |
| sla_data_limite | DATE | |
| nc_vinculada_id | FK → nc_records | NC gerada automaticamente |
| status | ENUM | aberto, em_atendimento, resolvido, escalonado, fechado |
| originador_id | FK → users | |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

### `audits`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| organization_id | FK → organizations | |
| tipo | ENUM | interna, externa |
| norma | FK → tb_normas | |
| escopo | TEXT | |
| auditor_lider_id | FK → users | |
| data_inicio | DATE | |
| data_fim | DATE | |
| status | ENUM | planejada, em_andamento, concluida |
| constatacoes | TEXT | |
| observacoes | TEXT | |
| nc_vinculadas | UUID[] | IDs de NCs vinculadas |
| created_at | TIMESTAMPTZ | |

### `acoes`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| registro_id | FK → nc_records | |
| tipo | ENUM | imediata, corretiva |
| descricao | TEXT | |
| causa_raiz | TEXT | (somente corretiva) |
| metodo_causa | ENUM | 5_porques, ishikawa, outro |
| responsavel_id | FK → users | |
| prazo | DATE | |
| data_conclusao | DATE | |
| status | ENUM | pendente, em_andamento, concluida, rejeitada |
| aprovado_por | FK → users | |
| data_aprovacao | TIMESTAMPTZ | |
| evidencias | JSONB | URLs |
| impacto_esperado | TEXT | |
| comentarios | TEXT | |
| created_at | TIMESTAMPTZ | |

### `eficacia`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| registro_id | FK → nc_records | |
| data_verificacao | DATE | 90 ou 180 dias (parametrizável) |
| resultado | ENUM | eficaz, nao_eficaz, pendente |
| observacao | TEXT | |
| verificado_por | FK → users | |
| reaberto | BOOLEAN | Se não eficaz → reabre fluxo |
| created_at | TIMESTAMPTZ | |

### `attachments`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| registro_id | UUID | FK polimórfico (nc_records, hazards, etc.) |
| registro_tipo | ENUM | nc, hazard, document, nps, audit, acao |
| file_name | TEXT | |
| file_url | TEXT | Supabase Storage URL |
| file_type | ENUM | foto, video, pdf, audio, ppt, excel, print |
| file_size | BIGINT | Bytes |
| uploaded_by | FK → users | |
| created_at | TIMESTAMPTZ | |

### `comments`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| registro_id | UUID | FK polimórfico |
| registro_tipo | ENUM | nc, hazard, document, nps, audit, acao |
| conteudo | TEXT | |
| autor_id | FK → users | |
| created_at | TIMESTAMPTZ | |

### `notifications`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| user_id | FK → users | Destinatário |
| tipo | ENUM | registro_aberto, responsavel_definido, tarefa_pendente, prazo_vencendo, aprovacao_necessaria, reabertura, eficacia_pendente, escalonamento |
| titulo | TEXT | |
| mensagem | TEXT | |
| lida | BOOLEAN | |
| registro_id | UUID | Referência |
| created_at | TIMESTAMPTZ | |

### `activity_logs`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| registro_id | UUID | FK polimórfico |
| registro_tipo | TEXT | |
| acao | TEXT | create, update, status_change, approve, reject, reopen |
| campo_alterado | TEXT | |
| valor_anterior | TEXT | |
| valor_novo | TEXT | |
| alterado_por | FK → users | |
| alterado_em | TIMESTAMPTZ | |

### `workflows`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| tipo_registro | ENUM | nc, hazard, document, nps, audit |
| status_origem | TEXT | |
| status_destino | TEXT | |
| perfil_necessario | TEXT | Perfil que pode executar a transição |
| acao_automatica | JSONB | Notificações, SLA, etc. |
| ativo | BOOLEAN | |

### `workflow_steps`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| workflow_id | FK → workflows | |
| ordem | INTEGER | |
| status | TEXT | |
| responsavel_tipo | TEXT | originador, resolvedor, qualidade_hse, admin, gestor |
| prazo_padrao_dias | INTEGER | |
| obriga_anexo | BOOLEAN | |
| obriga_comentario | BOOLEAN | |

---

## Tabelas Paramétricas (administráveis via UI)

### `tb_processos`
30+ processos mapeados:
Vendas, Engenharia de Aplicação/Vendas, Administração de Contratos, Order Handling, Gestão de Projetos (PM), Engenharia, Planejamento, Tryout, Suprimentos, Qualidade, Recebimento & Expedição, Robô Produto, Project Controller, Controladoria, Finance, TAX, Real Estate, Trade Compliance & COMEX, Tesouraria, Seguros, Information System, HSE, Security, Recursos Humanos, Reparos de Robôs, Serviços de Campo, Service - Treinamento, Sobressalentes (Spare Parts), Logística, Master Data, Travel & Expense, Legal & Integrity, Comunicação, Operações

### `tb_normas`
ISO 9001, ISO 14001, ISO 45001

### `tb_itens_norma`
Relacionado a tb_normas. Itens por norma (a definir lista definitiva — ponto em aberto).

### `tb_deteccao`
Auditoria interna, Auditoria externa, Dia a dia

### `tb_local_ocorrencia`
Cliente, Local de trabalho, Fornecedor, Trajeto, Outros

### `tb_business`
Robotics, Service, Automotive, Industries

---

## Fluxo de Status — NC (12 status consolidados)

```
aberto → responsavel_definido → em_aceite → em_acao_imediata →
em_aprovacao_imediata → em_analise_causa → em_acao_corretiva →
em_aprovacao_final → em_eficacia → fechado

Ramificações:
- acao_imediata_rejeitada → volta para em_acao_imediata
- nao_eficaz → reaberto → volta para em_analise_causa
- sla_vencido → atrasado (automático)
```

**Status completos:**
1. Aberto
2. Responsável definido
3. Em aceite
4. Em ação imediata / remediação
5. Em aprovação da ação imediata
6. Em análise de causa
7. Em ação corretiva
8. Em aprovação final
9. Em eficácia
10. Fechado
11. Reaberto
12. Atrasado / SLA vencido
