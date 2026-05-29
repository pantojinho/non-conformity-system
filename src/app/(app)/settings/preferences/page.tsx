"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { Sun, Moon, Monitor, Globe, Palette, Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

type Theme = "light" | "dark" | "system";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  localStorage.setItem("theme", theme);
}

export default function PreferencesSettingsPage() {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const t = useTranslations();
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  const themeOptions: { value: Theme; label: string; icon: typeof Sun }[] = [
    { value: "light", label: t("settings.light"), icon: Sun },
    { value: "dark", label: t("settings.dark"), icon: Moon },
    { value: "system", label: t("settings.system"), icon: Monitor },
  ];

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored && ["light", "dark", "system"].includes(stored)) {
      setTheme(stored);
      applyTheme(stored);
    } else {
      applyTheme("system");
    }
  }, []);

  function handleThemeChange(newTheme: Theme) {
    setTheme(newTheme);
    applyTheme(newTheme);
  }

  function handleLocaleChange(newLocale: Locale) {
    if (newLocale === currentLocale) return;
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    window.location.reload();
  }

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {t("settings.preferences")}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t("settings.preferencesDesc")}
        </p>
      </div>

      {/* Language section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {t("settings.language")}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("settings.languageDesc")}
                </p>
              </div>
            </div>

            <div className="grid gap-2">
              {locales.map((loc) => {
                const isActive = loc === currentLocale;
                return (
                  <button
                    key={loc}
                    onClick={() => handleLocaleChange(loc)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors",
                      isActive
                        ? "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-700 dark:bg-rose-900/20 dark:text-rose-300"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                    )}
                  >
                    <span className="w-8 text-xs font-semibold tracking-wide">
                      {loc.split("-")[0].toUpperCase()}
                    </span>
                    <span className="font-medium">{localeLabels[loc]}</span>
                    {isActive && (
                      <Check className="ml-auto h-4 w-4" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                <Palette className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {t("settings.theme")}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("settings.themeDesc")}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map(({ value, label, icon: Icon }) => {
                const isActive = theme === value;
                return (
                  <button
                    key={value}
                    onClick={() => handleThemeChange(value)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-lg border px-4 py-4 text-sm transition-colors",
                      isActive
                        ? "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-700 dark:bg-rose-900/20 dark:text-rose-300"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="font-medium">{label}</span>
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              {theme === "system"
                ? t("settings.systemActive")
                : theme === "dark"
                  ? t("settings.darkActive")
                  : t("settings.lightActive")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
