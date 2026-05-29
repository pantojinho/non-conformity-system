"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Shield, Settings } from "lucide-react";

const settingsTabs = [
  {
    label: "Perfil",
    href: "/settings/profile",
    icon: User,
  },
  {
    label: "Segurança",
    href: "/settings/security",
    icon: Shield,
  },
  {
    label: "Preferências",
    href: "/settings/preferences",
    icon: Settings,
  },
];

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Configurações
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Gerencie sua conta e preferências
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar tabs — vertical on md+, horizontal scroll on mobile */}
        <nav className="flex md:flex-col gap-1 md:w-52 flex-shrink-0 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 md:border-r md:border-gray-200 md:dark:border-gray-700 md:pr-4">
          {settingsTabs.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                )}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                {tab.label}
              </Link>
            );
          })}
        </nav>

        {/* Content area */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
