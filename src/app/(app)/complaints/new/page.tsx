"use client";

import { useTranslations } from "@/i18n";

export default function NewComplaintPage() {
  const t = useTranslations();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{t("pages.complaintNew")}</h1>
      <p className="mt-2 text-gray-500">{t("common.underConstruction")}</p>
    </div>
  );
}
