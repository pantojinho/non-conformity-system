"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileWarning,
  AlertTriangle,
  MessageSquareWarning,
  CheckCircle2,
  FileText,
  ClipboardCheck,
  TrendingUp,
  Clock,
  Loader2,
} from "lucide-react";
import { useTranslations } from "@/i18n";

interface NpsRecord {
  id: string;
  codigo: string;
  cliente: string;
  descricao: string;
  categoria: string;
  status: string;
  nota_nps: number;
  days_remaining: number | null;
  sla_status: "within" | "at_risk" | "overdue";
  created_at: string;
  assunto?: string;
  projeto?: string;
  departamento?: string;
  [key: string]: unknown;
}

interface DashboardData {
  totalComplaints: number;
  npsAvg: string;
  slaCompliance: string;
  openCount: number;
  recentRecords: NpsRecord[];
}

export default function DashboardPage() {
  const t = useTranslations();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const res = await fetch("/api/nps?limit=1000");
        if (!res.ok) throw new Error("Erro ao buscar dados");
        const json = await res.json();
        const records: NpsRecord[] = json.data || [];

        // Total de reclamações
        const totalComplaints = records.length;

        // NPS médio — nota_nps geralmente 0-10, converter para %
        const npsSum = records.reduce((acc, r) => acc + (r.nota_nps || 0), 0);
        const npsAvg =
          totalComplaints > 0
            ? `${Math.round((npsSum / totalComplaints) * 10)}%`
            : "0%";

        // SLA cumprido — % com days_remaining > 0 ou já finalizados (status não aberto/em_andamento)
        const withSla = records.filter(
          (r) => r.days_remaining !== null && r.days_remaining !== undefined
        );
        const slaCompliant = withSla.filter(
          (r) => (r.days_remaining as number) > 0
        ).length;
        const slaCompliance =
          withSla.length > 0
            ? `${Math.round((slaCompliant / withSla.length) * 100)}%`
            : "—";

        // Em aberto
        const openCount = records.filter(
          (r) => r.status === "aberto" || r.status === "em_andamento"
        ).length;

        // Últimos 5 registros reais
        const recentRecords = records.slice(0, 5);

        setData({
          totalComplaints,
          npsAvg,
          slaCompliance,
          openCount,
          recentRecords,
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Erro ao carregar dados do dashboard");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const stats = [
    {
      title: t("dashboard.nc"),
      value: data ? String(data.totalComplaints) : "—",
      change: t("dashboard.thisWeek"),
      changeType: "neutral" as const,
      href: "/nc",
      icon: FileWarning,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-950/30",
      iconColor: "text-red-600 dark:text-red-400",
    },
    {
      title: t("dashboard.hazards"),
      value: "—",
      change: t("dashboard.thisWeek"),
      changeType: "neutral" as const,
      href: "/hazards",
      icon: AlertTriangle,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
    {
      title: t("dashboard.nps"),
      value: data ? data.npsAvg : "—",
      change: t("dashboard.pts"),
      changeType: "up" as const,
      href: "/complaints",
      icon: MessageSquareWarning,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "SLA Cumprido",
      value: data ? data.slaCompliance : "—",
      change: t("dashboard.thisWeek"),
      changeType: "up" as const,
      href: "/complaints",
      icon: CheckCircle2,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Em Aberto",
      value: data ? String(data.openCount) : "—",
      change: t("dashboard.thisWeek"),
      changeType: data && data.openCount > 0 ? "up" : ("neutral" as const),
      href: "/complaints",
      icon: ClipboardCheck,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  function formatDate(isoDate: string): string {
    try {
      const d = new Date(isoDate);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const hour = String(d.getHours()).padStart(2, "0");
      const min = String(d.getMinutes()).padStart(2, "0");
      return `${day}/${month} às ${hour}:${min}`;
    } catch {
      return isoDate;
    }
  }

  function getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      aberto: "Aberto",
      em_andamento: "Em andamento",
      concluido: "Concluído",
      finalizada: "Finalizada",
      resolvido: "Resolvido",
      fechado: "Fechado",
    };
    return map[status] || status;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Carregando dados…
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-2">
          <p className="text-red-500 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-blue-500 hover:underline"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2 sm:space-y-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          {t("dashboard.welcome")}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {t("dashboard.subtitle")}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <Link
            key={stat.href + stat.title}
            href={stat.href}
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 transition-opacity group-hover:opacity-5`}
            />
            <div className="relative">
              <div
                className={`mb-3 inline-flex rounded-lg p-3 ${stat.bgColor}`}
              >
                <stat.icon
                  className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.iconColor}`}
                />
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                {stat.value}
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                {stat.changeType !== "neutral" && (
                  <TrendingUp
                    className={`h-3 w-3 ${
                      stat.changeType === "up"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  />
                )}
                <span>{stat.change}</span>
              </div>
              <div className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Link
          href="/nc/new"
          className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-blue-500 hover:bg-blue-50/50 transition-colors dark:border-gray-700 dark:hover:bg-blue-950/20"
        >
          <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
            <svg
              className="h-6 w-6 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <div className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("dashboard.newNC")}
          </div>
        </Link>

        <Link
          href="/hazards/new"
          className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-orange-500 hover:bg-orange-50/50 transition-colors dark:border-gray-700 dark:hover:bg-orange-950/20"
        >
          <div className="rounded-full bg-orange-100 p-3 dark:bg-orange-900/30">
            <svg
              className="h-6 w-6 text-orange-600 dark:text-orange-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("dashboard.newHazard")}
          </div>
        </Link>

        <Link
          href="/complaints/new"
          className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-blue-500 hover:bg-blue-50/50 transition-colors dark:border-gray-700 dark:hover:bg-blue-950/20"
        >
          <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
            <svg
              className="h-6 w-6 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <div className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("dashboard.newComplaint")}
          </div>
        </Link>

        <Link
          href="/documents"
          className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 hover:border-green-500 hover:bg-green-50/50 transition-colors dark:border-gray-700 dark:hover:bg-green-950/20"
        >
          <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
            <svg
              className="h-6 w-6 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("nav.documents")}
          </div>
        </Link>
      </div>

      {/* Recent Activity — real data */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t("dashboard.recentActivity")}
          </h2>
        </div>
        <div className="space-y-3">
          {data && data.recentRecords.length > 0 ? (
            data.recentRecords.map((record) => (
              <Link
                key={record.id}
                href={`/complaints/${record.id}`}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div
                  className={`rounded-full p-2 ${
                    record.status === "aberto" ||
                    record.status === "em_andamento"
                      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  }`}
                >
                  <MessageSquareWarning className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {record.codigo} — {record.cliente}
                  </div>
                  <div className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 truncate">
                    {record.descricao || record.assunto || record.categoria}
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                    <Clock className="h-3 w-3" />
                    {formatDate(record.created_at)}
                  </div>
                </div>
                <span
                  className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${
                    record.status === "aberto" ||
                    record.status === "em_andamento"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : record.status === "concluido" ||
                        record.status === "resolvido" ||
                        record.status === "finalizada"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}
                >
                  {getStatusLabel(record.status)}
                </span>
              </Link>
            ))
          ) : (
            <div className="text-center py-6 text-sm text-gray-400">
              Nenhum registro encontrado
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
