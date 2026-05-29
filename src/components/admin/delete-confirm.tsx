"use client";

import { useState } from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { useTranslations } from "@/i18n";
import type { UserTableRow } from "./user-form-modal";

interface DeleteConfirmProps {
  user: UserTableRow;
  onClose: () => void;
  onSuccess: () => void;
}

export function DeleteConfirm({ user, onClose, onSuccess }: DeleteConfirmProps) {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? t("admin.loadUsersError"));
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : t("admin.loadUsersError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl bg-white shadow-2xl dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("admin.deactivateUser")}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </div>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {t("admin.deactivateConfirm")}{" "}
            <span className="font-semibold text-gray-900 dark:text-white">{user.name}</span>{" "}
            ({user.email})?
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {t("admin.deactivateDesc")}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {t("common.cancel")}
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-[#FF000F] px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("admin.deactivate")}
          </button>
        </div>
      </div>
    </div>
  );
}
