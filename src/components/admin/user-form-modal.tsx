"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useTranslations } from "@/i18n";

export interface Role {
  id: string;
  name: string;
}

export interface Organization {
  id: string;
  name: string;
}

export interface UserTableRow {
  id: string;
  email: string;
  name: string;
  role_id: string;
  role_name: string;
  organization_id: string;
  organization_name: string;
  country: string;
  unit: string | null;
  is_active: boolean;
  created_at: string;
}

interface UserFormModalProps {
  user: UserTableRow | null;
  roles: Role[];
  organizations: Organization[];
  onClose: () => void;
  onSuccess: () => void;
}

export function UserFormModal({
  user,
  roles,
  organizations,
  onClose,
  onSuccess,
}: UserFormModalProps) {
  const t = useTranslations();
  const isEditing = !!user;

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState(user?.role_id ?? "");
  const [organizationId, setOrganizationId] = useState(
    user?.organization_id ?? ""
  );
  const [country, setCountry] = useState(user?.country ?? "brasil");
  const [unit, setUnit] = useState(user?.unit ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isEditing) {
        const body: Record<string, unknown> = {
          name,
          role_id: roleId,
          organization_id: organizationId,
          country,
          unit,
        };
        if (password) body.password = password;

        const res = await fetch(`/api/admin/users/${user!.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error ?? t("admin.loadUsersError"));
        }
      } else {
        if (!password) {
          throw new Error(t("admin.passwordRequired"));
        }

        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            name,
            role_id: roleId,
            organization_id: organizationId,
            country,
            unit,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error ?? t("admin.loadUsersError"));
        }
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
      <div className="w-full max-w-lg rounded-xl bg-white shadow-2xl dark:bg-gray-900 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {isEditing ? t("admin.editUser") : t("admin.createUser")}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("admin.nameLabel")} *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
              placeholder={t("admin.nameLabel")}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("admin.emailLabel")} *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isEditing}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
              placeholder="email@exemplo.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {isEditing ? t("admin.newPasswordOptional") : `${t("admin.passwordLabel")} *`}
            </label>
            <input
              type="password"
              required={!isEditing}
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
              placeholder={t("admin.passwordMin")}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("admin.profileLabel")} *
            </label>
            <select
              required
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="">{t("admin.selectProfile")}</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("admin.orgLabel")} *
            </label>
            <select
              required
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="">{t("admin.selectOrg")}</option>
              {organizations.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("admin.countryLabel")}
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="brasil">🇧🇷 Brasil</option>
              <option value="argentina">🇦🇷 Argentina</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("admin.unitLabel")}
            </label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              placeholder={t("admin.unitPlaceholder")}
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {t("common.cancel")}
          </button>
          <button
            onClick={(e) => {
              const form = (e.target as HTMLButtonElement).closest("form");
              if (form) form.requestSubmit();
            }}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-[#FF000F] px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isEditing ? t("admin.saveChanges") : t("admin.createUser")}
          </button>
        </div>
      </div>
    </div>
  );
}
