"use client";

import { useState, useEffect, useRef } from "react";
import { DesktopSidebar } from "./desktop-sidebar";
import { MobileSidebar } from "./mobile-sidebar";
import { usePathname } from "next/navigation";
import { Sun, Moon, LogOut, User, Settings, ChevronDown } from "lucide-react";
import { useTranslations } from "@/i18n";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

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
  const t = useTranslations();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileTitle, setMobileTitle] = useState("Dashboard");
  const [isDark, setIsDark] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMobileTitle(getTitle(pathname));
  }, [pathname]);

  useEffect(() => {
    const checkDark = () => document.documentElement.classList.contains("dark");
    setIsDark(checkDark());
    const observer = new MutationObserver(() => setIsDark(checkDark()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent | TouchEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("touchstart", onClickOutside);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("touchstart", onClickOutside);
    };
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  function toggleTheme() {
    const root = document.documentElement;
    const newDark = !root.classList.contains("dark");
    if (newDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Mobile Sidebar drawer */}
      <MobileSidebar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Mobile Header bar */}
      <div className="lg:hidden shrink-0 z-40 bg-white dark:bg-[#1A1A2E] border-b border-gray-200 dark:border-white/10">
        <div className="flex items-center justify-between px-3 py-2.5">
          {/* Left: hamburger + title */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-lg p-2 -ml-1 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
              aria-label="Abrir menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {mobileTitle}
            </span>
          </div>

          {/* Right: theme toggle + user menu */}
          <div className="flex items-center gap-1">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
              title={isDark ? t("header.lightMode") : t("header.darkMode")}
            >
              {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* User avatar dropdown */}
            <div ref={userMenuRef} className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 transition-colors"
              >
                <div className="h-7 w-7 rounded-full bg-[#FF000F] flex items-center justify-center text-white text-xs font-bold">
                  G
                </div>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-200 bg-white py-1 shadow-xl dark:border-white/10 dark:bg-[#1A1A2E] z-50">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-white/10">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Gabriel Ciandrini</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">gabriel.ciandrini@br.abb.com</p>
                  </div>

                  <button
                    onClick={() => { setUserMenuOpen(false); router.push("/settings/profile"); }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    {t("nav.profile")}
                  </button>
                  <button
                    onClick={() => { setUserMenuOpen(false); router.push("/settings/preferences"); }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5 transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    {t("nav.settings")}
                  </button>
                  <div className="my-1 border-t border-gray-100 dark:border-white/10" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("common.logout")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
