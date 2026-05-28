"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Erro ao carregar dados");
      }

      setUsers(data.users ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
          Tentar novamente
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
            Gerenciamento de Usuários
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {users.length} usuário{users.length !== 1 ? "s" : ""} cadastrado
            {users.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors sm:px-6 sm:py-3">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Usuário
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
            placeholder="Buscar por nome ou email..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
          />
        </div>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <select className="w-full sm:w-auto rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-10 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
            <option value="">Todos os perfis</option>
          </select>
        </div>
      </div>

      {/* Users Grid */}
      <div className="space-y-3 sm:space-y-4">
        {users.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
            <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {users.length === 0
                ? "Nenhum usuário cadastrado."
                : "Nenhum usuário encontrado com os filtros aplicados."}
            </p>
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                {/* Avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg font-bold sm:h-10 sm:w-10 sm:text-sm">
                  {user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                    <div className="truncate text-base font-semibold text-gray-900 dark:text-white sm:text-sm">
                      {user.name}
                    </div>
                    {user.unit && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">
                        {user.unit}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3 sm:text-xs">
                    <span className="truncate text-gray-600 dark:text-gray-400">{user.email}</span>
                    {user.unit && (
                      <span className="hidden sm:inline text-gray-500 dark:text-gray-500">•</span>
                    )}
                    {user.unit && (
                      <span className="hidden sm:inline text-gray-500 dark:text-gray-500">{user.unit}</span>
                    )}
                  </div>
                </div>

                {/* Role & Actions */}
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <div className="flex items-center gap-2">
                    <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600 transition-colors dark:hover:bg-gray-800 dark:hover:text-blue-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-red-600 transition-colors dark:hover:bg-gray-800 dark:hover:text-red-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Info - visible on tap/click */}
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800 sm:hidden">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500 dark:text-gray-500">Organização:</span>
                    <span className="ml-1 text-gray-900 dark:text-white">{user.organization_name}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-500">País:</span>
                    <span className="ml-1 text-gray-900 dark:text-white">{user.country}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-500">Status:</span>
                    <span className={`ml-1 inline-flex items-center rounded-full px-1.5 py-0.5 ${
                      user.is_active ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    }`}>
                      <span className={`mr-1 h-1 w-1 rounded-full ${user.is_active ? "bg-green-500" : "bg-gray-400"}`} />
                      {user.is_active ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}