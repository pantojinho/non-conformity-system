import {
  LayoutDashboard,
  FileWarning,
  ShieldAlert,
  MessageSquareWarning,
  FileText,
  ClipboardCheck,
  Settings,
} from "lucide-react";
import Link from "next/link";

const modules = [
  {
    title: "Não Conformidades",
    description: "Gestão de não conformidades e ações corretivas",
    href: "/nc",
    icon: FileWarning,
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50 dark:bg-red-950/30",
  },
  {
    title: "Perigos & Riscos",
    description: "Identificação e avaliação de perigos",
    href: "/hazards",
    icon: ShieldAlert,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
  },
  {
    title: "NPS & Reclamações",
    description: "Pesquisa de satisfação e reclamações",
    href: "/complaints",
    icon: MessageSquareWarning,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    title: "Documentos",
    description: "Gestão documental e normas",
    href: "/documents",
    icon: FileText,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/30",
  },
  {
    title: "Auditorias",
    description: "Planejamento e execução de auditorias",
    href: "/audits",
    icon: ClipboardCheck,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950/30",
  },
  {
    title: "Administração",
    description: "Usuários, processos e configurações",
    href: "/admin",
    icon: Settings,
    color: "from-slate-500 to-slate-600",
    bgColor: "bg-slate-50 dark:bg-slate-950/30",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Bem-vindo ao Robotics Hub
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          Plataforma de governança corporativa
        </p>
      </div>

      {/* Stats Cards - Add these if you want quick KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
          <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">NCs Abertas</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">8</div>
          <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">Ações Pendentes</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">94%</div>
          <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">NPS Médio</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">24</div>
          <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">Documentos</div>
        </div>
      </div>

      {/* Module Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => (
          <Link
            key={mod.href}
            href={mod.href}
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${mod.color} opacity-0 transition-opacity group-hover:opacity-5`} />
            <div className={`relative`}>
              <div className={`mb-4 inline-flex rounded-lg ${mod.bgColor} p-3`}>
                <mod.icon className={`h-6 w-6 bg-gradient-to-br ${mod.color} bg-clip-text text-transparent`} />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                {mod.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {mod.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}