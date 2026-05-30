import type {
  NPSRecord,
  NPSKPIs,
  NPSComment,
  NPSAttachment,
  NPSCorrectiveAction,
  CreateNPSRecordInput,
  NPSFilters,
} from "@/lib/types/nps";

// ============================================================
// Generic helper — wraps fetch with JSON + error handling
// ============================================================

async function apiFetch<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `API error ${res.status} on ${url}: ${body}`,
    );
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}

// ============================================================
// Complaints list (with KPIs)
// ============================================================

export async function fetchComplaints(
  filters?: NPSFilters,
): Promise<{ records: NPSRecord[]; kpis: NPSKPIs }> {
  const params = new URLSearchParams();
  if (filters?.status) params.set("status", filters.status);
  if (filters?.search) params.set("search", filters.search);
  if (filters?.categoria) params.set("categoria", filters.categoria);

  const qs = params.toString();
  const url = `/api/complaints${qs ? `?${qs}` : ""}`;

  return apiFetch<{ records: NPSRecord[]; kpis: NPSKPIs }>(url);
}

// ============================================================
// Single complaint
// ============================================================

export async function fetchComplaint(id: string): Promise<NPSRecord> {
  return apiFetch<NPSRecord>(`/api/complaints/${id}`);
}

// ============================================================
// Create complaint
// ============================================================

export async function createComplaint(
  data: CreateNPSRecordInput,
): Promise<NPSRecord> {
  return apiFetch<NPSRecord>("/api/complaints", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ============================================================
// Update complaint status
// ============================================================

export async function updateComplaintStatus(
  id: string,
  status: string,
): Promise<void> {
  await apiFetch<void>(`/api/complaints/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

// ============================================================
// Comments
// ============================================================

export async function addComment(
  npsRecordId: string,
  conteudo: string,
): Promise<NPSComment> {
  return apiFetch<NPSComment>(`/api/complaints/${npsRecordId}/comments`, {
    method: "POST",
    body: JSON.stringify({ conteudo }),
  });
}

// ============================================================
// Attachments
// ============================================================

export async function uploadAttachment(
  npsRecordId: string,
  file: File,
): Promise<NPSAttachment> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`/api/complaints/${npsRecordId}/attachments`, {
    method: "POST",
    body: formData,
    // NOTE: do NOT set Content-Type — browser sets multipart boundary
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Upload failed (${res.status}): ${body}`);
  }

  return res.json() as Promise<NPSAttachment>;
}

// ============================================================
// Corrective actions
// ============================================================

export async function addCorrectiveAction(
  npsRecordId: string,
  data: { descricao: string; responsavel?: string; prazo?: string },
): Promise<NPSCorrectiveAction> {
  return apiFetch<NPSCorrectiveAction>(
    `/api/complaints/${npsRecordId}/actions`,
    {
      method: "POST",
      body: JSON.stringify(data),
    },
  );
}

export async function updateCorrectiveAction(
  npsRecordId: string,
  actionId: string,
  data: Partial<NPSCorrectiveAction>,
): Promise<void> {
  await apiFetch<void>(
    `/api/complaints/${npsRecordId}/actions/${actionId}`,
    {
      method: "PATCH",
      body: JSON.stringify(data),
    },
  );
}
