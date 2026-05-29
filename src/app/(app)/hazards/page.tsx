"use client";

import { ShieldAlert, Plus } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "@/i18n";

export default function HazardsPage() {
  const t = useTranslations();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldAlert className="h-6 w-6" style={{ color: "var(--warning)" }} />
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            {t("hazards.title")}
          </h1>
        </div>
        <Link
          href="/hazards/new"
          className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white"
          style={{ background: "var(--primary)" }}
        >
          <Plus className="h-4 w-4" />
          {t("hazards.newHazard")}
        </Link>
      </div>

      <div
        className="rounded-lg border p-8 text-center"
        style={{ background: "var(--background)", borderColor: "var(--border)" }}
      >
        <p style={{ color: "var(--muted-foreground)" }}>
          {t("hazards.empty")}
        </p>
      </div>
    </div>
  );
}
