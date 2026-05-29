"use client";

import { MessageCircle, Plus, Search, Filter, TrendingUp, Hash, Clock, CheckCircle2, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "@/i18n";

const ABB_RED = "#FF000F";

interface Complaint {
  id: string;
  title: string;
  description: string;
  customer: string;
  department: string;
  date: string;
  status: "aberta" | "em_analise" | "em_andamento" | "resolvida";
  npsScore: number;
  channel: string;
}

const mockComplaints: Complaint[] = [
  {
    id: "CMP-001",
    title: "Atraso na entrega do robô IRB 6700",
    description: "Cliente relatou atraso de 15 dias na entrega do robô industrial contratado para linha de solda.",
    customer: "Toyota do Brasil",
    department: "Vendas & Logística",
    date: "28/05/2026",
    status: "aberta",
    npsScore: 3,
    channel: "E-mail",
  },
  {
    id: "CMP-002",
    title: "Defeito no painel de controle OmniCore",
    description: "Painel apresentou falha intermitente após 30 dias de operação. Cliente solicita troca imediata.",
    customer: "Volkswagen Caminhões",
    department: "Suporte Técnico",
    date: "26/05/2026",
    status: "em_andamento",
    npsScore: 4,
    channel: "Telefone",
  },
  {
    id: "CMP-003",
    title: "Treinamento insuficiente para equipe de manutenção",
    description: "Equipe do cliente não se sentiu preparada após o treinamento padrão. Solicitam treinamento complementar.",
    customer: "Embraer",
    department: "Treinamento",
    date: "24/05/2026",
    status: "em_analise",
    npsScore: 6,
    channel: "Pesquisa NPS",
  },
  {
    id: "CMP-004",
    title: "Peça de reposição com compatibilidade incorreta",
    description: "Peça enviada não é compatível com o modelo IRB 4600 série B. Necessário envio urgente da peça correta.",
    customer: "Gerdau",
    department: "Pós-Venda",
    date: "22/05/2026",
    status: "resolvida",
    npsScore: 7,
    channel: "Portal",
  },
  {
    id: "CMP-005",
    title: "Documentação técnica incompleta",
    description: "Manual do operador enviado não contempla funcionalidades do firmware atualizado v4.2.",
    customer: "Petrobras",
    department: "Documentação Técnica",
    date: "20/05/2026",
    status: "resolvida",
    npsScore: 8,
    channel: "E-mail",
  },
  {
    id: "CMP-006",
    title: "Tempo de resposta do suporte acima do SLA",
    description: "Chamado de emergência levou 48h para primeira resposta, quando o SLA é de 24h.",
    customer: "Suzano Papel",
    department: "Suporte Técnico",
    date: "18/05/2026",
    status: "resolvida",
    npsScore: 5,
    channel: "Telefone",
  },
];

const statusConfig: Record<string, {
  label: string;
  color: string;
  bgColor: string;
  darkBgColor: string;
  textColor: string;
  darkTextColor: string;
  icon: typeof Clock;
}> = {
  aberta: {
    label: "Aberta",
    color: "red",
    bgColor: "bg-red-100",
    darkBgColor: "dark:bg-red-900/30",
    textColor: "text-red-700",
    darkTextColor: "dark:text-red-400",
    icon: MessageCircle,
  },
  em_analise: {
    label: "Em Análise",
    color: "yellow",
    bgColor: "bg-yellow-100",
    darkBgColor: "dark:bg-yellow-900/30",
    textColor: "text-yellow-700",
    darkTextColor: "dark:text-yellow-400",
    icon: Clock,
  },
  em_andamento: {
    label: "Em Andamento",
    color: "blue",
    bgColor: "bg-blue-100",
    darkBgColor: "dark:bg-blue-900/30",
    textColor: "text-blue-700",
    darkTextColor: "dark:text-blue-400",
    icon: TrendingUp,
  },
  resolvida: {
    label: "Resolvida",
    color: "green",
    bgColor: "bg-green-100",
    darkBgColor: "dark:bg-green-900/30",
    textColor: "text-green-700",
    darkTextColor: "dark:text-green-400",
    icon: CheckCircle2,
  },
};

const channelIcons: Record<string, string> = {
  "E-mail": "📧",
  Telefone: "📞",
  "Pesquisa NPS": "📊",
  Portal: "🌐",
};

export default function ComplaintsPage() {
  const t = useTranslations();

  const kpis = [
    {
      label: "NPS Score",
      value: "94%",
      subtitle: "+3 vs mês anterior",
      icon: Star,
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
      trend: "up" as const,
    },
    {
      label: "Total Reclamações",
      value: "8",
      subtitle: "este mês",
      icon: Hash,
      iconBg: "bg-red-100 dark:bg-red-900/30",
      iconColor: "text-red-600 dark:text-red-400",
      trend: "neutral" as const,
    },
    {
      label: "SLA Cumprido",
      value: "87%",
      subtitle: "meta: 90%",
      icon: Clock,
      iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      trend: "down" as const,
    },
    {
      label: "Resolvidas",
      value: "5",
      subtitle: "de 8 total",
      icon: CheckCircle2,
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
      trend: "up" as const,
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 sm:items-center sm:gap-4">
          <div
            className="rounded-lg p-2 sm:p-3"
            style={{ backgroundColor: "rgba(255, 0, 15, 0.1)" }}
          >
            <MessageCircle
              className="h-6 w-6 sm:h-8 sm:w-8"
              style={{ color: ABB_RED }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              {t("nav.complaints")}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:text-base">
              {mockComplaints.length} reclamações registradas
            </p>
          </div>
        </div>
        <Link
          href="/complaints/new"
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors sm:px-6 sm:py-3"
          style={{ backgroundColor: ABB_RED }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#CC000C")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = ABB_RED)}
        >
          <Plus className="h-4 w-4" />
          Nova Reclamação
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center gap-2">
                <div className={`rounded-lg p-2 ${kpi.iconBg}`}>
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${kpi.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {kpi.value}
                  </div>
                  <div className="truncate text-xs text-gray-500 dark:text-gray-400">
                    {kpi.label}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1">
                {kpi.trend === "up" && (
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">
                    ↑ {kpi.subtitle}
                  </span>
                )}
                {kpi.trend === "down" && (
                  <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
                    ↓ {kpi.subtitle}
                  </span>
                )}
                {kpi.trend === "neutral" && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {kpi.subtitle}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar reclamações..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-10 pr-4 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
          />
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-10 pr-10 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:w-auto">
              <option value="">Todos os Status</option>
              <option value="aberta">Aberta</option>
              <option value="em_analise">Em Análise</option>
              <option value="em_andamento">Em Andamento</option>
              <option value="resolvida">Resolvida</option>
            </select>
          </div>
          <div className="relative">
            <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:w-auto">
              <option value="">Todos os Canais</option>
              <option value="email">E-mail</option>
              <option value="telefone">Telefone</option>
              <option value="nps">Pesquisa NPS</option>
              <option value="portal">Portal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Complaint Cards */}
      <div className="space-y-3 sm:space-y-4">
        {mockComplaints.map((complaint) => {
          const config = statusConfig[complaint.status];
          const StatusIcon = config.icon;
          return (
            <Link
              key={complaint.id}
              href={`/complaints/${complaint.id}`}
              className="group block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-red-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-red-900/50"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                {/* Avatar */}
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(255, 0, 15, 0.1)" }}
                >
                  <MessageCircle className="h-6 w-6" style={{ color: ABB_RED }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-base font-semibold text-gray-900 dark:text-white">
                          {complaint.title}
                        </h3>
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                        {complaint.description}
                      </p>
                    </div>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.bgColor} ${config.textColor} ${config.darkBgColor} ${config.darkTextColor}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {config.label}
                    </span>
                  </div>

                  {/* Meta info */}
                  <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3 sm:text-xs">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {complaint.id}
                    </span>
                    <span className="hidden text-gray-400 dark:text-gray-600 sm:inline">•</span>
                    <span className="text-gray-500 dark:text-gray-500">
                      {complaint.customer}
                    </span>
                    <span className="hidden text-gray-400 dark:text-gray-600 sm:inline">•</span>
                    <span className="text-gray-500 dark:text-gray-500">
                      {complaint.department}
                    </span>
                    <span className="hidden text-gray-400 dark:text-gray-600 sm:inline">•</span>
                    <span className="text-gray-500 dark:text-gray-500">
                      {complaint.date}
                    </span>
                    <span className="hidden text-gray-400 dark:text-gray-600 sm:inline">•</span>
                    <span className="flex items-center gap-1 text-gray-500 dark:text-gray-500">
                      {channelIcons[complaint.channel] || "💬"} {complaint.channel}
                    </span>
                  </div>

                  {/* NPS Score bar */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">NPS:</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 10 }, (_, i) => (
                        <div
                          key={i}
                          className={`h-2 w-2 rounded-full ${
                            i < complaint.npsScore
                              ? complaint.npsScore >= 9
                                ? "bg-green-500"
                                : complaint.npsScore >= 7
                                  ? "bg-yellow-400"
                                  : complaint.npsScore >= 5
                                    ? "bg-orange-400"
                                    : "bg-red-500"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {complaint.npsScore}/10
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <ArrowRight className="hidden h-5 w-5 shrink-0 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-red-500 dark:text-gray-600 dark:group-hover:text-red-400 sm:block" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer info */}
      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900/50">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Exibindo {mockComplaints.length} de {mockComplaints.length} reclamações
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Última atualização: 29/05/2026
        </p>
      </div>
    </div>
  );
}
