// ============================================================
// Enums
// ============================================================

export enum NCStatus {
  OPEN = "open",
  IN_ANALYSIS = "in_analysis",
  IN_PROGRESS = "in_progress",
  PENDING_VERIFICATION = "pending_verification",
  CLOSED = "closed",
  CANCELLED = "cancelled",
}

export enum NCSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export enum NCPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

export enum HazardCategory {
  PHYSICAL = "physical",
  CHEMICAL = "chemical",
  BIOLOGICAL = "biological",
  ERGONOMIC = "ergonomic",
  ACCIDENT = "accident",
}

export enum RiskLevel {
  NEGLIGIBLE = "negligible",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  VERY_HIGH = "very_high",
}

export enum AuditStatus {
  PLANNED = "planned",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum DocumentStatus {
  DRAFT = "draft",
  UNDER_REVIEW = "under_review",
  APPROVED = "approved",
  ARCHIVED = "archived",
}

export enum DocumentType {
  PROCEDURE = "procedure",
  POLICY = "policy",
  MANUAL = "manual",
  FORM = "form",
  RECORD = "record",
  NORM = "norm",
}

export enum ComplaintType {
  NPS = "nps",
  COMPLAINT = "complaint",
  SUGGESTION = "suggestion",
  PRAISE = "praise",
}

// ============================================================
// Database Types
// ============================================================

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  organization_id: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  name: string;
  cnpj?: string;
  created_at: string;
}

export interface NCRecord {
  id: string;
  title: string;
  description: string;
  status: NCStatus;
  severity: NCSeverity;
  priority: NCPriority;
  organization_id: string;
  process_id?: string;
  reported_by: string;
  assigned_to?: string;
  due_date?: string;
  root_cause?: string;
  corrective_action?: string;
  created_at: string;
  updated_at: string;
}

export interface Hazard {
  id: string;
  title: string;
  description: string;
  category: HazardCategory;
  risk_level: RiskLevel;
  organization_id: string;
  process_id?: string;
  reported_by: string;
  mitigation_measures?: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  status: DocumentStatus;
  version: string;
  file_url?: string;
  organization_id: string;
  process_id?: string;
  created_by: string;
  approved_by?: string;
  created_at: string;
  updated_at: string;
}

// NPSRecord moved to ./nps.ts — exported via re-export below.

export interface Audit {
  id: string;
  title: string;
  description?: string;
  status: AuditStatus;
  auditor: string;
  organization_id: string;
  process_id?: string;
  scheduled_date: string;
  completed_date?: string;
  findings?: string;
  created_at: string;
  updated_at: string;
}

export interface Process {
  id: string;
  name: string;
  description?: string;
  organization_id: string;
  created_at: string;
}

// ============================================================
// API / Form Types
// ============================================================

export interface CreateNCInput {
  title: string;
  description: string;
  severity: NCSeverity;
  priority: NCPriority;
  process_id?: string;
  assigned_to?: string;
  due_date?: string;
}

export interface CreateHazardInput {
  title: string;
  description: string;
  category: HazardCategory;
  risk_level: RiskLevel;
  process_id?: string;
  mitigation_measures?: string;
}

export interface CreateDocumentInput {
  title: string;
  type: DocumentType;
  process_id?: string;
}

export interface CreateAuditInput {
  title: string;
  description?: string;
  auditor: string;
  process_id?: string;
  scheduled_date: string;
}

// ============================================================
// Re-export NPS / Complaints types
// ============================================================

export * from "./nps";
