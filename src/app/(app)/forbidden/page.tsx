import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      {/* Lock icon */}
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-[#FF000F] dark:text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>

      {/* 403 label */}
      <span className="inline-block mb-2 rounded-full bg-red-100 dark:bg-red-900/30 px-3 py-1 text-xs font-semibold text-[#FF000F] dark:text-red-400">
        403 — Proibido
      </span>

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
        Acesso Negado
      </h2>

      {/* Description */}
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md leading-relaxed">
        Você não tem permissão para acessar esta página. Entre em contato com o administrador
        caso acredite que isso seja um erro.
      </p>

      {/* Action link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 rounded-lg bg-[#FF000F] px-6 py-3 text-sm font-medium text-white hover:bg-[#CC000C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF000F] focus:ring-offset-2 dark:focus:ring-offset-gray-950"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Voltar ao Dashboard
      </Link>
    </div>
  );
}
