"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "info";

const badgeVariants: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  primary: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  info: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
};

const sizeVariants: Record<"sm" | "md" | "lg", string> = {
  sm: "px-2 py-0.5 text-xs font-medium",
  md: "px-2.5 py-0.5 text-sm font-medium",
  lg: "px-3 py-1 text-sm font-medium",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full",
        badgeVariants[variant],
        sizeVariants[size],
        className
      )}
    >
      {children}
    </span>
  );
}