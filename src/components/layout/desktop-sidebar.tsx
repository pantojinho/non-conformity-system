"use client";

import { useState, useEffect } from "react";
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
  Cog,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/i18n";

export function DesktopSidebar() {
  const t = useTranslations();
  const [collapsed, setCollapsed] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const isAdminActive = pathname.startsWith("/admin");
  const shouldShowAdminSubItems = adminOpen || isAdminActive;

  const navItems = [
    { href: "/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard },
    { href: "/nc", label: t("nav.nc"), icon: FileWarning },
    { href: "/hazards", label: t("nav.hazards"), icon: ShieldAlert },
    { href: "/complaints", label: t("nav.complaints"), icon: MessageSquareWarning },
    { href: "/documents", label: t("nav.documents"), icon: FileText },
    { href: "/audits", label: t("nav.audits"), icon: ClipboardCheck },
  ];

  const adminSubItems = [
    { href: "/admin/users", label: t("nav.users"), icon: Users },
  ];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setVisible(mq.matches);
    const handler = (e: MediaQueryListEvent) => setVisible(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!visible) return null;

  return (
    <aside
      className={cn(
        "h-full flex-col transition-all duration-300 border-r border-white/10 relative",
        collapsed ? "w-20" : "w-64",
        "bg-[#1A1A2E]"
      )}
      style={{ display: "flex" }}
    >
      {/* Logo — ABB branding */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-[#FF000F]">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-extrabold leading-tight text-white">ABB</span>
              <span className="text-[10px] font-medium leading-tight text-gray-400">Robotics Hub</span>
            </div>
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded bg-[#FF000F]">
            <Bot className="h-5 w-5 text-white" />
          </div>
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
                  ? "bg-[#FF000F] text-white shadow-lg shadow-[#FF000F]/25"
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
                  ? "bg-[#FF000F]/20 text-rose-400"
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <Settings className="h-5 w-5 shrink-0" />
                <span>{t("nav.admin")}</span>
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
                          ? "bg-[#FF000F] text-white shadow-lg shadow-[#FF000F]/25"
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
                ? "bg-[#FF000F] text-white shadow-lg shadow-[#FF000F]/25"
                : "text-gray-300 hover:bg-white/5 hover:text-white"
            )}
            title={t("nav.admin")}
          >
            <Settings className="h-5 w-5 shrink-0" />
          </Link>
        )}

        {/* Configurações */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              pathname.startsWith("/settings")
                ? "bg-[#FF000F] text-white shadow-lg shadow-[#FF000F]/25"
                : "text-gray-300 hover:bg-white/5 hover:text-white"
            )}
            title={collapsed ? t("nav.settings") : undefined}
          >
            <Cog className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{t("nav.settings")}</span>}
          </Link>
        </div>
      </nav>

      {/* ABB red bottom line */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF000F]" />
    </aside>
  );
}
