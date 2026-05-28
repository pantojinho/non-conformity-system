# Database Schema — Non-Conformity System

## Tabela Principal: `registros`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | Identificador único |
| codigo | TEXT (unique) | Auto-gerado: NC-000001, HZ-000001, SOT-000001, NPS-000001 |
| tipo_registro | ENUM | nc, hazard, sot, nps |
| pais | ENUM | brasil, argentina |
| unidade | TEXT | Sorocaba, São Paulo, Buenos Aires, etc. |
| business | FK → tb_business | Robotics, Service, Automotive, Industries |
| processo | FK → tb_processos | Vendas, Engenharia, Qualidade, etc. |
| norma | FK → tb_normas | ISO 9001, ISO 14001, ISO 45001 |
| item_norma | FK → tb_itens_norma | Carregado dinamicamente pela norma |
| tipo_hazard | ENUM | null, seguranca, saude, meio_ambiente, security |
| deteccao | FK → tb_deteccao | Auditoria interna, externa, dia a dia |
| local_ocorrencia | FK → tb_local | Cliente, local trabalho, fornecedor, trajeto, outros |
| cliente | TEXT | Nome do cliente (quando aplicável) |
| descricao | TEXT | Descrição detalhada |
| risco | ENUM | baixo, medio, alto |
| status | ENUM | Ver fluxo de status completo |
| originador_id | UUID (FK → auth.users) | Quem abriu — nunca anônimo |
| resolvedor_id | UUID (FK → auth.users) | Responsável pela resolução |
| responsavel_id | UUID (FK → auth.users) | Responsável atual |
| data_abertura | TIMESTAMPTZ | Auto preenchido |
| data_fechamento | TIMESTAMPTZ | Preenchido no fechamento |
| prazo_sla | INTEGER | Prazo em dias |
| anexos | JSONB | Lista de URLs de arquivos |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

## Tabela: `acoes`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| registro_id | UUID (FK → registros) | |
| tipo | ENUM | imediata, corretiva |
| descricao | TEXT | |
| causa_raiz | TEXT | (somente corretiva) |
| metodo_causa | ENUM | 5_porques, ishikawa, outro |
| responsavel_id | UUID (FK → auth.users) | |
| prazo | DATE | |
| data_conclusao | DATE | |
| status | ENUM | pendente, em_andamento, concluida, rejeitada |
| aprovado_por | UUID (FK → auth.users) | |
| data_aprovacao | TIMESTAMPTZ | |
| evidencias | JSONB | URLs de arquivos |
| impacto_esperado | TEXT | |

## Tabela: `eficacia`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| registro_id | UUID (FK → registros) | |
| data_verificacao | DATE | Agendada automaticamente (90 ou 180 dias) |
| resultado | ENUM | eficaz, nao_eficaz, pendente |
| observacao | TEXT | |
| verificado_por | UUID (FK → auth.users) | |
| reaberto | BOOLEAN | Se não eficaz → reabre fluxo |

## Tabela: `historico`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID (PK) | |
| registro_id | UUID (FK → registros) | |
| campo_alterado | TEXT | |
| valor_anterior | TEXT | |
| valor_novo | TEXT | |
| alterado_por | UUID (FK → auth.users) | |
| alterado_em | TIMESTAMPTZ | |

## Tabelas Paramétricas (administráveis via UI)

### `tb_processos`
Vendas, Engenharia, PM, Qualidade, Compras, Logística, HSE, RH, Finance, Tax, IS, Service, Reparos, Spare Parts, etc.

### `tb_normas`
ISO 9001, ISO 14001, ISO 45001

### `tb_itens_norma`
Relacionado a tb_normas. Ex: ISO 9001 → Controle de documentos, Treinamento, etc.

### `tb_deteccao`
Auditoria interna, Auditoria externa, Dia a dia

### `tb_local_ocorrencia`
Cliente, Local de trabalho, Fornecedor, Trajeto, Outros

### `tb_business`
Robotics, Service, Automotive, Industries

### `tb_status`
Ver fluxo completo em docs/workflows/nc-flow.md

## Fluxo de Status (ENUM)

```
aberto → em_triagem → aguardando_definicao_resolvedor → em_acao_imediata →
aguardando_aprovacao_imediata → acao_imediata_rejeitada → em_acao_corretiva →
em_analise_causa → em_validacao → aguardando_eficacia → eficaz →
nao_eficaz → reaberto → fechado
```
