"use client";

import { useTranslations } from "@/i18n";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen">
      {/* Left Panel — ABB Branding */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden bg-[#1A1A2E] dark:bg-[#0D0D1A]">
        {/* Geometric pattern decorations */}
        <div className="absolute inset-0">
          {/* Large diagonal stripe */}
          <div className="absolute -right-20 top-0 w-[600px] h-[600px] border border-white/5 rotate-45 translate-x-1/3 -translate-y-1/4" />
          <div className="absolute -right-10 top-10 w-[500px] h-[500px] border border-white/5 rotate-45 translate-x-1/3 -translate-y-1/4" />

          {/* Horizontal lines */}
          <div className="absolute top-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute top-[70%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Red accent geometric shapes */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FF000F]" />
          <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[#FF000F]/30 rounded-tr-3xl" />
          <div className="absolute bottom-12 left-12 w-20 h-20 border-l-2 border-b-2 border-[#FF000F]/20 rounded-bl-2xl" />

          {/* Circle decorations */}
          <div className="absolute top-[20%] right-[15%] w-4 h-4 rounded-full bg-[#FF000F]/20" />
          <div className="absolute top-[25%] right-[12%] w-2 h-2 rounded-full bg-[#FF000F]/40" />
          <div className="absolute bottom-[30%] left-[20%] w-3 h-3 rounded-full bg-white/5" />
          <div className="absolute bottom-[35%] left-[25%] w-1.5 h-1.5 rounded-full bg-white/10" />

          {/* Dot grid pattern */}
          <div className="absolute top-[45%] left-[10%] grid grid-cols-4 gap-4 opacity-[0.04]">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-white" />
            ))}
          </div>
        </div>

        {/* Branding content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="space-y-8">
            {/* ABB Logo mark */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FF000F] flex items-center justify-center shadow-lg shadow-[#FF000F]/20">
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8V4H8" />
                  <path d="M12 4h4" />
                  <rect x="6" y="8" width="12" height="10" rx="2" />
                  <circle cx="10" cy="14" r="1" fill="currentColor" />
                  <circle cx="14" cy="14" r="1" fill="currentColor" />
                </svg>
              </div>
            </div>

            {/* Main text */}
            <div className="space-y-4">
              <h1 className="text-6xl xl:text-7xl font-bold text-white tracking-tight">
                ABB
              </h1>
              <h2 className="text-2xl xl:text-3xl font-light text-white/80 tracking-wide">
                Robotics Hub
              </h2>
              <div className="w-16 h-1 bg-[#FF000F] rounded-full" />
              <p className="text-lg text-white/50 font-light">
                {t("app.tagline")}
              </p>
            </div>

            {/* Description */}
            <p className="max-w-md text-sm text-white/30 leading-relaxed">
              {t("app.welcomeSub")}
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel — Form Content */}
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-[#0D0D1A] p-6 sm:p-8 lg:p-12">
        {/* Mobile branding header */}
        <div className="absolute top-0 left-0 right-0 lg:hidden">
          <div className="bg-[#1A1A2E] dark:bg-[#0D0D1A] px-6 py-8 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF000F] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8V4H8" />
                <path d="M12 4h4" />
                <rect x="6" y="8" width="12" height="10" rx="2" />
                <circle cx="10" cy="14" r="1" fill="currentColor" />
                <circle cx="14" cy="14" r="1" fill="currentColor" />
              </svg>
            </div>
            <div>
              <span className="text-white font-bold text-lg">ABB</span>
              <span className="text-white/60 text-sm ml-2">Robotics Hub</span>
            </div>
          </div>
          <div className="h-0.5 bg-[#FF000F]" />
        </div>

        <div className="w-full max-w-md mt-20 lg:mt-0">{children}</div>
      </div>
    </div>
  );
}
