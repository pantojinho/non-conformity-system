-- Script para popular dados de teste NPS Records
-- Executar no Supabase SQL Editor

-- 1. Criar registros NPS de teste
INSERT INTO public.nps_records (
  codigo, cliente, descricao, categoria, projeto, pedido, impacto,
  area_responsavel_id, responsavel_id, data_ocorrencia, sla_prazo_dias,
  sla_data_limite, nc_vinculada_id, status, severidade, prioridade,
  canal, evidencias, nota_nps, originador_id, organization_id
) VALUES
(
  'NPS-000001',
  'Volkswagen do Brasil',
  'Cliente relatou problemas no robô IRB 6700 que apresenta vibrações excessivas durante a operação de soldagem na linha 4. Equipamento necessita recalibração urgente.',
  'product_quality',
  'Linha 4 Soldagem',
  'PO-2024-0815',
  'Parada parcial da linha de produção por 4 horas',
  NULL,
  NULL,
  '2024-05-25',
  7,
  '2024-06-01',
  NULL,
  'em_analise',
  'high',
  'urgent',
  'email',
  ARRAY[]::text[],
  3,
  (SELECT id FROM public.users WHERE auth_user_id = 'test_user' LIMIT 1),
  (SELECT organization_id FROM public.users WHERE auth_user_id = 'test_user' LIMIT 1)
),
(
  'NPS-000002',
  'Fiat Chrysler Automobiles',
  'Peça sobressalente entregue com 15 dias de atraso para o robô IRB 4600. Impacto direto na manutenção preventiva programada.',
  'delivery',
  'Manutenção Preventiva',
  'PO-2024-0801',
  'Atraso na manutenção preventiva pode causar paradas futuras',
  NULL,
  NULL,
  '2024-05-26',
  5,
  '2024-05-31',
  NULL,
  'aberto',
  'medium',
  'high',
  'telefone',
  ARRAY[]::text[],
  2,
  (SELECT id FROM public.users WHERE auth_user_id = 'test_user' LIMIT 1),
  (SELECT organization_id FROM public.users WHERE auth_user_id = 'test_user' LIMIT 1)
),
(
  'NPS-000003',
  'General Motors do Brasil',
  'Técnico de suporte não compareceu à agendamento. Terceira tentativa sem sucesso. Reclamação sobre qualidade do atendimento técnico.',
  'customer_service',
  'Suporte Técnico',
  'PO-2024-0799',
  'Múltiplos cancelamentos de agendamento técnico',
  NULL,
  NULL,
  '2024-05-27',
  3,
  '2024-05-30',
  NULL,
  'em_andamento',
  'high',
  'urgent',
  'portal',
  ARRAY[]::text[],
  1,
  (SELECT id FROM public.users WHERE auth_user_id = 'test_user' LIMIT 1),
  (SELECT organization_id FROM public.users WHERE auth_user_id = 'test_user' LIMIT 1)
),
(
  'NPS-000004',
  'Toyota do Brasil',
  'Cliente relatou atraso de 15 dias na entrega do robô IRB 6700-200/2.60 contratado para a nova linha de pintura P3.',
  'delivery',
  'Linha P3 Pintura',
  'PO-2024-0850',
  'Atraso impactando cronograma de inauguração da nova linha',
  NULL,
  NULL,
  '2024-05-28',
  10,
  '2024-06-07',
  NULL,
  'aberto',
  'high',
  'urgent',
  'email',
  ARRAY[]::text[],
  0,
  (SELECT id FROM public.users WHERE auth_user_id = 'test_user' LIMIT 1),
  (SELECT organization_id FROM public.users WHERE auth_user_id = 'test_user' LIMIT 1)
),
(
  'NPS-000005',
  'Mercedes-Benz do Brasil',
  'Robô IRB 1200 apresenta falhas intermitentes no sistema de visão. Problema não resolvido após 3 tentativas de correção.',
  'technical_support',
  'Inspeção Qualidade',
  'PO-2024-0820',
  'Falhas de qualidade afetando inspeção final',
  NULL,
  NULL,
  '2024-05-24',
  14,
  '2024-06-07',
  NULL,
  'resolvido',
  'critical',
  'medium',
  'chat',
  ARRAY[]::text[],
  5,
  (SELECT id FROM public.users WHERE auth_user_id = 'test_user' LIMIT 1),
  (SELECT organization_id FROM public.users WHERE auth_user_id = 'test_user' LIMIT 1)
);

-- 2. Criar logs de atividade
INSERT INTO public.nps_activity_log (nps_record_id, acao, descricao, alterado_por)
SELECT
  id,
  CASE
    WHEN status = 'aberto' THEN 'created'
    WHEN status = 'em_analise' THEN 'status_change'
    WHEN status = 'em_andamento' THEN 'status_change'
    WHEN status = 'resolvido' THEN 'resolved'
  END,
  CASE
    WHEN status = 'aberto' THEN 'Registro criado'
    WHEN status = 'em_analise' THEN 'Em análise técnica'
    WHEN status = 'em_andamento' THEN 'Ação corretiva em andamento'
    WHEN status = 'resolvido' THEN 'Problema resolvido'
  END,
  (SELECT id FROM public.users WHERE auth_user_id = 'test_user' LIMIT 1)
FROM public.nps_records
WHERE codigo IN ('NPS-000001', 'NPS-000002', 'NPS-000003', 'NPS-000004', 'NPS-000005');

-- 3. Criar ações corretivas para alguns registros
INSERT INTO public.nps_corrective_actions (
  nps_record_id, descricao, responsavel_id, prazo, status
)
SELECT
  id,
  'Agendar visita técnica para diagnóstico completo',
  (SELECT id FROM public.users WHERE auth_user_id = 'test_user' LIMIT 1),
  '2024-06-03',
  'pendente'
FROM public.nps_records
WHERE codigo = 'NPS-000001';

INSERT INTO public.nps_corrective_actions (
  nps_record_id, descricao, responsavel_id, prazo, status
)
SELECT
  id,
  'Verificar estoque de peças no centro de distribuição',
  (SELECT id FROM public.users WHERE auth_user_id = 'test_user' LIMIT 1),
  '2024-05-29',
  'concluida'
FROM public.nps_records
WHERE codigo = 'NPS-000002';

-- 4. Criar comentários de teste
INSERT INTO public.nps_comments (nps_record_id, conteudo, autor_id)
SELECT
  id,
  'Cliente solicitou priorização do caso devido ao impacto crítico na produção.',
  (SELECT id FROM public.users WHERE auth_user_id = 'test_user' LIMIT 1)
FROM public.nps_records
WHERE codigo = 'NPS-000001';

INSERT INTO public.nps_comments (nps_record_id, conteudo, autor_id)
SELECT
  id,
  'Agendamento confirmado para 30/05 as 09h00. Técnico designado: Carlos Mendes.',
  (SELECT id FROM public.users WHERE auth_user_id = 'test_user' LIMIT 1)
FROM public.nps_records
WHERE codigo = 'NPS-000003';

SELECT 'Dados de teste criados com sucesso!' AS result;