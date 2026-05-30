// ============================================================
// NPS / Complaints — Enums
// ============================================================

export enum NPSCategory {
  QUALIDADE = "qualidade",
  ATENDIMENTO = "atendimento",
  PRAZO = "prazo",
  INSTALACAO = "instalacao",
  SERVICE = "service",
}

export enum NPSSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export enum NPSPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export enum NPSChannel {
  EMAIL = "email",
  TELEFONE = "telefone",
  NPS = "nps",
  PORTAL = "portal",
}

export enum NPSStatus {
  ABERTO = "aberto",
  EM_ATENDIMENTO = "em_atendimento",
  EM_ANALISE = "em_analise",
  EM_ANDAMENTO = "em_andamento",
  RESOLVIDO = "resolvido",
  ESCALONADO = "escalonado",
  FECHADO = "fechado",
  CANCELADO = "cancelado",
}

export enum NPSCorrectiveActionStatus {
  PENDENTE = "pendente",
  EM_ANDAMENTO = "em_andamento",
  CONCLUIDA = "concluida",
}

// ============================================================
// NPS / Complaints — Database Types
// ============================================================

export interface NPSRecord {
  id: string;
  codigo: string;
  cliente: string;
  projeto: string | null;
  pedido: string | null;
  categoria: NPSCategory;
  impacto: string | null;
  area_responsavel: string | null;
  responsavel_id: string | null;
  data_ocorrencia: string | null;
  descricao: string;
  severidade: NPSSeverity;
  prioridade: NPSPriority;
  canal: NPSChannel | null;
  status: NPSStatus;
  sla_prazo_dias: number;
  sla_data_limite: string | null;
  nc_vinculada_id: string | null;
  originador_id: string;
  created_at: string;
  updated_at: string;
  // Joined / relation data
  comments?: NPSComment[];
  attachments?: NPSAttachment[];
  actions?: NPSCorrectiveAction[];
  activity_log?: NPSActivityLogEntry[];
  originador?: { name: string; email: string };
  responsavel?: { name: string; email: string };
}

export interface NPSComment {
  id: string;
  nps_record_id: string;
  conteudo: string;
  autor_id: string;
  created_at: string;
  autor?: { name: string; email: string };
}

export interface NPSAttachment {
  id: string;
  nps_record_id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  uploaded_by: string;
  created_at: string;
}

export interface NPSActivityLogEntry {
  id: string;
  nps_record_id: string;
  acao: string;
  descricao: string | null;
  alterado_por: string | null;
  created_at: string;
  user?: { name: string };
}

export interface NPSCorrectiveAction {
  id: string;
  nps_record_id: string;
  descricao: string;
  responsavel: string | null;
  prazo: string | null;
  data_conclusao: string | null;
  status: NPSCorrectiveActionStatus;
  created_at: string;
}

// ============================================================
// NPS / Complaints — KPIs
// ============================================================

export interface NPSKPIs {
  total: number;
  abertas: number;
  em_atendimento: number;
  resolvidas: number;
  sla_compliance: number;
}

// ============================================================
// NPS / Complaints — API / Form Types
// ============================================================

export interface CreateNPSRecordInput {
  cliente: string;
  projeto?: string;
  pedido?: string;
  categoria: string;
  severidade: string;
  prioridade: string;
  area_responsavel?: string;
  canal?: string;
  data_ocorrencia?: string;
  descricao: string;
  impacto?: string;
  sla_prazo_dias?: number;
}

export interface NPSFilters {
  status?: string;
  search?: string;
  categoria?: string;
}
