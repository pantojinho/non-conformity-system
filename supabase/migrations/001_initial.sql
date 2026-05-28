-- ============================================================
-- Robotics Hub — Migration 001: Initial Schema
-- ============================================================
-- Execute este arquivo INTEIRO no SQL Editor do Supabase.
-- Cria: Enums, Tabelas, Índices, RLS Policies, Triggers, Seeds.
-- Versão: 1.0 (28/05/2026)
-- ============================================================

-- ============================================================
-- 1. ENUM TYPES
-- ============================================================

DO $$ BEGIN
  -- Países
  CREATE TYPE public.country AS ENUM ('brasil', 'argentina');

  -- Tipos de registro
  CREATE TYPE public.record_type AS ENUM ('nc', 'hazard', 'sot', 'nps', 'observacao');

  -- Nível de risco
  CREATE TYPE public.risk_level AS ENUM ('baixo', 'medio', 'alto');

  -- Status NC (12 status consolidados)
  CREATE TYPE public.nc_status AS ENUM (
    'aberto',
    'responsavel_definido',
    'em_aceite',
    'em_acao_imediata',
    'em_aprovacao_imediata',
    'em_analise_causa',
    'em_acao_corretiva',
    'em_aprovacao_final',
    'em_eficacia',
    'fechado',
    'reaberto',
    'atrasado'
  );

  -- Status Hazard
  CREATE TYPE public.hazard_status AS ENUM (
    'aberto',
    'em_analise',
    'acao_corretiva',
    'verificacao',
    'fechado'
  );

  -- Status Documento
  CREATE TYPE public.document_status AS ENUM (
    'rascunho',
    'em_revisao',
    'aprovado',
    'publicado',
    'expirado'
  );

  -- Status NPS/Reclamação
  CREATE TYPE public.nps_status AS ENUM (
    'aberto',
    'em_atendimento',
    'resolvido',
    'escalonado',
    'fechado'
  );

  -- Status Auditoria
  CREATE TYPE public.audit_status AS ENUM (
    'planejada',
    'em_andamento',
    'concluida'
  );

  -- Status Ação
  CREATE TYPE public.action_status AS ENUM (
    'pendente',
    'em_andamento',
    'concluida',
    'rejeitada'
  );

  -- Tipo de ação
  CREATE TYPE public.action_type AS ENUM ('imediata', 'corretiva');

  -- Método de causa raiz
  CREATE TYPE public.cause_method AS ENUM ('5_porques', 'ishikawa', 'outro');

  -- Resultado eficácia
  CREATE TYPE public.efficacy_result AS ENUM ('eficaz', 'nao_eficaz', 'pendente');

  -- Tipo de documento
  CREATE TYPE public.document_type AS ENUM ('procedimento', 'instrucao', 'formulario');

  -- Tipo de auditoria
  CREATE TYPE public.audit_type AS ENUM ('interna', 'externa');

  -- Tipo de anexo
  CREATE TYPE public.attachment_type AS ENUM ('foto', 'video', 'pdf', 'audio', 'ppt', 'excel', 'print');

  -- Tipo de registro para FK polimórfica
  CREATE TYPE public.registro_tipo AS ENUM ('nc', 'hazard', 'document', 'nps', 'audit', 'acao');

  -- Categorias de hazard
  CREATE TYPE public.hazard_category AS ENUM ('seguranca', 'saude', 'meio_ambiente', 'security');

  -- Tipo de hazard
  CREATE TYPE public.hazard_type AS ENUM ('hazard', 'sot');

  -- Categorias NPS
  CREATE TYPE public.nps_category AS ENUM ('qualidade', 'atendimento', 'prazo', 'instalacao', 'service');

  -- Tipo de detecção
  CREATE TYPE public.detection_type AS ENUM ('auditoria_interna', 'auditoria_externa', 'dia_a_dia');

  -- Local de ocorrência
  CREATE TYPE public.occurrence_location AS ENUM ('cliente', 'local_trabalho', 'fornecedor', 'trajeto', 'outros');

  -- Tipo de notificação
  CREATE TYPE public.notification_type AS ENUM (
    'registro_aberto',
    'responsavel_definido',
    'tarefa_pendente',
    'prazo_vencendo',
    'aprovacao_necessaria',
    'reabertura',
    'eficacia_pendente',
    'escalonamento'
  );

EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- 2. TABELAS CORE
-- ============================================================

-- -----------------------------------------------------------
-- 2.1 organizations
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.organizations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  country     TEXT NOT NULL,
  active      BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------
-- 2.2 roles
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.roles (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL UNIQUE,
  description TEXT,
  permissions JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------
-- 2.3 users (perfil estendido — auth.users é separado)
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id    UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email           TEXT NOT NULL UNIQUE,
  name            TEXT NOT NULL,
  role_id         UUID NOT NULL REFERENCES public.roles(id) ON DELETE RESTRICT,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
  country         public.country NOT NULL DEFAULT 'brasil',
  unit            TEXT,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------
-- 2.4 permissions (granular por módulo)
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.permissions (
  id       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role_id  UUID NOT NULL REFERENCES public.roles(id) ON DELETE CASCADE,
  module   TEXT NOT NULL,  -- nc, hazard, document, nps, audit, admin
  action   TEXT NOT NULL,  -- create, read, update, delete, approve, reopen
  resource TEXT NOT NULL,  -- registro, acao, eficacia, dashboard, lista
  UNIQUE(role_id, module, action, resource)
);

-- -----------------------------------------------------------
-- 2.5 Sequences para IDs automáticos
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.id_sequences (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id  UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  prefix           TEXT NOT NULL,  -- NC, HZ, SOT, NPS
  current_value    INTEGER NOT NULL DEFAULT 0,
  UNIQUE(organization_id, prefix)
);

-- ============================================================
-- 3. TABELAS PARAMÉTRICAS (admin via UI)
-- ============================================================

-- -----------------------------------------------------------
-- 3.1 tb_business
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tb_business (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  active          BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(organization_id, name)
);

-- -----------------------------------------------------------
-- 3.2 tb_processos
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tb_processos (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  active          BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(organization_id, name)
);

-- -----------------------------------------------------------
-- 3.3 tb_normas
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tb_normas (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL UNIQUE,  -- ISO 9001, ISO 14001, ISO 45001
  description     TEXT,
  active          BOOLEAN NOT NULL DEFAULT true
);

-- -----------------------------------------------------------
-- 3.4 tb_itens_norma
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tb_itens_norma (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  norma_id    UUID NOT NULL REFERENCES public.tb_normas(id) ON DELETE CASCADE,
  code        TEXT NOT NULL,   -- ex: 7.1, 8.2.1
  description TEXT NOT NULL,
  active      BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(norma_id, code)
);

-- -----------------------------------------------------------
-- 3.5 tb_deteccao
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tb_deteccao (
  id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  active BOOLEAN NOT NULL DEFAULT true
);

-- -----------------------------------------------------------
-- 3.6 tb_local_ocorrencia
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tb_local_ocorrencia (
  id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  active BOOLEAN NOT NULL DEFAULT true
);

-- ============================================================
-- 4. TABELAS DE MÓDULOS
-- ============================================================

-- -----------------------------------------------------------
-- 4.1 nc_records
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.nc_records (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo            TEXT UNIQUE,
  organization_id   UUID NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
  tipo_registro     public.record_type NOT NULL DEFAULT 'nc',
  pais              public.country NOT NULL DEFAULT 'brasil',
  unidade           TEXT,
  business_id       UUID REFERENCES public.tb_business(id) ON DELETE SET NULL,
  processo_id       UUID REFERENCES public.tb_processos(id) ON DELETE SET NULL,
  norma_id          UUID REFERENCES public.tb_normas(id) ON DELETE SET NULL,
  item_norma_id     UUID REFERENCES public.tb_itens_norma(id) ON DELETE SET NULL,
  deteccao_id       UUID REFERENCES public.tb_deteccao(id) ON DELETE SET NULL,
  local_ocorrencia_id UUID REFERENCES public.tb_local_ocorrencia(id) ON DELETE SET NULL,
  cliente           TEXT,
  descricao         TEXT NOT NULL,
  impacto           TEXT,
  risco             public.risk_level NOT NULL DEFAULT 'medio',
  status            public.nc_status NOT NULL DEFAULT 'aberto',
  originador_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  resolvedor_id     UUID REFERENCES public.users(id) ON DELETE SET NULL,
  gestor_id         UUID REFERENCES public.users(id) ON DELETE SET NULL,
  data_abertura     TIMESTAMPTZ NOT NULL DEFAULT now(),
  data_fechamento   TIMESTAMPTZ,
  prazo_sla_dias    INTEGER DEFAULT 30,
  prazo_sla_data    DATE,
  anexos            JSONB DEFAULT '[]'::jsonb,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------
-- 4.2 hazards
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.hazards (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo          TEXT UNIQUE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
  tipo            public.hazard_type NOT NULL DEFAULT 'hazard',
  pais            public.country NOT NULL DEFAULT 'brasil',
  unidade         TEXT,
  categoria       public.hazard_category NOT NULL,
  local           TEXT,
  risco           public.risk_level NOT NULL DEFAULT 'medio',
  descricao       TEXT NOT NULL,
  area            TEXT,
  processo_id     UUID REFERENCES public.tb_processos(id) ON DELETE SET NULL,
  responsavel_id  UUID REFERENCES public.users(id) ON DELETE SET NULL,
  status          public.hazard_status NOT NULL DEFAULT 'aberto',
  evidencias      JSONB DEFAULT '[]'::jsonb,
  originador_id   UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------
-- 4.3 documents
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.documents (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo          TEXT UNIQUE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
  title           TEXT NOT NULL,
  tipo            public.document_type NOT NULL,
  revision        INTEGER NOT NULL DEFAULT 1,
  processo_id     UUID REFERENCES public.tb_processos(id) ON DELETE SET NULL,
  norma_id        UUID REFERENCES public.tb_normas(id) ON DELETE SET NULL,
  owner_id        UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  approver_id     UUID REFERENCES public.users(id) ON DELETE SET NULL,
  expiration_date DATE,
  file_url        TEXT,
  status          public.document_status NOT NULL DEFAULT 'rascunho',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------
-- 4.4 nps_records
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.nps_records (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo            TEXT UNIQUE,
  organization_id   UUID NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
  cliente           TEXT,
  projeto           TEXT,
  pedido            TEXT,
  categoria         public.nps_category,
  impacto           TEXT,
  area_responsavel_id UUID REFERENCES public.tb_processos(id) ON DELETE SET NULL,
  responsavel_id    UUID REFERENCES public.users(id) ON DELETE SET NULL,
  data_ocorrencia   DATE,
  descricao         TEXT NOT NULL,
  evidencias        JSONB DEFAULT '[]'::jsonb,
  sla_prazo_dias    INTEGER,
  sla_data_limite   DATE,
  nc_vinculada_id   UUID REFERENCES public.nc_records(id) ON DELETE SET NULL,
  status            public.nps_status NOT NULL DEFAULT 'aberto',
  originador_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------
-- 4.5 audits
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audits (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id   UUID NOT NULL REFERENCES public.organizations(id) ON DELETE RESTRICT,
  tipo              public.audit_type NOT NULL,
  norma_id          UUID REFERENCES public.tb_normas(id) ON DELETE SET NULL,
  escopo            TEXT,
  auditor_lider_id  UUID REFERENCES public.users(id) ON DELETE SET NULL,
  data_inicio       DATE,
  data_fim          DATE,
  status            public.audit_status NOT NULL DEFAULT 'planejada',
  constatacoes      TEXT,
  observacoes       TEXT,
  nc_vinculadas     UUID[] DEFAULT '{}',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 5. TABELAS TRANSVERSAIS
-- ============================================================

-- -----------------------------------------------------------
-- 5.1 acoes (ação imediata + corretiva)
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.acoes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registro_id     UUID NOT NULL REFERENCES public.nc_records(id) ON DELETE CASCADE,
  tipo            public.action_type NOT NULL,
  descricao       TEXT NOT NULL,
  causa_raiz      TEXT,
  metodo_causa    public.cause_method,
  responsavel_id  UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  prazo           DATE,
  data_conclusao  DATE,
  status          public.action_status NOT NULL DEFAULT 'pendente',
  aprovado_por    UUID REFERENCES public.users(id) ON DELETE SET NULL,
  data_aprovacao  TIMESTAMPTZ,
  evidencias      JSONB DEFAULT '[]'::jsonb,
  impacto_esperado TEXT,
  comentarios     TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------
-- 5.2 eficacia
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.eficacia (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registro_id      UUID NOT NULL REFERENCES public.nc_records(id) ON DELETE CASCADE,
  data_verificacao DATE,
  resultado        public.efficacy_result NOT NULL DEFAULT 'pendente',
  observacao       TEXT,
  verificado_por   UUID REFERENCES public.users(id) ON DELETE SET NULL,
  reaberto         BOOLEAN NOT NULL DEFAULT false,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------
-- 5.3 attachments
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.attachments (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registro_id    UUID NOT NULL,
  registro_tipo  public.registro_tipo NOT NULL,
  file_name      TEXT NOT NULL,
  file_url       TEXT NOT NULL,
  file_type      public.attachment_type,
  file_size      BIGINT,
  uploaded_by    UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------
-- 5.4 comments
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.comments (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registro_id    UUID NOT NULL,
  registro_tipo  public.registro_tipo NOT NULL,
  conteudo       TEXT NOT NULL,
  autor_id       UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------
-- 5.5 notifications
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  tipo        public.notification_type NOT NULL,
  titulo      TEXT NOT NULL,
  mensagem    TEXT,
  lida        BOOLEAN NOT NULL DEFAULT false,
  registro_id UUID,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------
-- 5.6 activity_logs (audit trail completo)
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registro_id     UUID NOT NULL,
  registro_tipo   TEXT NOT NULL,
  acao            TEXT NOT NULL,       -- create, update, status_change, approve, reject, reopen
  campo_alterado  TEXT,
  valor_anterior  TEXT,
  valor_novo      TEXT,
  alterado_por    UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  alterado_em     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -----------------------------------------------------------
-- 5.7 workflows
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.workflows (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo_registro     public.registro_tipo NOT NULL,
  status_origem     TEXT NOT NULL,
  status_destino    TEXT NOT NULL,
  perfil_necessario TEXT NOT NULL,   -- originador, resolvedor, qualidade_hse, admin, gestor
  acao_automatica   JSONB DEFAULT '{}'::jsonb,
  ativo             BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(tipo_registro, status_origem, status_destino)
);

-- -----------------------------------------------------------
-- 5.8 workflow_steps
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.workflow_steps (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id         UUID NOT NULL REFERENCES public.workflows(id) ON DELETE CASCADE,
  ordem               INTEGER NOT NULL,
  status              TEXT NOT NULL,
  responsavel_tipo    TEXT NOT NULL,
  prazo_padrao_dias   INTEGER,
  obriga_anexo        BOOLEAN NOT NULL DEFAULT false,
  obriga_comentario   BOOLEAN NOT NULL DEFAULT false
);

-- ============================================================
-- 6. ÍNDICES
-- ============================================================

-- NC
CREATE INDEX IF NOT EXISTS idx_nc_org ON public.nc_records(organization_id);
CREATE INDEX IF NOT EXISTS idx_nc_status ON public.nc_records(status);
CREATE INDEX IF NOT EXISTS idx_nc_originador ON public.nc_records(originador_id);
CREATE INDEX IF NOT EXISTS idx_nc_resolvedor ON public.nc_records(resolvedor_id);
CREATE INDEX IF NOT EXISTS idx_nc_risco ON public.nc_records(risco);
CREATE INDEX IF NOT EXISTS idx_nc_data ON public.nc_records(data_abertura);
CREATE INDEX IF NOT EXISTS idx_nc_codigo ON public.nc_records(codigo);
CREATE INDEX IF NOT EXISTS idx_nc_norma ON public.nc_records(norma_id);
CREATE INDEX IF NOT EXISTS idx_nc_processo ON public.nc_records(processo_id);

-- Hazards
CREATE INDEX IF NOT EXISTS idx_hazards_org ON public.hazards(organization_id);
CREATE INDEX IF NOT EXISTS idx_hazards_status ON public.hazards(status);
CREATE INDEX IF NOT EXISTS idx_hazards_categoria ON public.hazards(categoria);
CREATE INDEX IF NOT EXISTS idx_hazards_risco ON public.hazards(risco);
CREATE INDEX IF NOT EXISTS idx_hazards_codigo ON public.hazards(codigo);

-- Documents
CREATE INDEX IF NOT EXISTS idx_documents_org ON public.documents(organization_id);
CREATE INDEX IF NOT EXISTS idx_documents_status ON public.documents(status);
CREATE INDEX IF NOT EXISTS idx_documents_expiration ON public.documents(expiration_date);

-- NPS
CREATE INDEX IF NOT EXISTS idx_nps_org ON public.nps_records(organization_id);
CREATE INDEX IF NOT EXISTS idx_nps_status ON public.nps_records(status);
CREATE INDEX IF NOT EXISTS idx_nps_codigo ON public.nps_records(codigo);

-- Audits
CREATE INDEX IF NOT EXISTS idx_audits_org ON public.audits(organization_id);
CREATE INDEX IF NOT EXISTS idx_audits_status ON public.audits(status);

-- Users
CREATE INDEX IF NOT EXISTS idx_users_org ON public.users(organization_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role_id);
CREATE INDEX IF NOT EXISTS idx_users_auth ON public.users(auth_user_id);

-- Activity logs
CREATE INDEX IF NOT EXISTS idx_activity_registro ON public.activity_logs(registro_id);
CREATE INDEX IF NOT EXISTS idx_activity_por ON public.activity_logs(alterado_por);
CREATE INDEX IF NOT EXISTS idx_activity_em ON public.activity_logs(alterado_em);

-- Attachments
CREATE INDEX IF NOT EXISTS idx_attach_registro ON public.attachments(registro_id, registro_tipo);

-- Comments
CREATE INDEX IF NOT EXISTS idx_comments_registro ON public.comments(registro_id, registro_tipo);

-- Notifications
CREATE INDEX IF NOT EXISTS idx_notif_user ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notif_lida ON public.notifications(user_id, lida);

-- Acoes
CREATE INDEX IF NOT EXISTS idx_acoes_registro ON public.acoes(registro_id);
CREATE INDEX IF NOT EXISTS idx_acoes_status ON public.acoes(status);

-- Eficacia
CREATE INDEX IF NOT EXISTS idx_eficacia_registro ON public.eficacia(registro_id);

-- Permissions
CREATE INDEX IF NOT EXISTS idx_perms_role ON public.permissions(role_id);

-- Itens norma
CREATE INDEX IF NOT EXISTS idx_itens_norma ON public.tb_itens_norma(norma_id);

-- ID sequences
CREATE INDEX IF NOT EXISTS idx_idseq_org_prefix ON public.id_sequences(organization_id, prefix);

-- ============================================================
-- 7. ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Habilitar RLS em todas as tabelas com dados de usuário
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nc_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hazards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nps_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.acoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eficacia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.id_sequences ENABLE ROW LEVEL SECURITY;

-- Policy: usuários só veem dados da própria organização
-- (admin vê tudo via service_role key)

-- Users
CREATE POLICY "users_same_org" ON public.users
  FOR ALL USING (organization_id = (SELECT organization_id FROM public.users WHERE auth_user_id = auth.uid()));

-- NC Records
CREATE POLICY "nc_same_org" ON public.nc_records
  FOR ALL USING (organization_id = (SELECT organization_id FROM public.users WHERE auth_user_id = auth.uid()));

-- Hazards
CREATE POLICY "hazards_same_org" ON public.hazards
  FOR ALL USING (organization_id = (SELECT organization_id FROM public.users WHERE auth_user_id = auth.uid()));

-- Documents
CREATE POLICY "documents_same_org" ON public.documents
  FOR ALL USING (organization_id = (SELECT organization_id FROM public.users WHERE auth_user_id = auth.uid()));

-- NPS
CREATE POLICY "nps_same_org" ON public.nps_records
  FOR ALL USING (organization_id = (SELECT organization_id FROM public.users WHERE auth_user_id = auth.uid()));

-- Audits
CREATE POLICY "audits_same_org" ON public.audits
  FOR ALL USING (organization_id = (SELECT organization_id FROM public.users WHERE auth_user_id = auth.uid()));

-- Notifications (só dono)
CREATE POLICY "notifications_owner" ON public.notifications
  FOR ALL USING (user_id = (SELECT id FROM public.users WHERE auth_user_id = auth.uid()));

-- Comments (mesma org via registro)
CREATE POLICY "comments_read_org" ON public.comments
  FOR SELECT USING (true);  -- Ajustar com join na lógica de negócio

-- Attachments (mesma org via registro)
CREATE POLICY "attachments_read_org" ON public.attachments
  FOR SELECT USING (true);  -- Ajustar com join na lógica de negócio

-- Activity logs (mesma org)
CREATE POLICY "activity_logs_read_org" ON public.activity_logs
  FOR SELECT USING (true);  -- Ajustar com join na lógica de negócio

-- Permissions (via role do usuário)
CREATE POLICY "permissions_via_role" ON public.permissions
  FOR SELECT USING (role_id = (SELECT role_id FROM public.users WHERE auth_user_id = auth.uid()));

-- Paramétricas (leitura para todos autenticados)
ALTER TABLE public.tb_business ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tb_processos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tb_normas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tb_itens_norma ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tb_deteccao ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tb_local_ocorrencia ENABLE ROW LEVEL SECURITY;

CREATE POLICY "parametric_read" ON public.tb_business FOR SELECT USING (true);
CREATE POLICY "parametric_read_proc" ON public.tb_processos FOR SELECT USING (true);
CREATE POLICY "parametric_read_norm" ON public.tb_normas FOR SELECT USING (true);
CREATE POLICY "parametric_read_item" ON public.tb_itens_norma FOR SELECT USING (true);
CREATE POLICY "parametric_read_det" ON public.tb_deteccao FOR SELECT USING (true);
CREATE POLICY "parametric_read_loc" ON public.tb_local_ocorrencia FOR SELECT USING (true);

-- Organizations (leitura para autenticados)
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orgs_read" ON public.organizations FOR SELECT USING (true);

-- Roles (leitura para autenticados)
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "roles_read" ON public.roles FOR SELECT USING (true);

-- Workflows (leitura para autenticados)
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "workflows_read" ON public.workflows FOR SELECT USING (true);
CREATE POLICY "workflow_steps_read" ON public.workflow_steps FOR SELECT USING (true);

-- ============================================================
-- 8. TRIGGER: updated_at automático
-- ============================================================

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated     BEFORE UPDATE ON public.users       FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER trg_nc_updated        BEFORE UPDATE ON public.nc_records  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER trg_hazards_updated   BEFORE UPDATE ON public.hazards    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER trg_documents_updated BEFORE UPDATE ON public.documents  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER trg_nps_updated       BEFORE UPDATE ON public.nps_records FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- 9. FUNCTION: gerar código automático (NC-000001, etc.)
-- ============================================================

CREATE OR REPLACE FUNCTION public.generate_codigo(
  p_org_id UUID,
  p_prefix TEXT
)
RETURNS TEXT AS $$
DECLARE
  v_next_val INTEGER;
  v_codigo   TEXT;
BEGIN
  INSERT INTO public.id_sequences (organization_id, prefix, current_value)
  VALUES (p_org_id, p_prefix, 1)
  ON CONFLICT (organization_id, prefix)
  DO UPDATE SET current_value = id_sequences.current_value + 1
  RETURNING current_value INTO v_next_val;

  v_codigo := p_prefix || '-' || lpad(v_next_val::text, 6, '0');
  RETURN v_codigo;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 10. TRIGGER: auto-gerar código ao inserir NC
-- ============================================================

CREATE OR REPLACE FUNCTION public.auto_codigo_nc()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.codigo IS NULL THEN
    NEW.codigo := public.generate_codigo(NEW.organization_id, 'NC');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_nc_codigo BEFORE INSERT ON public.nc_records
  FOR EACH ROW EXECUTE FUNCTION public.auto_codigo_nc();

-- Auto-gerar código Hazard
CREATE OR REPLACE FUNCTION public.auto_codigo_hazard()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.codigo IS NULL THEN
    IF NEW.tipo = 'sot' THEN
      NEW.codigo := public.generate_codigo(NEW.organization_id, 'SOT');
    ELSE
      NEW.codigo := public.generate_codigo(NEW.organization_id, 'HZ');
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_hazards_codigo BEFORE INSERT ON public.hazards
  FOR EACH ROW EXECUTE FUNCTION public.auto_codigo_hazard();

-- Auto-gerar código NPS
CREATE OR REPLACE FUNCTION public.auto_codigo_nps()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.codigo IS NULL THEN
    NEW.codigo := public.generate_codigo(NEW.organization_id, 'NPS');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_nps_codigo BEFORE INSERT ON public.nps_records
  FOR EACH ROW EXECUTE FUNCTION public.auto_codigo_nps();

-- Auto-gerar código Document
CREATE OR REPLACE FUNCTION public.auto_codigo_doc()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.codigo IS NULL THEN
    NEW.codigo := public.generate_codigo(NEW.organization_id, 'DOC');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_documents_codigo BEFORE INSERT ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.auto_codigo_doc();

-- ============================================================
-- 11. TRIGGER: calcular SLA ao inserir NC
-- ============================================================

CREATE OR REPLACE FUNCTION public.auto_sla_nc()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.prazo_sla_dias IS NOT NULL AND NEW.prazo_sla_data IS NULL THEN
    NEW.prazo_sla_data := (NEW.data_abertura + (NEW.prazo_sla_dias || ' days')::interval)::date;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_nc_sla BEFORE INSERT ON public.nc_records
  FOR EACH ROW EXECUTE FUNCTION public.auto_sla_nc();

-- ============================================================
-- 12. TRIGGER: activity log automático
-- ============================================================

CREATE OR REPLACE FUNCTION public.log_nc_changes()
RETURNS TRIGGER AS $$
DECLARE
  v_user_id UUID;
BEGIN
  SELECT id INTO v_user_id FROM public.users WHERE auth_user_id = auth.uid() LIMIT 1;

  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.activity_logs (registro_id, registro_tipo, acao, valor_novo, alterado_por)
    VALUES (NEW.id, 'nc', 'create', NEW.status, v_user_id);
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.status != NEW.status THEN
      INSERT INTO public.activity_logs (registro_id, registro_tipo, acao, campo_alterado, valor_anterior, valor_novo, alterado_por)
      VALUES (NEW.id, 'nc', 'status_change', 'status', OLD.status::text, NEW.status::text, v_user_id);
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_nc_activity AFTER INSERT OR UPDATE ON public.nc_records
  FOR EACH ROW EXECUTE FUNCTION public.log_nc_changes();

-- ============================================================
-- 13. STORAGE BUCKET
-- ============================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('attachments', 'attachments', false)
ON CONFLICT (id) DO NOTHING;

-- Policy: usuários autenticados podem upload
CREATE POLICY "authenticated_upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'attachments' AND auth.role() = 'authenticated');

-- Policy: usuários da mesma org podem ler
CREATE POLICY "authenticated_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'attachments' AND auth.role() = 'authenticated');

-- ============================================================
-- FIM DO SCHEMA
-- ============================================================
