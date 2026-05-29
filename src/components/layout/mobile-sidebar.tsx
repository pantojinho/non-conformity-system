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
  X,
  ChevronDown,
  Users,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/i18n";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const t = useTranslations();
  const [adminOpen, setAdminOpen] = useState(false);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop - click to close */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <div
        className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-[#1A1A2E] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-full flex-col relative">
          {/* Header — ABB branding */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-[#FF000F]">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold leading-tight text-white">ABB</span>
                <span className="text-[10px] font-medium leading-tight text-gray-400">Robotics Hub</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                      isActive
                        ? "bg-[#FF000F] text-white shadow-lg shadow-[#FF000F]/25"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Admin section */}
              <div className="pt-4 mt-4 border-t border-white/10">
                <button
                  onClick={() => setAdminOpen(!adminOpen)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
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
                  <div className="mt-2 space-y-1 pl-4">
                    {adminSubItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
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
              </div>
            </div>
          </nav>

          {/* ABB red bottom line */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF000F]" />
        </div>
      </div>
    </div>
  );
}
