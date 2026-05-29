"use client";

import { AlertTriangle, AlertCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Modal } from "./modal";
import { Spinner } from "./loading";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "default";
  isLoading?: boolean;
}

const variantConfig = {
  danger: {
    icon: AlertTriangle,
    iconBg: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-600 dark:text-red-400",
    titleColor: "text-red-700 dark:text-red-400",
    confirmBg:
      "bg-red-600 hover:bg-red-700 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-500",
  },
  warning: {
    icon: AlertCircle,
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
    titleColor: "text-amber-700 dark:text-amber-400",
    confirmBg:
      "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 dark:bg-amber-600 dark:hover:bg-amber-500",
  },
  default: {
    icon: HelpCircle,
    iconBg: "bg-gray-100 dark:bg-gray-700",
    iconColor: "text-gray-600 dark:text-gray-400",
    titleColor: "text-gray-900 dark:text-white",
    confirmBg:
      "bg-rose-600 hover:bg-rose-700 focus:ring-rose-500 dark:bg-rose-600 dark:hover:bg-rose-500",
  },
};

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  variant = "default",
  isLoading = false,
}: ConfirmationDialogProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center px-2 py-4">
        {/* Icon */}
        <div className={cn("mb-4 rounded-full p-3", config.iconBg)}>
          <Icon className={cn("h-6 w-6", config.iconColor)} />
        </div>

        {/* Title */}
        <h3
          className={cn("text-lg font-semibold mb-2", config.titleColor)}
        >
          {title}
        </h3>

        {/* Message */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
          {message}
        </p>

        {/* Actions */}
        <div className="flex w-full gap-3 justify-center">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              "border border-gray-300 dark:border-gray-600",
              "text-gray-700 dark:text-gray-300",
              "hover:bg-gray-50 dark:hover:bg-gray-700",
              "focus:outline-none focus:ring-2 focus:ring-gray-400",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-offset-2",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              config.confirmBg
            )}
          >
            {isLoading && <Spinner size="sm" className="text-white" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
