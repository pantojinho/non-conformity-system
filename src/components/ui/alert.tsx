"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type AlertVariant = "default" | "info" | "success" | "warning" | "danger";

const alertVariants: Record<AlertVariant, string> = {
  default: "bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-800/50 dark:border-gray-700 dark:text-gray-200",
  info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200",
  success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200",
  danger: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200",
};

const iconVariants: Record<AlertVariant, string> = {
  default: "text-gray-600 dark:text-gray-400",
  info: "text-blue-600 dark:text-blue-400",
  success: "text-green-600 dark:text-green-400",
  warning: "text-yellow-600 dark:text-yellow-400",
  danger: "text-red-600 dark:text-red-400",
};

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function Alert({
  variant = "default",
  title,
  icon: Icon,
  children,
  className,
  dismissible = false,
  onDismiss,
}: AlertProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border p-4",
        alertVariants[variant],
        className
      )}
      role="alert"
    >
      <div className="flex">
        {Icon && (
          <div className="flex-shrink-0">
            <Icon className={cn("h-5 w-5", iconVariants[variant])} aria-hidden="true" />
          </div>
        )}
        <div className={cn("ml-3", Icon ? "flex-1" : "")}>
          {title && (
            <h3 className="text-sm font-medium mb-1">{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && onDismiss && (
          <div className="ml-auto pl-3">
            <button
              onClick={onDismiss}
              className="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Fechar"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}