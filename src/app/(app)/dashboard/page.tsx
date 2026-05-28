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
    color: "var(--destructive)",
  },
  {
    title: "Perigos & Riscos",
    description: "Identificação e avaliação de perigos",
    href: "/hazards",
    icon: ShieldAlert,
    color: "var(--warning)",
  },
  {
    title: "NPS & Reclamações",
    description: "Pesquisa de satisfação e reclamações",
    href: "/complaints",
    icon: MessageSquareWarning,
    color: "var(--primary)",
  },
  {
    title: "Documentos",
    description: "Gestão documental e normas",
    href: "/documents",
    icon: FileText,
    color: "var(--success)",
  },
  {
    title: "Auditorias",
    description: "Planejamento e execução de auditorias",
    href: "/audits",
    icon: ClipboardCheck,
    color: "#8b5cf6",
  },
  {
    title: "Administração",
    description: "Usuários, processos e configurações",
    href: "/admin",
    icon: Settings,
    color: "var(--muted-foreground)",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          Bem-vindo ao Robotics Hub
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
          Plataforma de governança corporativa
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => (
          <Link
            key={mod.href}
            href={mod.href}
            className="block rounded-lg border p-6 transition-shadow hover:shadow-md"
            style={{
              background: "var(--background)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center gap-3">
              <mod.icon className="h-6 w-6" style={{ color: mod.color }} />
              <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>
                {mod.title}
              </h2>
            </div>
            <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
              {mod.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
