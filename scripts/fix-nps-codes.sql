-- Fix para adicionar código aos registros existentes
UPDATE public.nps_records
SET codigo = 'NPS-' || LPAD(ROW_NUMBER() OVER (ORDER BY created_at)::text, 6, '0')
WHERE codigo IS NULL;

SELECT * FROM public.nps_records;