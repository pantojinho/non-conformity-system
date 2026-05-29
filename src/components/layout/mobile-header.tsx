"use client";

import { Menu, Sun, Moon, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { Bot } from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useTranslations } from "@/i18n";

export function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
  const t = useTranslations();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkDark = () => document.documentElement.classList.contains("dark");
    setIsDark(checkDark());
    const observer = new MutationObserver(() => setIsDark(checkDark()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("touchstart", onClickOutside as unknown as EventListener);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("touchstart", onClickOutside as unknown as EventListener);
    };
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 dark:bg-[#1A1A2E] dark:border-white/10">
      <div className="flex items-center justify-between px-3 py-2.5">
        {/* Left: hamburger + logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 -ml-1 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-1.5">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#FF000F]">
              <Bot className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-base font-bold text-gray-900 dark:text-white">
              <span className="text-[#FF000F]">ABB</span>{" "}
              <span className="hidden sm:inline">Robotics Hub</span>
            </span>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1">
          <LanguageSwitcher />

          {/* Theme toggle */}
          <button
            onClick={() => {
              const root = document.documentElement;
              const newDark = !root.classList.contains("dark");
              if (newDark) {
                root.classList.add("dark");
                localStorage.setItem("theme", "dark");
              } else {
                root.classList.remove("dark");
                localStorage.setItem("theme", "light");
              }
            }}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
            title={isDark ? t("header.lightMode") : t("header.darkMode")}
          >
            {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>

          {/* User menu */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10 transition-colors"
            >
              <div className="h-7 w-7 rounded-full bg-[#FF000F] flex items-center justify-center text-white text-xs font-bold">
                G
              </div>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl border border-gray-200 bg-white py-1 shadow-xl dark:border-white/10 dark:bg-[#1A1A2E] z-50">
                {/* User info */}
                <div className="px-4 py-3 border-b border-gray-100 dark:border-white/10">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Gabriel Ciandrini</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">gabriel.ciandrini@br.abb.com</p>
                </div>

                <button
                  onClick={() => { setMenuOpen(false); router.push("/settings/profile"); }}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5 transition-colors"
                >
                  <User className="h-4 w-4" />
                  {t("nav.profile")}
                </button>
                <button
                  onClick={() => { setMenuOpen(false); router.push("/settings/preferences"); }}
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
    </header>
  );
}
