"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { UserFormModal, type UserTableRow, type Role, type Organization } from "@/components/admin/user-form-modal";
import { DeleteConfirm } from "@/components/admin/delete-confirm";
import { useTranslations } from "@/i18n";

export default function UsersPage() {
  const t = useTranslations();
  const [users, setUsers] = useState<UserTableRow[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserTableRow | null>(null);
  const [deletingUser, setDeletingUser] = useState<UserTableRow | null>(null);

  // Filter
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const ROLE_CONFIG: Record<string, { label: string; bg: string; text: string; dot: string }> = {
    super_admin: { label: t("roles.super_admin"), bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-700 dark:text-purple-300", dot: "bg-purple-500" },
    admin:       { label: t("roles.admin"),       bg: "bg-red-100 dark:bg-red-900/30",       text: "text-red-700 dark:text-red-300",       dot: "bg-red-500" },
    diretor:     { label: t("roles.diretor"),     bg: "bg-amber-100 dark:bg-amber-900/30",   text: "text-amber-700 dark:text-amber-300",   dot: "bg-amber-500" },
    gestor:      { label: t("roles.gestor"),      bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-700 dark:text-orange-300", dot: "bg-orange-500" },
    qualidade_hse: { label: t("roles.qualidade_hse"), bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-700 dark:text-emerald-300", dot: "bg-emerald-500" },
    resolvedor:  { label: t("roles.resolvedor"),  bg: "bg-blue-100 dark:bg-blue-900/30",     text: "text-blue-700 dark:text-blue-300",     dot: "bg-blue-500" },
    auditor:     { label: t("roles.auditor"),     bg: "bg-cyan-100 dark:bg-cyan-900/30",     text: "text-cyan-700 dark:text-cyan-300",     dot: "bg-cyan-500" },
    usuario:     { label: t("roles.usuario"),     bg: "bg-gray-100 dark:bg-gray-800",        text: "text-gray-600 dark:text-gray-400",     dot: "bg-gray-400" },
  };

  function RoleBadge({ roleName }: { roleName: string }) {
    const config = ROLE_CONFIG[roleName] ?? ROLE_CONFIG.usuario;
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${config.bg} ${config.text}`}>
        <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${config.dot}`} />
        {config.label}
      </span>
    );
  }

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? t("admin.loadDataError"));
      }

      setUsers(data.users ?? []);
      setRoles(data.roles ?? []);
      setOrganizations(data.organizations ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("admin.loadUsersError"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      !search ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = !roleFilter || user.role_id === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center dark:bg-red-950/30">
        <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
        <button
          onClick={fetchData}
          className="mt-3 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900/70"
        >
          {t("common.tryAgain")}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("admin.userManagement")}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {users.length} {t("admin.registeredUsers")}
          </p>
        </div>
        <button
          onClick={() => {
            setEditingUser(null);
            setShowFormModal(true);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors sm:px-6 sm:py-3"
        >
          <Plus className="h-4 w-4" />
          {t("admin.newUser")}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("admin.searchPlaceholder")}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
          />
        </div>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full sm:w-auto rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-10 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="">{t("admin.allProfiles")}</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Grid */}
      <div className="space-y-3 sm:space-y-4">
        {filteredUsers.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
            <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {users.length === 0
                ? t("admin.noUsersRegistered")
                : t("admin.noUsersFiltered")}
            </p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                {/* Avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg font-bold sm:h-10 sm:w-10 sm:text-sm">
                  {user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-2">
                    <div className="truncate text-base font-semibold text-gray-900 dark:text-white sm:text-sm">
                      {user.name}
                    </div>
                    <RoleBadge roleName={user.role_name} />
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3 sm:text-xs">
                    <span className="truncate text-gray-600 dark:text-gray-400">{user.email}</span>
                    {user.unit && (
                      <>
                        <span className="hidden sm:inline text-gray-500">•</span>
                        <span className="text-gray-500 dark:text-gray-500">{user.unit}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Status + Actions */}
                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    user.is_active
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                  }`}>
                    <span className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
                      user.is_active ? "bg-green-500" : "bg-gray-400"
                    }`} />
                    {user.is_active ? t("common.active") : t("common.inactive")}
                  </span>
                  <button
                    onClick={() => {
                      setEditingUser(user);
                      setShowFormModal(true);
                    }}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600 transition-colors dark:hover:bg-gray-800 dark:hover:text-blue-400"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setDeletingUser(user)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600 transition-colors dark:hover:bg-gray-800 dark:hover:text-red-400"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      {showFormModal && (
        <UserFormModal
          user={editingUser}
          roles={roles}
          organizations={organizations}
          onClose={() => {
            setShowFormModal(false);
            setEditingUser(null);
          }}
          onSuccess={() => {
            setShowFormModal(false);
            setEditingUser(null);
            fetchData();
          }}
        />
      )}

      {deletingUser && (
        <DeleteConfirm
          user={deletingUser}
          onClose={() => setDeletingUser(null)}
          onSuccess={() => {
            setDeletingUser(null);
            fetchData();
          }}
        />
      )}
    </div>
  );
}
