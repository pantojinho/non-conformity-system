"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback?next=/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Recuperar Senha
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Informe seu e-mail para receber o link de recuperação.
        </p>
      </div>

      {/* Success State */}
      {success ? (
        <div className="space-y-6">
          <Alert variant="success" title="E-mail enviado!">
            Verifique seu e-mail <strong>{email}</strong> e siga as instruções
            para redefinir sua senha.
          </Alert>

          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Não recebeu? Verifique sua caixa de spam ou tente novamente.
            </p>
          </div>

          <Link
            href="/login"
            className="block w-full text-center text-sm font-medium text-[#FF000F] hover:text-[#E0000D] dark:text-[#FF3333] dark:hover:text-[#FF000F] transition-colors"
          >
            ← Voltar para login
          </Link>
        </div>
      ) : (
        <>
          {/* Error Alert */}
          {error && (
            <Alert variant="danger" title="Erro ao enviar e-mail">
              {error}
            </Alert>
          )}

          {/* Reset Form */}
          <form onSubmit={handleResetPassword} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <div className="absolute left-3 top-[38px] z-10 text-gray-400 dark:text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <Input
                id="email"
                type="email"
                label="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                className="pl-10"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={loading}
              className="w-full"
              size="lg"
            >
              {loading ? "Enviando..." : "Enviar link de recuperação"}
            </Button>
          </form>

          {/* Back to login */}
          <Link
            href="/login"
            className="block text-center text-sm font-medium text-[#FF000F] hover:text-[#E0000D] dark:text-[#FF3333] dark:hover:text-[#FF000F] transition-colors"
          >
            ← Voltar para login
          </Link>
        </>
      )}
    </div>
  );
}
