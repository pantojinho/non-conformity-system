"use client";

import { useState, useCallback, ReactNode } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmptyState } from "./empty-state";
import { LoadingSkeleton } from "./loading";

// ── Types ────────────────────────────────────────────────────────────────────

type SortDirection = "asc" | "desc" | null;

interface SortState {
  key: string;
  direction: SortDirection;
}

interface TableContextValue {
  sort: SortState | null;
  onSort: (key: string) => void;
  compact: boolean;
  striped: boolean;
}

// ── Context via props drilling (keeps it simple, no React.createContext needed) ──

// ── Table (wrapper) ──────────────────────────────────────────────────────────

interface TableProps {
  children: ReactNode;
  className?: string;
  compact?: boolean;
  striped?: boolean;
  stickyHeader?: boolean;
  mobileCards?: boolean;
  sort?: SortState | null;
  onSort?: (key: string) => void;
}

export function Table({
  children,
  className,
  compact = false,
  striped = false,
  stickyHeader = false,
  mobileCards = false,
  sort = null,
  onSort,
}: TableProps) {
  const handleSort = useCallback(
    (key: string) => {
      onSort?.(key);
    },
    [onSort]
  );

  if (mobileCards) {
    return (
      <div className={cn("space-y-3 md:hidden", className)}>
        {/* Mobile card layout — consumer uses TableMobileCard directly */}
        {children}
      </div>
    );
  }

  return (
    <div className={cn("w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700", className)}>
      <table className="w-full text-sm text-left">
        {children}
      </table>
    </div>
  );
}

// ── TableHeader ──────────────────────────────────────────────────────────────

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <thead className={cn("bg-gray-50 dark:bg-gray-800/50", className)}>
      {children}
    </thead>
  );
}

// ── TableBody ────────────────────────────────────────────────────────────────

interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export function TableBody({ children, className }: TableBodyProps) {
  return (
    <tbody className={cn("divide-y divide-gray-200 dark:divide-gray-700", className)}>
      {children}
    </tbody>
  );
}

// ── TableRow ─────────────────────────────────────────────────────────────────

interface TableRowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TableRow({ children, className, onClick }: TableRowProps) {
  return (
    <tr
      className={cn(
        "transition-colors",
        onClick && "cursor-pointer",
        "hover:bg-gray-50 dark:hover:bg-gray-800/50",
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

// ── TableHead ────────────────────────────────────────────────────────────────

interface TableHeadProps {
  children: ReactNode;
  className?: string;
  sortable?: boolean;
  sortKey?: string;
  currentSort?: SortState | null;
  onSort?: (key: string) => void;
  compact?: boolean;
}

export function TableHead({
  children,
  className,
  sortable = false,
  sortKey,
  currentSort,
  onSort,
  compact = false,
}: TableHeadProps) {
  const isActive = currentSort?.key === sortKey && currentSort !== null;
  const direction = isActive && currentSort ? currentSort.direction : null;

  const handleClick = () => {
    if (sortable && sortKey && onSort) {
      onSort(sortKey);
    }
  };

  const SortIcon = () => {
    if (!sortable) return null;
    if (direction === "asc") return <ArrowUp className="h-4 w-4" />;
    if (direction === "desc") return <ArrowDown className="h-4 w-4" />;
    return <ArrowUpDown className="h-4 w-4" />;
  };

  return (
    <th
      className={cn(
        "font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap",
        compact ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm",
        sortable && "cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors",
        isActive && "bg-gray-100 dark:bg-gray-700/50",
        className
      )}
      onClick={handleClick}
      scope="col"
    >
      <div className="flex items-center gap-1.5">
        {children}
        {sortable && <SortIcon />}
      </div>
    </th>
  );
}

// ── TableCell ────────────────────────────────────────────────────────────────

interface TableCellProps {
  children: ReactNode;
  className?: string;
  compact?: boolean;
}

export function TableCell({ children, className, compact = false }: TableCellProps) {
  return (
    <td
      className={cn(
        "text-gray-700 dark:text-gray-300 whitespace-nowrap",
        compact ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm",
        className
      )}
    >
      {children}
    </td>
  );
}

// ── TableEmpty ───────────────────────────────────────────────────────────────

interface TableEmptyProps {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  colSpan?: number;
  className?: string;
}

export function TableEmpty({
  title = "Nenhum dado encontrado",
  description = "Não há registros para exibir no momento.",
  action,
  colSpan = 1,
  className,
}: TableEmptyProps) {
  return (
    <tr>
      <td colSpan={colSpan} className={className}>
        <EmptyState
          icon={Inbox}
          title={title}
          description={description}
          action={action}
        />
      </td>
    </tr>
  );
}

// ── TableLoading ─────────────────────────────────────────────────────────────

interface TableLoadingProps {
  rows?: number;
  columns?: number;
  colSpan?: number;
  compact?: boolean;
  className?: string;
}

export function TableLoading({
  rows = 5,
  columns = 4,
  compact = false,
  className,
}: TableLoadingProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <tr key={rowIdx} className={className}>
          {Array.from({ length: columns }).map((_, colIdx) => (
            <td
              key={colIdx}
              className={cn(compact ? "px-3 py-2" : "px-4 py-3")}
            >
              <LoadingSkeleton
                className={cn(
                  "h-4 rounded",
                  colIdx === 0 ? "w-3/4" : colIdx === columns - 1 ? "w-1/3" : "w-full"
                )}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

// ── Sort hook helper ─────────────────────────────────────────────────────────

export function useTableSort(defaultKey?: string, defaultDirection: SortDirection = "asc") {
  const [sort, setSort] = useState<SortState | null>(
    defaultKey ? { key: defaultKey, direction: defaultDirection } : null
  );

  const handleSort = useCallback((key: string) => {
    setSort((prev) => {
      if (prev?.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return null; // clear sort
      }
      return { key, direction: "asc" };
    });
  }, []);

  return { sort, handleSort };
}
