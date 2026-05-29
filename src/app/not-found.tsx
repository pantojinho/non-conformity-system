"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-950 px-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#FF000F]/5 dark:bg-[#FF000F]/10" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#FF000F]/3 dark:bg-[#FF000F]/5" />
      </div>

      <div className="relative z-10 text-center max-w-md">
        {/* 404 Number */}
        <h1
          className="text-[10rem] sm:text-[12rem] font-black leading-none tracking-tighter"
          style={{ color: "#FF000F" }}
        >
          404
        </h1>

        {/* Divider */}
        <div className="mx-auto w-16 h-1 bg-[#FF000F] rounded-full mb-6" />

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Página não encontrada
        </h2>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          A página que você está procurando não existe ou foi movida para outro endereço.
          Verifique o URL ou volte para a página inicial.
        </p>

        {/* Action button */}
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
    </div>
  );
}
