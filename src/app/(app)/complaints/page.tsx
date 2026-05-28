import { MessageSquareWarning, Plus } from "lucide-react";
import Link from "next/link";

export default function ComplaintsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquareWarning className="h-6 w-6" style={{ color: "var(--primary)" }} />
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            NPS & Reclamações
          </h1>
        </div>
        <Link
          href="/complaints/new"
          className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white"
          style={{ background: "var(--primary)" }}
        >
          <Plus className="h-4 w-4" />
          Nova Reclamação
        </Link>
      </div>

      <div
        className="rounded-lg border p-8 text-center"
        style={{ background: "var(--background)", borderColor: "var(--border)" }}
      >
        <p style={{ color: "var(--muted-foreground)" }}>
          Nenhuma reclamação registrada. Clique em &quot;Nova Reclamação&quot; para começar.
        </p>
      </div>
    </div>
  );
}
