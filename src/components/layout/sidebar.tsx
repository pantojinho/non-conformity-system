"use client";

import { useState, useEffect, useMemo } from "react";
import { DesktopSidebar } from "./desktop-sidebar";
import { MobileSidebar } from "./mobile-sidebar";
import { usePathname } from "next/navigation";
import { Bell, User } from "lucide-react";

const PAGE_TITLES: [string, string][] = [
  ["/nc", "Não Conformidades"],
  ["/hazards", "Perigos & Riscos"],
  ["/complaints", "NPS & Reclamações"],
  ["/documents", "Documentos"],
  ["/audits", "Auditorias"],
  ["/admin", "Administração"],
  ["/pending", "Pendências"],
];

function getTitle(pathname: string): string {
  if (pathname === "/dashboard") return "Dashboard";
  for (const [prefix, title] of PAGE_TITLES) {
    if (pathname.startsWith(prefix)) return title;
  }
  return "Robotics Hub";
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileTitle, setMobileTitle] = useState("Dashboard");
  const pathname = usePathname();

  useEffect(() => {
    setMobileTitle(getTitle(pathname));
  }, [pathname]);

  return (
    <>
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Mobile Sidebar drawer */}
      <MobileSidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Mobile Header bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
              aria-label="Abrir menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {mobileTitle}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
