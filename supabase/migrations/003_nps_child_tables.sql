-- ============================================================
-- Robotics Hub — Migration 003: NPS Child Tables + Extra Columns
-- ============================================================
-- Execute no SQL Editor do Supabase Dashboard.
-- Cria: Tabelas filhas (comments, attachments, activity_log, corrective_actions)
-- Altera: nps_records com novas colunas (severidade, prioridade, canal)
-- Versão: 1.0 (30/05/2026)
-- ============================================================

-- 1. Adicionar colunas faltantes à nps_records
ALTER TABLE public.nps_records
  ADD COLUMN IF NOT EXISTS severidade TEXT DEFAULT 'medium'
    CHECK (severidade IN ('low', 'medium', 'high', 'critical')),
  ADD COLUMN IF NOT EXISTS prioridade TEXT DEFAULT 'medium'
    CHECK (prioridade IN ('low', 'medium', 'high', 'urgent')),
  ADD COLUMN IF NOT EXISTS canal TEXT
    CHECK (canal IN ('email', 'telefone', 'nps', 'portal'));

-- Atualizar seed data com severidade/prioridade/canal
UPDATE public.nps_records SET severidade='high', prioridade='urgent', canal='email' WHERE cliente='Toyota do Brasil';
UPDATE public.nps_records SET severidade='high', prioridade='high', canal='telefone' WHERE cliente='Volkswagen Caminhões';
UPDATE public.nps_records SET severidade='medium', prioridade='medium', canal='nps' WHERE cliente='Embraer';
UPDATE public.nps_records SET severidade='medium', prioridade='high', canal='portal' WHERE cliente='Gerdau';
UPDATE public.nps_records SET severidade='low', prioridade='medium', canal='email' WHERE cliente='Petrobras';
UPDATE public.nps_records SET severidade='high', prioridade='urgent', canal='telefone' WHERE cliente='Suzano Papel';

-- 2. Tabela de comentários
CREATE TABLE IF NOT EXISTS public.nps_comments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nps_record_id   UUID NOT NULL REFERENCES public.nps_records(id) ON DELETE CASCADE,
  conteudo        TEXT NOT NULL,
  autor_id        UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_nps_comments_record ON public.nps_comments(nps_record_id);
CREATE INDEX IF NOT EXISTS idx_nps_comments_author ON public.nps_comments(autor_id);

ALTER TABLE public.nps_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read nps_comments"
  ON public.nps_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert nps_comments"
  ON public.nps_comments FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 3. Tabela de anexos
CREATE TABLE IF NOT EXISTS public.nps_attachments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nps_record_id   UUID NOT NULL REFERENCES public.nps_records(id) ON DELETE CASCADE,
  file_name       TEXT NOT NULL,
  file_url        TEXT NOT NULL,
  file_type       TEXT DEFAULT 'print'
    CHECK (file_type IN ('foto', 'video', 'pdf', 'audio', 'ppt', 'excel', 'print')),
  file_size       BIGINT DEFAULT 0,
  uploaded_by     UUID NOT NULL REFERENCES public.users(id) ON DELETE RESTRICT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_nps_attachments_record ON public.nps_attachments(nps_record_id);

ALTER TABLE public.nps_attachments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read nps_attachments"
  ON public.nps_attachments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert nps_attachments"
  ON public.nps_attachments FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 4. Tabela de log de atividades
CREATE TABLE IF NOT EXISTS public.nps_activity_log (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nps_record_id   UUID NOT NULL REFERENCES public.nps_records(id) ON DELETE CASCADE,
  acao            TEXT NOT NULL
    CHECK (acao IN ('created', 'status_changed', 'comment_added', 'attachment_added', 'assigned', 'escalated', 'updated')),
  descricao       TEXT,
  alterado_por    UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_nps_activity_record ON public.nps_activity_log(nps_record_id);

ALTER TABLE public.nps_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read nps_activity_log"
  ON public.nps_activity_log FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert nps_activity_log"
  ON public.nps_activity_log FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 5. Tabela de ações corretivas NPS
CREATE TABLE IF NOT EXISTS public.nps_corrective_actions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nps_record_id   UUID NOT NULL REFERENCES public.nps_records(id) ON DELETE CASCADE,
  descricao       TEXT NOT NULL,
  responsavel     TEXT,
  prazo           DATE,
  data_conclusao  DATE,
  status          TEXT DEFAULT 'pendente'
    CHECK (status IN ('pendente', 'em_andamento', 'concluida')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_nps_actions_record ON public.nps_corrective_actions(nps_record_id);

ALTER TABLE public.nps_corrective_actions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read nps_corrective_actions"
  ON public.nps_corrective_actions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert nps_corrective_actions"
  ON public.nps_corrective_actions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update nps_corrective_actions"
  ON public.nps_corrective_actions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- 6. Storage bucket para anexos NPS
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'nps-attachments',
  'nps-attachments',
  true,
  10485760,  -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'video/mp4', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Authenticated users can upload nps attachments"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'nps-attachments');

CREATE POLICY "Anyone can view nps attachments"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'nps-attachments');

CREATE POLICY "Authenticated users can delete nps attachments"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'nps-attachments');

-- 7. Seed: comentários para Toyota (NPS-000002)
INSERT INTO public.nps_comments (nps_record_id, conteudo, autor_id, created_at) VALUES
  ((SELECT id FROM public.nps_records WHERE codigo='NPS-000002'),
   'Reclamação registrada após contato com o cliente. Toyota solicitou prioridade máxima no atendimento.',
   '74838b21-b8b1-43b3-901d-476903413330', '2026-05-28T14:32:00Z'),
  ((SELECT id FROM public.nps_records WHERE codigo='NPS-000002'),
   'Robô substituto enviado do estoque de Sorocaba. Previsão de chegada: 04/06.',
   '1268d0d1-bf0d-467e-8f78-582817e6d3c8', '2026-05-29T09:15:00Z');

-- Seed: log de atividades para Toyota
INSERT INTO public.nps_activity_log (nps_record_id, acao, descricao, alterado_por, created_at) VALUES
  ((SELECT id FROM public.nps_records WHERE codigo='NPS-000002'), 'created', 'Reclamação registrada', '74838b21-b8b1-43b3-901d-476903413330', '2026-05-28T14:32:00Z'),
  ((SELECT id FROM public.nps_records WHERE codigo='NPS-000002'), 'assigned', 'Atribuída a Carlos Gestor', '74838b21-b8b1-43b3-901d-476903413330', '2026-05-28T14:33:00Z');

-- Seed: ações corretivas para Toyota
INSERT INTO public.nps_corrective_actions (nps_record_id, descricao, responsavel, prazo, status) VALUES
  ((SELECT id FROM public.nps_records WHERE codigo='NPS-000002'), 'Enviar robô substituto IRB 6700 do estoque de Sorocaba', 'Roberto Silva', '2026-06-05', 'em_andamento'),
  ((SELECT id FROM public.nps_records WHERE codigo='NPS-000002'), 'Agendar equipe de instalação para 10/06/2026', 'André Costa', '2026-06-08', 'pendente');

-- Seed: log de atividades para Volkswagen (NPS-000003)
INSERT INTO public.nps_activity_log (nps_record_id, acao, descricao, alterado_por, created_at) VALUES
  ((SELECT id FROM public.nps_records WHERE codigo='NPS-000003'), 'created', 'Reclamação registrada', '74838b21-b8b1-43b3-901d-476903413330', '2026-05-26T10:00:00Z'),
  ((SELECT id FROM public.nps_records WHERE codigo='NPS-000003'), 'status_changed', 'Status: Em Atendimento', '1268d0d1-bf0d-467e-8f78-582817e6d3c8', '2026-05-26T11:00:00Z');
