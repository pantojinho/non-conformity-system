"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";
import { cn } from "@/lib/utils";

export function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 -ml-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            Robotics Hub
          </span>
        </div>

        <div className="w-10" /> {/* Spacer for balance */}
      </div>
    </header>
  );
}