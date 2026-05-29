"use client";

import { FileText, Plus } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "@/i18n";

export default function DocumentsPage() {
  const t = useTranslations();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-6 w-6" style={{ color: "var(--success)" }} />
          <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            {t("documents.title")}
          </h1>
        </div>
        <Link
          href="/documents/new"
          className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white"
          style={{ background: "var(--primary)" }}
        >
          <Plus className="h-4 w-4" />
          {t("documents.newDocument")}
        </Link>
      </div>

      <div
        className="rounded-lg border p-8 text-center"
        style={{ background: "var(--background)", borderColor: "var(--border)" }}
      >
        <p style={{ color: "var(--muted-foreground)" }}>
          {t("documents.empty")}
        </p>
      </div>
    </div>
  );
}
