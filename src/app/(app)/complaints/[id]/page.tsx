"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  AlertCircle,
  MessageCircle,
  Clock,
  User,
  Building2,
  Tag,
  Calendar,
  FileText,
  Paperclip,
  Send,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  Link2,
  ExternalLink,
  CircleDot,
  ShieldAlert,
  Upload,
  RefreshCw,
  Image,
  Film,
  Trash2,
  Download,
} from "lucide-react";
import { useTranslations } from "@/i18n";
import { useToast } from "@/components/ui/toast";
import { LoadingPage, LoadingSkeleton } from "@/components/ui/loading";

const ABB_RED = "#FF000F";

// API response types
interface Customer {
  name: string;
  contact: string;
  email: string;
  phone: string;
}

interface Responsible {
  name: string;
  role: string;
  avatar: string;
}

interface Evidence {
  id?: string;
  name: string;
  type: string;
  size: string | number;
  url?: string;
  // DB fields (from nps_attachments table)
  file_name?: string;
  file_type?: string;
  file_size?: number;
  file_url?: string;
}

interface CorrectiveAction {
  id: number | string;
  description: string;
  responsible: string;
  status: string;
  deadline: string;
  completedAt: string | null;
}

interface LinkedNC {
  id: string;
  title: string;
  status: string;
  risk: string;
}

interface Comment {
  id: number | string;
  author: string;
  avatar: string;
  content: string;
  date: string;
}

interface TimelineEvent {
  event: string;
  user: string;
  date: string;
  icon: string;
}

interface ComplaintData {
  id: string;
  codigo?: string;
  status: string;
  priority: string;
  category: string;
  source: string;
  customer: Customer;
  project?: string;
  order?: string;
  responsible?: Responsible;
  department?: string;
  subject?: string;
  title?: string;
  description: string;
  impact?: string;
  npsScore: number;
  createdAt?: string;
  occurrenceDate?: string;
  slaDays?: number;
  slaDeadline?: string;
  slaRemaining?: number;
  evidences?: Evidence[];
  attachments?: Evidence[];
  correctiveActions?: CorrectiveAction[];
  actions?: CorrectiveAction[];
  linkedNC?: LinkedNC | null;
  comments?: Comment[];
  timeline?: TimelineEvent[];
  activity?: TimelineEvent[];
  [key: string]: unknown;
}

const statusConfig: Record<string, { color: string; bg: string; icon: typeof MessageCircle }> = {
  aberto: { color: "text-red-700 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/30", icon: AlertCircle },
  aberta: { color: "text-red-700 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/30", icon: AlertCircle }, // legacy alias
  em_atendimento: { color: "text-indigo-700 dark:text-indigo-400", bg: "bg-indigo-100 dark:bg-indigo-900/30", icon: Clock },
  em_analise: { color: "text-yellow-700 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/30", icon: Clock },
  em_andamento: { color: "text-blue-700 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30", icon: TrendingUp },
  resolvido: { color: "text-green-700 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30", icon: CheckCircle2 },
  resolvida: { color: "text-green-700 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30", icon: CheckCircle2 }, // legacy alias
  escalonado: { color: "text-orange-700 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-900/30", icon: AlertTriangle },
  escalonada: { color: "text-orange-700 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-900/30", icon: AlertTriangle }, // legacy alias
  fechado: { color: "text-gray-700 dark:text-gray-400", bg: "bg-gray-100 dark:bg-gray-800", icon: CheckCircle2 },
  fechada: { color: "text-gray-700 dark:text-gray-400", bg: "bg-gray-100 dark:bg-gray-800", icon: CheckCircle2 }, // legacy alias
  cancelado: { color: "text-gray-500 dark:text-gray-500", bg: "bg-gray-100 dark:bg-gray-800", icon: Clock },
  cancelada: { color: "text-gray-500 dark:text-gray-500", bg: "bg-gray-100 dark:bg-gray-800", icon: Clock }, // legacy alias
};

const priorityConfig: Record<string, { color: string; bg: string }> = {
  low: { color: "text-gray-700 dark:text-gray-300", bg: "bg-gray-100 dark:bg-gray-800" },
  medium: { color: "text-yellow-700 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
  high: { color: "text-orange-700 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-900/30" },
  critical: { color: "text-red-700 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/30" },
};

const statusLabels: Record<string, string> = {
  aberto: "Aberto",
  aberta: "Aberto",
  em_atendimento: "Em Atendimento",
  em_analise: "Em Análise",
  em_andamento: "Em Andamento",
  resolvido: "Resolvido",
  resolvida: "Resolvido",
  escalonado: "Escalonado",
  escalonada: "Escalonado",
  fechado: "Fechado",
  fechada: "Fechado",
  cancelado: "Cancelado",
  cancelada: "Cancelado",
};

const actionStatusLabels: Record<string, string> = {
  concluida: "Concluída",
  em_andamento: "Em andamento",
  pending: "Pendente",
  completed: "Concluída",
  in_progress: "Em andamento",
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export default function ComplaintDetailPage() {
  const t = useTranslations();
  const { showToast } = useToast();
  const params = useParams();
  const id = params?.id as string;

  const [complaint, setComplaint] = useState<ComplaintData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [updatingAction, setUpdatingAction] = useState<string | null>(null);

  const fetchComplaint = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/nps/${id}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error("Reclamação não encontrada");
        throw new Error("Erro ao carregar reclamação");
      }
      const data = await res.json();
      // Support both direct object and nested data
      const raw: Record<string, unknown> = data.data || data.complaint || data;
      // Mapear campos do banco para o formato esperado pelo frontend
      const complaintData: ComplaintData = {
        id: (raw.id as string) || '',
        codigo: (raw.codigo as string) || '',
        status: (raw.status as string) || 'aberto',
        priority: (raw.prioridade as string) || (raw.priority as string) || 'medium',
        source: (raw.canal as string) || (raw.source as string) || 'portal',
        category: (raw.categoria as string) || (raw.category as string) || '',
        severity: (raw.severidade as string) || (raw.severity as string) || 'medium',
        description: (raw.descricao as string) || (raw.description as string) || '',
        subject: (raw.projeto as string) || (raw.subject as string) || '',
        title: (raw.assunto as string) || (raw.title as string) || '',
        impact: (raw.impacto as string) || (raw.impact as string) || '',
        project: (raw.projeto as string) || '',
        order: (raw.pedido as string) || '',
        department: (raw.departamento as string) || '',
        npsScore: (raw.nota_nps as number) || (raw.npsScore as number) || 0,
        slaDays: (raw.sla_prazo_dias as number) || (raw.slaDays as number) || 0,
        slaDeadline: (raw.sla_data_limite as string) || (raw.slaDeadline as string) || '',
        slaRemaining: (raw.days_remaining as number) || (raw.slaRemaining as number) || 0,
        customer: {
          name: (raw.cliente as string) || '',
          contact: '',
          email: '',
          phone: '',
        },
        comments: (data.comments || []).map((c: any) => ({
          id: c.id,
          author: c.autor_nome || c.autor_id || 'Usuário',
          avatar: c.autor_nome ? c.autor_nome.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : (c.autor_id ? c.autor_id.substring(0, 2).toUpperCase() : 'U'),
          content: c.conteudo || '',
          date: c.created_at ? new Date(c.created_at).toLocaleString('pt-BR') : '',
        })),
        attachments: (data.attachments || []).map((a: any) => ({
          id: a.id,
          name: a.file_name || a.name || 'Arquivo',
          type: a.file_type || a.type || 'file',
          size: a.file_size ? formatFileSize(a.file_size) : (a.size || ''),
          url: a.file_url || a.url || '',
          file_name: a.file_name,
          file_type: a.file_type,
          file_size: a.file_size,
          file_url: a.file_url,
        })),
        evidences: (data.attachments || []).map((a: any) => ({
          id: a.id,
          name: a.file_name || a.name || 'Arquivo',
          type: a.file_type || a.type || 'file',
          size: a.file_size ? formatFileSize(a.file_size) : (a.size || ''),
          url: a.file_url || a.url || '',
          file_name: a.file_name,
          file_type: a.file_type,
          file_size: a.file_size,
          file_url: a.file_url,
        })),
        correctiveActions: data.corrective_actions || [],
        actions: data.corrective_actions || [],
        timeline: (data.activity_log || []).map((e: any) => ({
          event: e.descricao || e.acao || '',
          user: e.alterado_por_nome || e.alterado_por || '',
          date: e.created_at ? new Date(e.created_at).toLocaleString('pt-BR') : '',
          icon: e.acao || '',
        })),
        activity: (data.activity_log || []).map((e: any) => ({
          event: e.descricao || e.acao || '',
          user: e.alterado_por_nome || e.alterado_por || '',
          date: e.created_at ? new Date(e.created_at).toLocaleString('pt-BR') : '',
          icon: e.acao || '',
        })),
      };
      setComplaint(complaintData);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao carregar reclamação";
      setError(msg);
      showToast({ type: "error", message: msg });
    } finally {
      setLoading(false);
    }
  }, [id, showToast]);

  useEffect(() => {
    fetchComplaint();
  }, [fetchComplaint]);

  // Add comment
  const handleAddComment = useCallback(async () => {
    if (!comment.trim() || !id) return;
    setSubmittingComment(true);
    try {
      const res = await fetch(`/api/nps/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conteudo: comment }),
      });
      if (!res.ok) throw new Error("Erro ao adicionar comentário");
      setComment("");
      showToast({ type: "success", message: "Comentário adicionado com sucesso." });
      await fetchComplaint(); // Refresh data
    } catch {
      showToast({ type: "error", message: "Erro ao adicionar comentário." });
    } finally {
      setSubmittingComment(false);
    }
  }, [comment, id, showToast, fetchComplaint]);

  // Upload file
  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length || !id) return;
    setUploadingFile(true);
    try {
      for (const file of Array.from(e.target.files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch(`/api/nps/${id}/attachments`, {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Upload failed");
      }
      showToast({ type: "success", message: "Arquivo enviado com sucesso." });
      await fetchComplaint();
    } catch {
      showToast({ type: "error", message: "Erro ao enviar arquivo." });
    } finally {
      setUploadingFile(false);
      if (e.target) e.target.value = "";
    }
  }, [id, showToast, fetchComplaint]);

  // Delete attachment
  const handleDeleteAttachment = useCallback(async (attachmentId: string) => {
    if (!confirm("Tem certeza que deseja excluir este anexo?")) return;
    try {
      const res = await fetch(`/api/nps/${id}/attachments?attachment_id=${attachmentId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir anexo");
      showToast({ type: "success", message: "Anexo excluído com sucesso." });
      await fetchComplaint();
    } catch {
      showToast({ type: "error", message: "Erro ao excluir anexo." });
    }
  }, [id, showToast, fetchComplaint]);

  // Download attachment (fetch as blob to force download instead of browser preview)
  const handleDownloadAttachment = useCallback(async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      showToast({ type: "error", message: "Erro ao baixar anexo." });
    }
  }, [showToast]);

  // Change status
  const handleStatusChange = useCallback(async (newStatus: string) => {
    if (!id) return;
    try {
      const res = await fetch(`/api/nps/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Erro ao alterar status");
      showToast({ type: "success", message: "Status atualizado com sucesso." });
      await fetchComplaint();
    } catch {
      showToast({ type: "error", message: "Erro ao alterar status." });
    }
  }, [id, showToast, fetchComplaint]);

  // Toggle corrective action
  const handleToggleAction = useCallback(async (actionId: string | number, currentStatus: string) => {
    if (!id) return;
    setUpdatingAction(String(actionId));
    try {
      const newStatus = currentStatus === "concluida" || currentStatus === "completed" ? "em_andamento" : "concluida";
      const res = await fetch(`/api/nps/${id}/actions`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actionId, status: newStatus }),
      });
      if (!res.ok) throw new Error("Erro ao atualizar ação");
      showToast({ type: "success", message: "Ação atualizada com sucesso." });
      await fetchComplaint();
    } catch {
      showToast({ type: "error", message: "Erro ao atualizar ação corretiva." });
    } finally {
      setUpdatingAction(null);
    }
  }, [id, showToast, fetchComplaint]);

  // Delete complaint
  const handleDelete = useCallback(async () => {
    if (!id) return;
    if (!confirm("Tem certeza que deseja excluir esta reclamação? Esta ação não pode ser desfeita.")) {
      return;
    }
    try {
      const res = await fetch(`/api/nps/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao excluir reclamação");
      showToast({ type: "success", message: "Reclamação excluída com sucesso." });
      window.location.href = "/complaints";
    } catch {
      showToast({ type: "error", message: "Erro ao excluir reclamação." });
    }
  }, [id, showToast]);

  // Loading state
  if (loading) {
    return <LoadingPage message={t("common.loading") || "Carregando..."} />;
  }

  // Error state
  if (error || !complaint) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <AlertCircle className="h-12 w-12 text-red-400 mb-4" />
        <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
          {error || "Reclamação não encontrada"}
        </p>
        <div className="flex gap-3">
          <button
            onClick={fetchComplaint}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white"
            style={{ backgroundColor: ABB_RED }}
          >
            <RefreshCw className="h-4 w-4" />
            {t("common.tryAgain") || "Tentar novamente"}
          </button>
          <Link
            href="/complaints"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar à lista
          </Link>
        </div>
      </div>
    );
  }

  // Derived data with fallbacks
  const status = complaint.status || "aberto";
  const StatusIcon = statusConfig[status]?.icon || AlertCircle;
  const evidences = complaint.evidences || complaint.attachments || [];
  const correctiveActions = complaint.correctiveActions || complaint.actions || [];
  const comments = complaint.comments || [];
  const timeline = complaint.timeline || complaint.activity || [];
  const npsScore = complaint.npsScore || 0;
  const slaDays = complaint.slaDays || 15;
  const slaRemaining = complaint.slaRemaining ?? 0;
  const slaPercent = slaDays > 0
    ? Math.min(100, Math.max(0, ((slaDays - slaRemaining) / slaDays) * 100))
    : 100;
  const complaintTitle = complaint.subject || complaint.title || complaint.id;
  const customer = complaint.customer || { name: "", contact: "", email: "", phone: "" };
  const displayCode = complaint.codigo || complaint.id;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3 sm:gap-4">
          <Link
            href="/complaints"
            className="mt-1 rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                {displayCode}
              </h1>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusConfig[status]?.bg} ${statusConfig[status]?.color}`}>
                <StatusIcon className="h-3.5 w-3.5" />
                {statusLabels[status] || status}
              </span>
              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${priorityConfig[complaint.priority]?.bg} ${priorityConfig[complaint.priority]?.color}`}>
                {t(`complaints.priorities.${complaint.priority}`) || complaint.priority}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {customer.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 ml-12 sm:ml-0">
          {/* Status change dropdown */}
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <option value="aberto">Aberto</option>
            <option value="em_analise">Em Análise</option>
            <option value="em_andamento">Em Andamento</option>
            <option value="em_atendimento">Em Atendimento</option>
            <option value="resolvido">Resolvido</option>
            <option value="escalonado">Escalonado</option>
            <option value="fechado">Fechado</option>
            <option value="cancelado">Cancelado</option>
          </select>
          {/* Delete button */}
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
          >
            <AlertCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Excluir</span>
          </button>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Client Info */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-5 w-5 text-[#FF000F]" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{t("complaints.fields.customerName")}</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Empresa</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</span>
            </div>
            {complaint.project && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Projeto</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{complaint.project}</span>
              </div>
            )}
            {complaint.order && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Pedido</span>
                <span className="text-sm font-mono font-medium text-gray-900 dark:text-white">{complaint.order}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Contato</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{customer.contact}</span>
            </div>
            {customer.email && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">E-mail</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{customer.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Classification */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-[#FF000F]" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{t("complaints.fields.category")}</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{t("complaints.fields.category")}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{t(`complaints.categories.${complaint.category}`) || complaint.category}</span>
            </div>
            {complaint.department && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">{t("complaints.fields.department")}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{complaint.department}</span>
              </div>
            )}
            {complaint.responsible && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">{t("complaints.fields.assignedTo")}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{complaint.responsible.name}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{t("complaints.fields.source")}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{t(`complaints.sources.${complaint.source}`) || complaint.source}</span>
            </div>
          </div>
        </div>

        {/* SLA */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-[#FF000F]" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">SLA</h3>
          </div>
          <div className="space-y-3">
            {complaint.slaDays && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Prazo</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{complaint.slaDays} dias</span>
              </div>
            )}
            {complaint.slaDeadline && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Data Limite</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{complaint.slaDeadline}</span>
              </div>
            )}
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">Progresso</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {slaRemaining > 0 ? `${slaRemaining} dias restantes` : "Vencido"}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${slaPercent}%`,
                    backgroundColor: slaRemaining <= 3 ? "#FF000F" : "#22c55e",
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{t("complaints.fields.npsScore")}</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                  <div
                    key={star}
                    className={`h-3 w-3 rounded-full ${star <= npsScore ? "bg-[#FF000F]" : "bg-gray-200 dark:bg-gray-700"}`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{npsScore}/10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-[#FF000F]" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Datas</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{t("complaints.fields.createdAt")}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{complaint.createdAt || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{t("complaints.fields.occurrenceDate") || "Data Ocorrência"}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{complaint.occurrenceDate || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{t("complaints.fields.resolutionDate") || "Resolução"}</span>
              <span className="text-sm text-gray-500 dark:text-gray-500 italic">
                {(status === "resolvido" || status === "resolvida" || status === "fechado" || status === "fechada") ? (complaint as ComplaintData & { resolutionDate?: string }).resolutionDate || "—" : "Pendente"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="h-5 w-5 text-[#FF000F]" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{t("complaints.fields.description")}</h3>
        </div>
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {complaint.description}
        </p>
        {complaint.impact && (
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Impacto</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {complaint.impact}
            </p>
          </div>
        )}
      </div>

      {/* Evidences / Attachments */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Paperclip className="h-5 w-5 text-[#FF000F]" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{t("complaints.fields.attachments")} ({evidences.length})</h3>
          </div>
          <label className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors cursor-pointer">
            <Upload className="h-3.5 w-3.5" />
            {uploadingFile ? "Enviando..." : "Adicionar"}
            <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploadingFile} />
          </label>
        </div>
        {evidences.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">Nenhum anexo registrado.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {evidences.map((ev, idx) => {
              const fileType = (ev.type || ev.file_type || 'file') as string;
              const fileIcon = fileType === 'foto' || fileType === 'image' ? Image
                : fileType === 'video' ? Film
                : fileType === 'pdf' ? FileText
                : FileText;
              const FileIcon = fileIcon;
              const fileUrl = ev.url || ev.file_url || '';

              return (
                <div
                  key={ev.id || idx}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
                >
                  <button
                    onClick={() => handleDownloadAttachment(fileUrl, ev.name)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    title="Baixar anexo"
                  >
                    <FileIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => handleDownloadAttachment(fileUrl, ev.name)}
                      className="text-sm font-medium text-gray-900 dark:text-white hover:underline truncate block text-left"
                    >
                      {ev.name}
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {ev.size} • {fileType.toUpperCase()}
                    </p>
                  </div>
                  {ev.id && (
                    <div className="flex items-center gap-1">
                      {fileUrl && (
                        <button
                          onClick={() => handleDownloadAttachment(fileUrl, ev.name)}
                          className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                          title="Baixar anexo"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteAttachment(ev.id!)}
                        className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title="Excluir anexo"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Corrective Actions */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-[#FF000F]" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{t("complaints.actions.title")} ({correctiveActions.length})</h3>
          </div>
        </div>
        {correctiveActions.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">Nenhuma ação corretiva registrada.</p>
        ) : (
          <div className="space-y-3">
            {correctiveActions.map((action) => {
              const isCompleted = action.status === "concluida" || action.status === "completed";
              const isUpdating = updatingAction === String(action.id);
              return (
                <div
                  key={action.id}
                  className="flex items-start gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                >
                  <button
                    onClick={() => handleToggleAction(action.id, action.status)}
                    disabled={isUpdating}
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${isCompleted ? "bg-green-100 dark:bg-green-900/30" : "bg-blue-100 dark:bg-blue-900/30"} ${isUpdating ? "opacity-50" : "hover:opacity-80"}`}
                  >
                    {isUpdating ? (
                      <RefreshCw className="h-3 w-3 animate-spin text-gray-500" />
                    ) : isCompleted ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{action.description}</p>
                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>Resp: {action.responsible}</span>
                      <span>Prazo: {action.deadline}</span>
                      {action.completedAt && <span>Concluída: {action.completedAt}</span>}
                    </div>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${isCompleted ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"}`}>
                    {actionStatusLabels[action.status] || action.status}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Linked NC */}
      {complaint.linkedNC && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-2 mb-4">
            <Link2 className="h-5 w-5 text-[#FF000F]" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">NC Vinculada</h3>
          </div>
          <Link
            href={`/nc/${complaint.linkedNC.id}`}
            className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{complaint.linkedNC.id}</p>
                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                  {complaint.linkedNC.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{complaint.linkedNC.title}</p>
            </div>
            <ExternalLink className="h-4 w-4 text-gray-400" />
          </Link>
        </div>
      )}

      {/* Comments + Timeline */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Comments - 2 cols */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-[#FF000F]" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{t("complaints.fields.comments")} ({comments.length})</h3>
          </div>

          <div className="space-y-4 mb-4">
            {comments.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">Nenhum comentário ainda.</p>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{c.author}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{c.date}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{c.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add comment */}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF000F] text-xs font-bold text-white">
                EU
              </div>
              <div className="flex-1">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t("complaints.actions.add_comment_placeholder") || "Escreva um comentário..."}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#FF000F] focus:outline-none focus:ring-2 focus:ring-[#FF000F]/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 resize-none"
                  rows={2}
                  disabled={submittingComment}
                />
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={handleAddComment}
                    disabled={submittingComment || !comment.trim()}
                    className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: ABB_RED }}
                  >
                    {submittingComment ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline - 1 col */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-2 mb-4">
            <CircleDot className="h-5 w-5 text-[#FF000F]" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Histórico</h3>
          </div>
          {timeline.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">Nenhum evento registrado.</p>
          ) : (
            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
              <div className="space-y-4">
                {timeline.map((event, idx) => (
                  <div key={idx} className="relative flex gap-3 pl-6">
                    <div className={`absolute left-1.5 top-1.5 h-3 w-3 rounded-full border-2 ${idx === 0 ? "bg-[#FF000F] border-[#FF000F]" : "bg-white border-gray-300 dark:bg-gray-900 dark:border-gray-600"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-white">{event.event}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{event.user} • {event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
