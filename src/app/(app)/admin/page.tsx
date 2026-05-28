import { Settings } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="h-6 w-6" style={{ color: "var(--muted-foreground)" }} />
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          Administração
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Usuários", description: "Gerenciar usuários e permissões", href: "/admin/users" },
          { title: "Processos", description: "Configurar processos da organização", href: "/admin/processes" },
          { title: "Normas", description: "Gerenciar normas e regulamentos", href: "/admin/norms" },
          { title: "Unidades", description: "Unidades de negócio", href: "/admin/business" },
          { title: "Status", description: "Configurar fluxos de status", href: "/admin/status" },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block rounded-lg border p-6 transition-shadow hover:shadow-md"
            style={{ background: "var(--background)", borderColor: "var(--border)" }}
          >
            <h2 className="font-semibold" style={{ color: "var(--foreground)" }}>
              {item.title}
            </h2>
            <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
              {item.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
