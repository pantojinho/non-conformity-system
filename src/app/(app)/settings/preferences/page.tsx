"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { locales, localeFlags, localeNames, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { Sun, Moon, Monitor, Globe, Palette } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

type Theme = "light" | "dark" | "system";

const themes: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Claro", icon: Sun },
  { value: "dark", label: "Escuro", icon: Moon },
  { value: "system", label: "Sistema", icon: Monitor },
];

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export default function PreferencesSettingsPage() {
  const currentLocale = useLocale() as Locale;
  const router = useRouter();
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

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
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  }

  function handleLocaleChange(newLocale: Locale) {
    if (newLocale === currentLocale) return;
    localStorage.setItem("locale", newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365}`;
    router.refresh();
  }

  if (!mounted) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Preferências
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Personalize idioma e aparência da aplicação
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
                  Idioma
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Escolha o idioma da interface
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
                    <span className="text-lg">{localeFlags[loc]}</span>
                    <span className="font-medium">
                      {localeNames[loc]}
                    </span>
                    {isActive && (
                      <svg
                        className="ml-auto h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
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
                  Tema
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Escolha a aparência da interface
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {themes.map(({ value, label, icon: Icon }) => {
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
                ? "O tema seguirá a configuração do seu sistema operacional."
                : theme === "dark"
                ? "O tema escuro está ativado."
                : "O tema claro está ativado."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
