-- Migration: Adicionar campos faltantes à tabela nps_records
-- Data: 2026-05-29

-- Adicionar nota_nps (score NPS 0-10)
ALTER TABLE public.nps_records
  ADD COLUMN IF NOT EXISTS nota_nps INTEGER DEFAULT 0
    CHECK (nota_nps >= 0 AND nota_nps <= 10);

-- Adicionar departamento (área responsável em texto)
ALTER TABLE public.nps_records
  ADD COLUMN IF NOT EXISTS departamento TEXT;

-- Adicionar assunto (título/resumo curto)
ALTER TABLE public.nps_records
  ADD COLUMN IF NOT EXISTS assunto TEXT;