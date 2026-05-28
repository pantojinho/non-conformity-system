"use client";

import { Settings } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const adminItems = [
    {
      title: "Usuários",
      description: "Gerenciar usuários e permissões de acesso",
      href: "/admin/users",
      icon: Settings,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      title: "Processos",
      description: "Configurar processos da organização",
      href: "/admin/processes",
      icon: Settings,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    },
    {
      title: "Normas",
      description: "Gerenciar normas e regulamentos",
      href: "/admin/norms",
      icon: Settings,
      color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      title: "Unidades",
      description: "Unidades de negócio",
      href: "/admin/business",
      icon: Settings,
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
    },
    {
      title: "Status",
      description: "Configurar fluxos de status",
      href: "/admin/status",
      icon: Settings,
      color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 sm:items-center sm:gap-4">
        <div className="rounded-lg bg-blue-100 p-2 sm:p-3 dark:bg-blue-900/30">
          <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400 sm:h-8 sm:w-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Administração
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 sm:text-base">
            Configurações e configurações do sistema
          </p>
        </div>
      </div>

      {/* Admin Items Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adminItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="relative">
              <div className={`mb-4 inline-flex rounded-xl p-3 ${item.color}`}>
                <item.icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white sm:text-xl">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}