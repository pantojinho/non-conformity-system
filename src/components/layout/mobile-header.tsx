"use client";

import { Menu } from "lucide-react";
import { Bot } from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 dark:bg-[#1A1A2E] dark:border-white/10">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 -ml-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-[#FF000F]">
            <Bot className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            <span className="text-[#FF000F]">ABB</span>{" "}
            <span>Robotics Hub</span>
          </span>
        </div>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
