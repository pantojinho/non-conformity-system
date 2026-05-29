"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    label?: string;
    positive?: boolean;
  };
  icon?: LucideIcon;
  className?: string;
}

export function KPICard({ title, value, change, icon: Icon, className }: KPICardProps) {
  return (
    <div className={cn("rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-200 dark:border-gray-700", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </h3>
        {Icon && (
          <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
        )}
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {value}
      </div>
      {change && (
        <div className="flex items-center gap-1 text-sm">
          {change.positive !== false ? (
            <svg className="h-4 w-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          ) : (
            <svg className="h-4 w-4 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          )}
          <span className={cn(
            "font-medium",
            change.positive !== false ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
          )}>
            {change.value > 0 ? "+" : ""}{change.value}%
          </span>
          {change.label && (
            <span className="text-gray-500 dark:text-gray-400 ml-1">
              {change.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}