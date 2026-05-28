"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileWarning,
  ShieldAlert,
  MessageSquareWarning,
  FileText,
  ClipboardCheck,
  Settings,
  ChevronLeft,
  ChevronRight,
  Users,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/nc", label: "Não Conformidades", icon: FileWarning },
  { href: "/hazards", label: "Perigos & Riscos", icon: ShieldAlert },
  { href: "/complaints", label: "NPS & Reclamações", icon: MessageSquareWarning },
  { href: "/documents", label: "Documentos", icon: FileText },
  { href: "/audits", label: "Auditorias", icon: ClipboardCheck },
];

const adminSubItems = [
  { href: "/admin/users", label: "Usuários", icon: Users },
];

export function DesktopSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const pathname = usePathname();
  const isAdminActive = pathname.startsWith("/admin");
  const shouldShowAdminSubItems = adminOpen || isAdminActive;

  return (
    <aside
      className={cn(
        "hidden lg:flex h-full flex-col transition-all duration-300 border-r",
        collapsed ? "w-20" : "w-64",
        "bg-gradient-to-b from-slate-900 to-slate-950"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
        {!collapsed && (
          <span className="text-lg font-bold text-white">Robotics Hub</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}

        {/* Admin section */}
        {!collapsed ? (
          <>
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all mt-4",
                isAdminActive
                  ? "bg-blue-600/20 text-blue-400"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 shrink-0" />
                <span>Administração</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  shouldShowAdminSubItems && "rotate-180"
                )}
              />
            </button>
            {shouldShowAdminSubItems && (
              <div className="ml-4 space-y-1 pl-3 border-l border-white/10 mt-2">
                {adminSubItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                        isActive
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <Link
            href="/admin/users"
            className={cn(
              "flex items-center justify-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all mt-4",
              isAdminActive
                ? "bg-blue-600 text-white shadow-lg"
                : "text-gray-300 hover:bg-white/5 hover:text-white"
            )}
            title="Administração"
          >
            <Settings className="h-5 w-5 shrink-0" />
          </Link>
        )}
      </nav>
    </aside>
  );
}