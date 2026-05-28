"use client";

import { FileWarning, Plus, AlertTriangle, Clock, CheckCircle2, Search, Filter } from "lucide-react";
import Link from "next/link";

export default function NCPage() {
  const statusCounts = {
    aberta: 3,
    em_analise: 2,
    em_andamento: 5,
    finalizada: 12,
  };

  const statusColors = {
    aberta: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    em_analise: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    em_andamento: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    finalizada: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };

  const statusIcons = {
    aberta: AlertTriangle,
    em_analise: Clock,
    em_andamento: FileWarning,
    finalizada: CheckCircle2,
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 sm:items-center sm:gap-4">
          <div className="rounded-lg bg-red-100 p-2 sm:p-3 dark:bg-red-900/30">
            <FileWarning className="h-6 w-6 text-red-600 dark:text-red-400 sm:h-8 sm:w-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Não Conformidades
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:text-base">
              {Object.values(statusCounts).reduce((a, b) => a + b, 0)} não conformidades
            </p>
          </div>
        </div>
        <Link
          href="/nc/new"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors sm:px-6 sm:py-3"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nova NC
        </Link>
      </div>

      {/* Status Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Object.entries(statusCounts).map(([status, count]) => {
          const Icon = statusIcons[status as keyof typeof statusIcons];
          return (
            <div key={status} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center gap-2">
                <div className={`rounded-lg p-2 ${statusColors[status as keyof typeof statusColors]}`}>
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">{count}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{status}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por descrição, ID..."
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
          />
        </div>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <select className="w-full sm:w-auto rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-10 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white">
            <option value="">Todos os status</option>
            <option value="aberta">Aberta</option>
            <option value="em_analise">Em análise</option>
            <option value="em_andamento">Em andamento</option>
            <option value="finalizada">Finalizada</option>
          </select>
        </div>
      </div>

      {/* NC Cards */}
      <div className="space-y-3 sm:space-y-4">
        {/* Demo NC cards - replace with real data */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
              <FileWarning className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    NC-2024-001: Falha na calibração do robô
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Calibração do robô de solda fora das especificações...
                  </p>
                </div>
                <span className="inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                  Aberta
                </span>
              </div>
              <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3 sm:text-xs">
                <span className="text-gray-500 dark:text-gray-500">Criada em 28/05/2024</span>
                <span className="text-gray-500 dark:text-gray-500">•</span>
                <span className="text-gray-500 dark:text-gray-500">Unidade de Manutenção</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <FileWarning className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    NC-2024-002: Problema no sistema de segurança
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Sistema de proteção desabilitado por engano...
                  </p>
                </div>
                <span className="inline-flex shrink-0 rounded-full px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  Em andamento
                </span>
              </div>
              <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3 sm:text-xs">
                <span className="text-gray-500 dark:text-gray-500">Criada em 27/05/2024</span>
                <span className="text-gray-500 dark:text-gray-500">•</span>
                <span className="text-gray-500 dark:text-gray-500">Segurança Industrial</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}