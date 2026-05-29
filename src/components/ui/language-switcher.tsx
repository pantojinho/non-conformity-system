"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { locales, localeNames, localeFlags, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { Globe, ChevronDown, Check } from "lucide-react";

export function LanguageSwitcher({ className }: { className?: string }) {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleChange(newLocale: Locale) {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }
    localStorage.setItem("locale", newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
    setIsOpen(false);
    startTransition(() => {
      router.refresh();
    });
  }

  // Parse flag and label from localeNames (format: "🇧🇷 Português")
  const currentFlag = localeFlags[currentLocale] || "🌐";
  const currentLabel = localeNames[currentLocale]?.replace(/^[^\w]+/, "").trim() || currentLocale;

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      {/* Desktop: Dropdown */}
      <div className="hidden sm:block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={isPending}
          className={cn(
            "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-sm font-medium transition-colors",
            "border-gray-300 text-gray-700 hover:bg-gray-50",
            "dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800",
            isPending && "opacity-50"
          )}
          aria-label="Alterar idioma"
          aria-expanded={isOpen}
        >
          <Globe className="h-4 w-4" />
          <span className="text-base">{currentFlag}</span>
          <span className="hidden md:inline">{currentLabel}</span>
          <ChevronDown className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-1 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800 z-50">
            {locales.map((loc) => {
              const isActive = loc === currentLocale;
              const flag = localeFlags[loc];
              const label = localeNames[loc]?.replace(/^[^\w]+/, "").trim();
              return (
                <button
                  key={loc}
                  onClick={() => handleChange(loc)}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3 py-2.5 text-sm transition-colors",
                    isActive
                      ? "bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                  )}
                >
                  <span className="text-base">{flag}</span>
                  <span>{label}</span>
                  {isActive && <Check className="ml-auto h-4 w-4" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile: Native select */}
      <div className="sm:hidden">
        <select
          value={currentLocale}
          onChange={(e) => handleChange(e.target.value as Locale)}
          disabled={isPending}
          className="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
        >
          {locales.map((loc) => (
            <option key={loc} value={loc}>
              {localeFlags[loc]} {localeNames[loc]?.replace(/^[^\w]+/, "").trim()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
