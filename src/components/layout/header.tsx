"use client";

import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { LogOut, User, Settings, ChevronDown, Sun, Moon } from "lucide-react";
import { useTranslations } from "@/i18n";

export function Header() {
  const t = useTranslations();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check initial theme state
    const checkDark = () => document.documentElement.classList.contains("dark");
    setIsDark(checkDark());

    // Watch for class changes on <html>
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
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="hidden lg:flex h-16 items-center justify-between px-6 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-[#1A1A2E]">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          <span className="text-[#FF000F] font-extrabold">ABB</span>{" "}
          <span>Robotics Hub</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="search"
            placeholder={t("common.search")}
            className="w-64 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-[#FF000F] focus:ring-2 focus:ring-[#FF000F]/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-gray-400"
          />
        </div>

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
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white transition-colors">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* User menu with dropdown */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10 transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-[#FF000F] flex items-center justify-center text-white text-sm font-bold">
              G
            </div>
            <span>Gabriel</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-xl dark:border-white/10 dark:bg-[#1A1A2E] z-50">
              <button
                onClick={() => { setMenuOpen(false); router.push("/settings/profile"); }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5 transition-colors"
              >
                <User className="h-4 w-4" />
                {t("nav.profile")}
              </button>
              <button
                onClick={() => { setMenuOpen(false); router.push("/settings/preferences"); }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5 transition-colors"
              >
                <Settings className="h-4 w-4" />
                {t("nav.settings")}
              </button>
              <div className="my-1 border-t border-gray-200 dark:border-white/10" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                {t("common.logout")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
