-- ============================================================
-- Robotics Hub — Seeds (dados iniciais)
-- ============================================================
-- Execute DEPOIS da migration 001_initial.sql
-- ============================================================

-- ============================================================
-- 1. ORGANIZAÇÕES
-- ============================================================

INSERT INTO public.organizations (id, name, country) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'ABB Robotics Brasil', 'Brasil'),
  ('a0000000-0000-0000-0000-000000000002', 'ABB Robotics Argentina', 'Argentina')
ON CONFLICT DO NOTHING;

-- ============================================================
-- 2. ROLES (7 perfis)
-- ============================================================

INSERT INTO public.roles (id, name, description, permissions) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'usuario',        'Originador — abrir registros e acompanhar',        '{"nc": {"create": true, "read_own": true, "comment": true, "attach": true}}'),
  ('b0000000-0000-0000-0000-000000000002', 'resolvedor',     'Resolver tarefas — ação imediata + corretiva',     '{"nc": {"create": true, "read_own": true, "read_all": true, "accept": true, "reject": true, "immediate_action": true, "corrective_action": true, "cause_analysis": true, "comment": true, "attach": true}}'),
  ('b0000000-0000-0000-0000-000000000003', 'qualidade_hse',  'Governar fluxo — aprovar, definir, reabrir',       '{"nc": {"create": true, "read_all": true, "define_resolver": true, "approve_immediate": true, "approve_final": true, "evaluate_efficacy": true, "reopen": true, "comment": true, "attach": true}}'),
  ('b0000000-0000-0000-0000-000000000004', 'admin',          'Administrar plataforma — listas, permissões',      '{"*": {"*": true}}'),
  ('b0000000-0000-0000-0000-000000000005', 'gestor',         'Aprovar etapas críticas',                          '{"nc": {"create": true, "read_all": true, "define_resolver": true, "approve_immediate": true, "approve_final": true, "evaluate_efficacy": true, "comment": true}}'),
  ('b0000000-0000-0000-0000-000000000006', 'auditor',        'Visualização e análise — todos os registros',      '{"nc": {"read_all": true, "comment": true}, "hazard": {"read_all": true}, "document": {"read_all": true}, "nps": {"read_all": true}, "audit": {"read_all": true}}'),
  ('b0000000-0000-0000-0000-000000000007', 'diretor',        'Dashboards executivos — indicadores consolidados',  '{"nc": {"read_all": true}, "hazard": {"read_all": true}, "document": {"read_all": true}, "nps": {"read_all": true}, "audit": {"read_all": true}, "dashboard": {"executive": true}}')
ON CONFLICT DO NOTHING;

-- ============================================================
-- 3. NORMAS ISO
-- ============================================================

INSERT INTO public.tb_normas (id, name, description) VALUES
  ('c0000000-0000-0000-0000-000000000001', 'ISO 9001',  'Sistemas de Gestão da Qualidade'),
  ('c0000000-0000-0000-0000-000000000002', 'ISO 14001', 'Sistemas de Gestão Ambiental'),
  ('c0000000-0000-0000-0000-000000000003', 'ISO 45001', 'Sistemas de Gestão de Segurança e Saúde Ocupacional')
ON CONFLICT DO NOTHING;

-- ============================================================
-- 4. ITENS DE NORMA (exemplos — completar com time de Qualidade)
-- ============================================================

-- ISO 9001
INSERT INTO public.tb_itens_norma (norma_id, code, description) VALUES
  ('c0000000-0000-0000-0000-000000000001', '4.1',   'Compreensão da organização e seu contexto'),
  ('c0000000-0000-0000-0000-000000000001', '4.2',   'Compreensão das necessidades e expectativas das partes interessadas'),
  ('c0000000-0000-0000-0000-000000000001', '5.1',   'Liderança e comprometimento'),
  ('c0000000-0000-0000-0000-000000000001', '6.1',   'Ações para abordar riscos e oportunidades'),
  ('c0000000-0000-0000-0000-000000000001', '7.1',   'Recursos'),
  ('c0000000-0000-0000-0000-000000000001', '7.2',   'Competência'),
  ('c0000000-0000-0000-0000-000000000001', '7.3',   'Consciência'),
  ('c0000000-0000-0000-0000-000000000001', '7.5',   'Informação documentada'),
  ('c0000000-0000-0000-0000-000000000001', '8.1',   'Planejamento e controle operacional'),
  ('c0000000-0000-0000-0000-000000000001', '8.2',   'Requisitos de produtos e serviços'),
  ('c0000000-0000-0000-0000-000000000001', '8.3',   'Projeto e desenvolvimento de produtos e serviços'),
  ('c0000000-0000-0000-0000-000000000001', '8.4',   'Controle de processos, produtos e serviços fornecidos externamente'),
  ('c0000000-0000-0000-0000-000000000001', '8.5',   'Produção e prestação de serviço'),
  ('c0000000-0000-0000-0000-000000000001', '8.7',   'Controle de saídas não conformes'),
  ('c0000000-0000-0000-0000-000000000001', '9.1',   'Monitoramento, medição, análise e avaliação'),
  ('c0000000-0000-0000-0000-000000000001', '9.2',   'Auditoria interna'),
  ('c0000000-0000-0000-0000-000000000001', '9.3',   'Análise crítica pela direção'),
  ('c0000000-0000-0000-0000-000000000001', '10.1',  'Melhoria'),
  ('c0000000-0000-0000-0000-000000000001', '10.2',  'Não conformidade e ação corretiva'),
  ('c0000000-0000-0000-0000-000000000001', '10.3',  'Melhoria contínua')
ON CONFLICT DO NOTHING;

-- ISO 14001
INSERT INTO public.tb_itens_norma (norma_id, code, description) VALUES
  ('c0000000-0000-0000-0000-000000000002', '4.1',   'Compreensão da organização e seu contexto'),
  ('c0000000-0000-0000-0000-000000000002', '4.2',   'Compreensão das necessidades e expectativas das partes interessadas'),
  ('c0000000-0000-0000-0000-000000000002', '6.1.1', 'Ações para abordar riscos e oportunidades'),
  ('c0000000-0000-0000-0000-000000000002', '6.1.2', 'Aspectos ambientais'),
  ('c0000000-0000-0000-0000-000000000002', '6.1.3', 'Requisitos legais e outros'),
  ('c0000000-0000-0000-0000-000000000002', '7.2',   'Competência'),
  ('c0000000-0000-0000-0000-000000000002', '8.1',   'Planejamento e controle operacional'),
  ('c0000000-0000-0000-0000-000000000002', '9.1',   'Monitoramento, medição, análise e avaliação'),
  ('c0000000-0000-0000-0000-000000000002', '9.2',   'Avaliação do atendimento a requisitos legais'),
  ('c0000000-0000-0000-0000-000000000002', '10.2',  'Não conformidade e ação corretiva')
ON CONFLICT DO NOTHING;

-- ISO 45001
INSERT INTO public.tb_itens_norma (norma_id, code, description) VALUES
  ('c0000000-0000-0000-0000-000000000003', '4.1',   'Compreensão da organização e seu contexto'),
  ('c0000000-0000-0000-0000-000000000003', '5.1',   'Liderança e comprometimento'),
  ('c0000000-0000-0000-0000-000000000003', '6.1.1', 'Ações para abordar riscos e oportunidades'),
  ('c0000000-0000-0000-0000-000000000003', '6.1.2', 'Identificação de perigos e avaliação de riscos'),
  ('c0000000-0000-0000-0000-000000000003', '7.2',   'Competência'),
  ('c0000000-0000-0000-0000-000000000003', '7.3',   'Consciência'),
  ('c0000000-0000-0000-0000-000000000003', '8.1',   'Planejamento e controle operacional'),
  ('c0000000-0000-0000-0000-000000000003', '8.2',   'Eliminação de perigos e redução de riscos'),
  ('c0000000-0000-0000-0000-000000000003', '9.1',   'Monitoramento, medição, análise e avaliação'),
  ('c0000000-0000-0000-0000-000000000003', '10.2',  'Incidentes, não conformidades e ações corretivas')
ON CONFLICT DO NOTHING;

-- ============================================================
-- 5. DETECÇÃO
-- ============================================================

INSERT INTO public.tb_deteccao (name) VALUES
  ('Auditoria interna'),
  ('Auditoria externa'),
  ('Dia a dia')
ON CONFLICT DO NOTHING;

-- ============================================================
-- 6. LOCAL DE OCORRÊNCIA
-- ============================================================

INSERT INTO public.tb_local_ocorrencia (name) VALUES
  ('Cliente'),
  ('Local de trabalho'),
  ('Fornecedor'),
  ('Trajeto'),
  ('Outros')
ON CONFLICT DO NOTHING;

-- ============================================================
-- 7. BUSINESS (por organização)
-- ============================================================

INSERT INTO public.tb_business (organization_id, name) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Robotics'),
  ('a0000000-0000-0000-0000-000000000001', 'Service'),
  ('a0000000-0000-0000-0000-000000000001', 'Automotive'),
  ('a0000000-0000-0000-0000-000000000001', 'Industries'),
  ('a0000000-0000-0000-0000-000000000002', 'Robotics'),
  ('a0000000-0000-0000-0000-000000000002', 'Service'),
  ('a0000000-0000-0000-0000-000000000002', 'Automotive'),
  ('a0000000-0000-0000-0000-000000000002', 'Industries')
ON CONFLICT DO NOTHING;

-- ============================================================
-- 8. PROCESSOS (30+ mapeados — BR)
-- ============================================================

INSERT INTO public.tb_processos (organization_id, name) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Vendas'),
  ('a0000000-0000-0000-0000-000000000001', 'Engenharia de Aplicação/Vendas'),
  ('a0000000-0000-0000-0000-000000000001', 'Administração de Contratos'),
  ('a0000000-0000-0000-0000-000000000001', 'Order Handling'),
  ('a0000000-0000-0000-0000-000000000001', 'Gestão de Projetos (PM)'),
  ('a0000000-0000-0000-0000-000000000001', 'Engenharia'),
  ('a0000000-0000-0000-0000-000000000001', 'Planejamento'),
  ('a0000000-0000-0000-0000-000000000001', 'Tryout'),
  ('a0000000-0000-0000-0000-000000000001', 'Suprimentos'),
  ('a0000000-0000-0000-0000-000000000001', 'Qualidade'),
  ('a0000000-0000-0000-0000-000000000001', 'Recebimento & Expedição'),
  ('a0000000-0000-0000-0000-000000000001', 'Robô Produto'),
  ('a0000000-0000-0000-0000-000000000001', 'Project Controller'),
  ('a0000000-0000-0000-0000-000000000001', 'Controladoria'),
  ('a0000000-0000-0000-0000-000000000001', 'Finance'),
  ('a0000000-0000-0000-0000-000000000001', 'TAX'),
  ('a0000000-0000-0000-0000-000000000001', 'Real Estate'),
  ('a0000000-0000-0000-0000-000000000001', 'Trade Compliance & COMEX'),
  ('a0000000-0000-0000-0000-000000000001', 'Tesouraria'),
  ('a0000000-0000-0000-0000-000000000001', 'Seguros'),
  ('a0000000-0000-0000-0000-000000000001', 'Information System'),
  ('a0000000-0000-0000-0000-000000000001', 'HSE'),
  ('a0000000-0000-0000-0000-000000000001', 'Security'),
  ('a0000000-0000-0000-0000-000000000001', 'Recursos Humanos'),
  ('a0000000-0000-0000-0000-000000000001', 'Reparos de Robôs'),
  ('a0000000-0000-0000-0000-000000000001', 'Serviços de Campo'),
  ('a0000000-0000-0000-0000-000000000001', 'Service - Treinamento'),
  ('a0000000-0000-0000-0000-000000000001', 'Sobressalentes (Spare Parts)'),
  ('a0000000-0000-0000-0000-000000000001', 'Logística'),
  ('a0000000-0000-0000-0000-000000000001', 'Master Data'),
  ('a0000000-0000-0000-0000-000000000001', 'Travel & Expense'),
  ('a0000000-0000-0000-0000-000000000001', 'Legal & Integrity'),
  ('a0000000-0000-0000-0000-000000000001', 'Comunicação'),
  ('a0000000-0000-0000-0000-000000000001', 'Operações')
ON CONFLICT DO NOTHING;

-- AR (mesmos processos)
INSERT INTO public.tb_processos (organization_id, name)
SELECT 'a0000000-0000-0000-0000-000000000002', name
FROM public.tb_processos
WHERE organization_id = 'a0000000-0000-0000-0000-000000000001'
ON CONFLICT DO NOTHING;

-- ============================================================
-- 9. WORKFLOW NC (transições padrão)
-- ============================================================

INSERT INTO public.workflows (tipo_registro, status_origem, status_destino, perfil_necessario, acao_automatica) VALUES
  ('nc', 'aberto',                  'responsavel_definido',    'qualidade_hse',  '{"notify": "resolvedor"}'),
  ('nc', 'responsavel_definido',    'em_aceite',               'resolvedor',     '{}'),
  ('nc', 'em_aceite',               'em_acao_imediata',        'resolvedor',     '{"notify": "qualidade_hse"}'),
  ('nc', 'em_aceite',               'responsavel_definido',    'resolvedor',     '{}'),  -- rejeitado
  ('nc', 'em_acao_imediata',        'em_aprovacao_imediata',   'resolvedor',     '{"notify": "gestor"}'),
  ('nc', 'em_aprovacao_imediata',   'em_analise_causa',        'qualidade_hse',  '{"notify": "resolvedor"}'),
  ('nc', 'em_aprovacao_imediata',   'em_acao_imediata',        'qualidade_hse',  '{}'),  -- reprovado
  ('nc', 'em_analise_causa',        'em_acao_corretiva',       'resolvedor',     '{}'),
  ('nc', 'em_acao_corretiva',       'em_aprovacao_final',      'resolvedor',     '{"notify": "gestor"}'),
  ('nc', 'em_aprovacao_final',      'em_eficacia',             'qualidade_hse',  '{"schedule_eficacy": true}'),
  ('nc', 'em_eficacia',             'fechado',                 'qualidade_hse',  '{"notify": "originador"}'),
  ('nc', 'em_eficacia',             'em_analise_causa',        'qualidade_hse',  '{"notify": "resolvedor", "reopen": true}')  -- nao eficaz
ON CONFLICT DO NOTHING;

-- ============================================================
-- 10. ADMIN USER (para setup inicial)
-- ============================================================

-- NOTA: O usuário admin real é criado via Supabase Auth (signup).
-- Depois de criar o auth user, rode:
-- UPDATE public.users SET role_id = 'b0000000-0000-0000-0000-000000000004' WHERE email = 'admin@abb.com';

-- Usuário placeholder (será substituído pelo fluxo de signup)
INSERT INTO public.users (id, email, name, role_id, organization_id, country, unit, is_active)
VALUES (
  'd0000000-0000-0000-0000-000000000001',
  'admin@robotics-hub.local',
  'Admin Setup',
  'b0000000-0000-0000-0000-000000000004',
  'a0000000-0000-0000-0000-000000000001',
  'brasil',
  'Sorocaba',
  true
) ON CONFLICT DO NOTHING;

-- ============================================================
-- FIM DOS SEEDS
-- ============================================================
