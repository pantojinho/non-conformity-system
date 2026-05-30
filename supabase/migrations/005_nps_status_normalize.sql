-- Migration: Normalize nps_status enum to include all statuses used by the app
-- Adds: em_analise, em_andamento, cancelado
-- Note: existing values (aberto, em_atendimento, resolvido, escalonado, fechado) remain unchanged

-- 1. Add missing status values to the nps_status enum
DO $$ BEGIN
  -- Add em_analise if not exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'nps_status' AND e.enumlabel = 'em_analise'
  ) THEN
    ALTER TYPE public.nps_status ADD VALUE 'em_analise';
  END IF;

  -- Add em_andamento if not exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'nps_status' AND e.enumlabel = 'em_andamento'
  ) THEN
    ALTER TYPE public.nps_status ADD VALUE 'em_andamento';
  END IF;

  -- Add cancelado if not exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e
    JOIN pg_type t ON t.oid = e.enumtypid
    WHERE t.typname = 'nps_status' AND e.enumlabel = 'cancelado'
  ) THEN
    ALTER TYPE public.nps_status ADD VALUE 'cancelado';
  END IF;
END $$;

-- 2. Update any legacy data that used incorrect status forms
-- These are no-ops if no rows match, safe to run multiple times
UPDATE public.nps_records SET status = 'aberto' WHERE status = 'aberta';
UPDATE public.nps_records SET status = 'resolvido' WHERE status = 'resolvida';
UPDATE public.nps_records SET status = 'escalonado' WHERE status = 'escalonada';
UPDATE public.nps_records SET status = 'fechado' WHERE status = 'fechada';
UPDATE public.nps_records SET status = 'fechado' WHERE status = 'encerrada';
UPDATE public.nps_records SET status = 'cancelado' WHERE status = 'cancelada';

SELECT 'nps_status enum normalized successfully' AS result;
