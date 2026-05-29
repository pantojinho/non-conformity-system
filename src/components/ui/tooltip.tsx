"use client";

import { useState, ReactNode, useCallback } from "react";
import { cn } from "@/lib/utils";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  position?: TooltipPosition;
  delay?: number;
  className?: string;
  disabled?: boolean;
}

const positionClasses: Record<TooltipPosition, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowClasses: Record<TooltipPosition, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-gray-900 dark:border-t-gray-200",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-gray-900 dark:border-b-gray-200",
  left: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-gray-900 dark:border-l-gray-200",
  right: "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-gray-900 dark:border-r-gray-200",
};

export function Tooltip({
  children,
  content,
  position = "top",
  delay = 200,
  className,
  disabled = false,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(() => {
    if (disabled) return;
    const id = setTimeout(() => setVisible(true), delay);
    setTimeoutId(id);
  }, [delay, disabled]);

  const hide = useCallback(() => {
    if (timeoutId) clearTimeout(timeoutId);
    setTimeoutId(null);
    setVisible(false);
  }, [timeoutId]);

  if (disabled || !content) {
    return <>{children}</>;
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-50 pointer-events-none whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium",
            "bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900",
            "animate-in fade-in-0 zoom-in-95 duration-150",
            positionClasses[position],
            className
          )}
        >
          {content}
          {/* Arrow */}
          <span
            className={cn(
              "absolute h-0 w-0 border-4",
              arrowClasses[position]
            )}
          />
        </div>
      )}
    </div>
  );
}
