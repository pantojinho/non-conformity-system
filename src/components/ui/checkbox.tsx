"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
}

export function Checkbox({
  label,
  checked,
  onChange,
  disabled = false,
  error,
}: CheckboxProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className={cn(
          "inline-flex items-center gap-2.5 cursor-pointer select-none",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {/* Hidden native checkbox for accessibility */}
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />

        {/* Custom checkbox */}
        <span
          className={cn(
            "relative flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-all duration-150",
            checked
              ? "border-rose-600 bg-rose-600 dark:border-rose-500 dark:bg-rose-500"
              : "border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800",
            !disabled &&
              !checked &&
              "hover:border-rose-400 dark:hover:border-rose-400",
            error && !checked && "border-red-500 dark:border-red-400"
          )}
        >
          {/* Check icon with animation */}
          <Check
            className={cn(
              "h-3.5 w-3.5 text-white transition-all duration-150",
              checked
                ? "scale-100 opacity-100"
                : "scale-0 opacity-0"
            )}
            strokeWidth={3}
          />
        </span>

        {/* Label */}
        {label && (
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {label}
          </span>
        )}
      </label>

      {/* Error message */}
      {error && (
        <p className="ml-7 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
