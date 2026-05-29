"use client";

import { ClipboardCheck, Plus } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "@/i18n";

export default function AuditsPage() {
  const t = useTranslations();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ClipboardCheck className="h-6 w-6" style={{ color: "#8b5cf6" }} />
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            {t("audits.title")}
          </h1>
        </div>
        <Link
          href="/audits/new"
          className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white"
          style={{ background: "var(--primary)" }}
        >
          <Plus className="h-4 w-4" />
          {t("audits.newAudit")}
        </Link>
      </div>

      <div
        className="rounded-lg border p-8 text-center"
        style={{ background: "var(--background)", borderColor: "var(--border)" }}
      >
        <p style={{ color: "var(--muted-foreground)" }}>
          {t("audits.empty")}
        </p>
      </div>
    </div>
  );
}
