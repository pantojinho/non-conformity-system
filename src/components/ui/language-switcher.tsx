"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { Globe, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const currentLocale = useLocale() as Locale;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleChange = (newLocale: Locale) => {
    // Set cookie for next-intl server-side detection
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    setIsOpen(false);
    // Reload to apply the new locale
    window.location.reload();
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10 transition-colors"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{localeLabels[currentLocale]}</span>
        <span className="sm:hidden">{currentLocale.split("-")[0]}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white py-1 shadow-xl dark:border-white/10 dark:bg-[#1A1A2E] z-50">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleChange(loc)}
              className={cn(
                "flex w-full items-center gap-2 px-3 py-2.5 text-sm transition-colors",
                loc === currentLocale
                  ? "bg-rose-50 text-rose-700 dark:bg-rose-600/20 dark:text-rose-400"
                  : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
              )}
            >
              <span className="w-8 text-xs font-medium">
                {loc.split("-")[0].toUpperCase()}
              </span>
              <span className="flex-1 text-left">{localeLabels[loc]}</span>
              {loc === currentLocale && (
                <Check className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
