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

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const pathname = usePathname();

  // Check if any admin sub-item is active
  const isAdminActive = pathname.startsWith("/admin");

  // Auto-open admin section if on an admin page
  const shouldShowAdminSubItems = adminOpen || isAdminActive;

  return (
    <aside
      className={cn(
        "flex h-full flex-col transition-all duration-200",
        collapsed ? "w-16" : "w-64"
      )}
      style={{ background: "var(--sidebar-bg)" }}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && (
          <span
            className="text-lg font-bold"
            style={{ color: "var(--sidebar-text)" }}
          >
            Robotics Hub
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-md p-1.5 hover:opacity-80"
          style={{ color: "var(--sidebar-text)" }}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-white/10" : "hover:bg-white/5"
              )}
              style={{ color: "var(--sidebar-text)" }}
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
                "flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isAdminActive ? "bg-white/10" : "hover:bg-white/5"
              )}
              style={{ color: "var(--sidebar-text)" }}
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
              <div className="ml-4 space-y-1 border-l border-white/10 pl-3">
                {adminSubItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-white/15 text-white"
                          : "text-white/60 hover:bg-white/5 hover:text-white/80"
                      )}
                      style={{ color: "var(--sidebar-text)" }}
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
              "flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isAdminActive ? "bg-white/10" : "hover:bg-white/5"
            )}
            style={{ color: "var(--sidebar-text)" }}
            title="Administração"
          >
            <Settings className="h-5 w-5 shrink-0" />
          </Link>
        )}
      </nav>
    </aside>
  );
}
