"use client";

import { useState } from "react";
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
} from "lucide-react";
import { useTranslations } from "@/i18n";

const ABB_RED = "#FF000F";

// Mock data for NPS-000001
const complaint = {
  id: "NPS-000001",
  status: "em_atendimento" as const,
  priority: "high" as const,
  category: "product_quality",
  source: "email",
  customer: {
    name: "Toyota do Brasil",
    contact: "Carlos Hayashi",
    email: "c.hayashi@toyota.com.br",
    phone: "+55 15 99876-5432",
  },
  project: "Linha de Pintura P3 — Expansão",
  order: "PO-2024-0892",
  responsible: {
    name: "Carlos Mendes",
    role: "Gerente de Vendas",
    avatar: "CM",
  },
  department: "Vendas & Logística",
  subject: "Atraso na entrega do robô IRB 6700 — Linha de Pintura",
  description:
    "O cliente Toyota do Brasil registrou reclamação formal referente ao atraso de 15 dias corridos na entrega do robô IRB 6700-200/2.60 contratado para a nova linha de pintura P3. O cronograma original previa entrega em 15/05/2026, com instalação prevista para 20/05/2026. O atraso impactou diretamente o comissionamento da célula e o start-up da produção, gerando perdas estimadas em R$ 180.000,00 por dia de parada. O cliente solicitou explicação formal e plano de contingência.",
  impact:
    "Atraso de 15 dias na entrega. Impacto estimado de R$ 2.700.000,00 em perdas de produção. Start-up da célula P3 comprometido. Risco de penalidade contratual.",
  npsScore: 3,
  createdAt: "01/06/2026",
  occurrenceDate: "28/05/2026",
  slaDays: 15,
  slaDeadline: "15/06/2026",
  slaRemaining: 5,
  evidences: [
    { name: "foto_celula_p3.jpg", type: "foto", size: "2.4 MB" },
    { name: "cronograma_original.pdf", type: "pdf", size: "1.1 MB" },
    { name: "video_inspecao.mp4", type: "video", size: "18.7 MB" },
  ],
  correctiveActions: [
    {
      id: 1,
      description: "Enviar robô substituto IRB 6700 do estope de Sorocaba",
      responsible: "Roberto Silva",
      status: "concluida",
      deadline: "05/06/2026",
      completedAt: "04/06/2026",
    },
    {
      id: 2,
      description: "Agendar equipe de instalação para 10/06/2026",
      responsible: "André Costa",
      status: "em_andamento",
      deadline: "08/06/2026",
      completedAt: null,
    },
  ],
  linkedNC: {
    id: "NC-000047",
    title: "Atraso entrega IRB 6700 — Toyota",
    status: "em_acao_imediata",
    risk: "alto",
  },
  comments: [
    {
      id: 1,
      author: "Gabriel Ciandrini",
      avatar: "GC",
      content:
        "Reclamação registrada após contato com o cliente. Toyota solicitou prioridade máxima no atendimento.",
      date: "01/06/2026 14:32",
    },
    {
      id: 2,
      author: "Carlos Mendes",
      avatar: "CM",
      content:
        "Robô substituto enviado do estoque de Sorocaba. Previsão de chegada: 04/06. Equipe de instalação sendo mobilizada.",
      date: "02/06/2026 09:15",
    },
    {
      id: 3,
      author: "Roberto Silva",
      avatar: "RS",
      content:
        "Robô chegou na Toyota. Agendamento de instalação confirmado para 10/06. Testes de comissionamento previstos para 12/06.",
      date: "04/06/2026 16:45",
    },
  ],
  timeline: [
    { event: "Reclamação registrada", user: "Gabriel Ciandrini", date: "01/06/2026 14:32", icon: "create" },
    { event: "Atribuída a Carlos Mendes", user: "Sistema", date: "01/06/2026 14:33", icon: "assign" },
    { event: "Status: Em Atendimento", user: "Carlos Mendes", date: "02/06/2026 09:10", icon: "status" },
    { event: "NC vinculada: NC-000047", user: "Carlos Mendes", date: "02/06/2026 09:12", icon: "link" },
    { event: "Comentário adicionado", user: "Carlos Mendes", date: "02/06/2026 09:15", icon: "comment" },
    { event: "Ação corretiva concluída", user: "Roberto Silva", date: "04/06/2026 16:45", icon: "check" },
    { event: "Comentário adicionado", user: "Roberto Silva", date: "04/06/2026 16:45", icon: "comment" },
  ],
};

const statusConfig: Record<string, { color: string; bg: string; icon: typeof MessageCircle }> = {
  aberta: { color: "text-red-700 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/30", icon: AlertCircle },
  em_atendimento: { color: "text-blue-700 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-900/30", icon: Clock },
  em_analise: { color: "text-yellow-700 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/30", icon: Clock },
  resolvida: { color: "text-green-700 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30", icon: CheckCircle2 },
  escalonada: { color: "text-orange-700 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-900/30", icon: AlertTriangle },
  fechada: { color: "text-gray-700 dark:text-gray-400", bg: "bg-gray-100 dark:bg-gray-800", icon: CheckCircle2 },
};

const priorityConfig: Record<string, { color: string; bg: string }> = {
  low: { color: "text-gray-700 dark:text-gray-300", bg: "bg-gray-100 dark:bg-gray-800" },
  medium: { color: "text-yellow-700 dark:text-yellow-400", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
  high: { color: "text-orange-700 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-900/30" },
  critical: { color: "text-red-700 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/30" },
};

export default function ComplaintDetailPage() {
  const t = useTranslations();
  const [comment, setComment] = useState("");

  const StatusIcon = statusConfig[complaint.status]?.icon || AlertCircle;
  const slaPercent = Math.max(0, ((complaint.slaDays - complaint.slaRemaining) / complaint.slaDays) * 100);

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
                {complaint.id}
              </h1>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusConfig[complaint.status]?.bg} ${statusConfig[complaint.status]?.color}`}>
                <StatusIcon className="h-3.5 w-3.5" />
                {t("complaints.statuses.in_progress")}
              </span>
              <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${priorityConfig[complaint.priority]?.bg} ${priorityConfig[complaint.priority]?.color}`}>
                {t("complaints.priorities.high")}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {complaint.subject}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 ml-12 sm:ml-0">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
            <Edit className="h-4 w-4" />
            <span className="hidden sm:inline">{t("complaints.actions.edit")}</span>
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors" style={{ backgroundColor: ABB_RED }}>
            <AlertCircle className="h-4 w-4" />
            <span className="hidden sm:inline">{t("complaints.actions.escalate")}</span>
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
              <span className="text-sm font-medium text-gray-900 dark:text-white">{complaint.customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Projeto</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{complaint.project}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Pedido</span>
              <span className="text-sm font-mono font-medium text-gray-900 dark:text-white">{complaint.order}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Contato</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{complaint.customer.contact}</span>
            </div>
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
              <span className="text-sm font-medium text-gray-900 dark:text-white">{t("complaints.categories.product_quality")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{t("complaints.fields.department")}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{complaint.department}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{t("complaints.fields.assignedTo")}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{complaint.responsible.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{t("complaints.fields.source")}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{t("complaints.sources.email")}</span>
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
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Prazo</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{complaint.slaDays} dias</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Data Limite</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{complaint.slaDeadline}</span>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">Progresso</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {complaint.slaRemaining > 0 ? `${complaint.slaRemaining} dias restantes` : "Vencido"}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: `${slaPercent}%`,
                    backgroundColor: complaint.slaRemaining <= 3 ? "#FF000F" : "#22c55e",
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{t("complaints.fields.npsScore")}</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div
                    key={star}
                    className={`h-3 w-3 rounded-full ${star <= complaint.npsScore ? "bg-[#FF000F]" : "bg-gray-200 dark:bg-gray-700"}`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">{complaint.npsScore}/5</span>
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
              <span className="text-sm font-medium text-gray-900 dark:text-white">{complaint.createdAt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{t("complaints.fields.occurrenceDate") || "Data Ocorrência"}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{complaint.occurrenceDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{t("complaints.fields.resolutionDate") || "Resolução"}</span>
              <span className="text-sm text-gray-500 dark:text-gray-500 italic">Pendente</span>
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
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Impacto</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
            {complaint.impact}
          </p>
        </div>
      </div>

      {/* Evidences */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-2 mb-4">
          <Paperclip className="h-5 w-5 text-[#FF000F]" />
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{t("complaints.fields.attachments")} ({complaint.evidences.length})</h3>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {complaint.evidences.map((ev, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
                {ev.type === "foto" && <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />}
                {ev.type === "pdf" && <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                {ev.type === "video" && <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{ev.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{ev.size} • {ev.type.toUpperCase()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Corrective Actions */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-[#FF000F]" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{t("complaints.actions.title")} ({complaint.correctiveActions.length})</h3>
          </div>
        </div>
        <div className="space-y-3">
          {complaint.correctiveActions.map((action) => (
            <div
              key={action.id}
              className="flex items-start gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700"
            >
              <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${action.status === "concluida" ? "bg-green-100 dark:bg-green-900/30" : "bg-blue-100 dark:bg-blue-900/30"}`}>
                {action.status === "concluida" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : (
                  <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{action.description}</p>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                  <span>Resp: {action.responsible}</span>
                  <span>Prazo: {action.deadline}</span>
                  {action.completedAt && <span>Concluída: {action.completedAt}</span>}
                </div>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${action.status === "concluida" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"}`}>
                {action.status === "concluida" ? "Concluída" : "Em andamento"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Linked NC */}
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

      {/* Comments + Timeline */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Comments - 2 cols */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="h-5 w-5 text-[#FF000F]" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{t("complaints.fields.comments")} ({complaint.comments.length})</h3>
          </div>

          <div className="space-y-4 mb-4">
            {complaint.comments.map((c) => (
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
            ))}
          </div>

          {/* Add comment */}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FF000F] text-xs font-bold text-white">
                GC
              </div>
              <div className="flex-1">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t("complaints.actions.add_comment_placeholder") || "Escreva um comentário..."}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#FF000F] focus:outline-none focus:ring-2 focus:ring-[#FF000F]/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 resize-none"
                  rows={2}
                />
                <div className="mt-2 flex justify-end">
                  <button className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors" style={{ backgroundColor: ABB_RED }}>
                    <Send className="h-4 w-4" />
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
          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
            <div className="space-y-4">
              {complaint.timeline.map((event, idx) => (
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
        </div>
      </div>
    </div>
  );
}
