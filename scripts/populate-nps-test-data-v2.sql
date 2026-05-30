-- Script para popular dados de teste NPS Records (v2 - simplificado)
-- Executar no Supabase SQL Editor

-- 1. Criar registros NPS de teste (sem referências a user_id)
INSERT INTO public.nps_records (
  cliente, descricao, status, severidade, prioridade, canal, nota_nps
) VALUES
(
  'Volkswagen do Brasil',
  'Cliente relatou problemas no robô IRB 6700 que apresenta vibrações excessivas durante a operação de soldagem na linha 4.',
  'em_analise',
  'high',
  'urgent',
  'email',
  3
),
(
  'Fiat Chrysler Automobiles',
  'Peça sobressalente entregue com 15 dias de atraso para o robô IRB 4600.',
  'aberto',
  'medium',
  'high',
  'telefone',
  2
),
(
  'General Motors do Brasil',
  'Técnico de suporte não compareceu ao agendamento. Terceira tentativa sem sucesso.',
  'em_andamento',
  'high',
  'urgent',
  'portal',
  1
),
(
  'Toyota do Brasil',
  'Cliente relatou atraso de 15 dias na entrega do robô IRB 6700-200/2.60.',
  'aberto',
  'high',
  'urgent',
  'email',
  0
),
(
  'Mercedes-Benz do Brasil',
  'Robô IRB 1200 apresenta falhas intermitentes no sistema de visão.',
  'resolvido',
  'critical',
  'medium',
  'chat',
  5
);

SELECT 'Dados de teste criados com sucesso!' AS result;