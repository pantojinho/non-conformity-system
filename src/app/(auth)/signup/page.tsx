"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ORGANIZATIONS = [
  { id: "org-1", name: "Robótica Industrial Ltda" },
  { id: "org-2", name: "AutoBot Solutions" },
  { id: "org-3", name: "MechaCorp S.A." },
];

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          organization_id: organizationId,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
          Criar Conta
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
          Cadastre-se no Robotics Hub
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        {error && (
          <div
            className="rounded-md p-3 text-sm"
            style={{ background: "var(--destructive)", color: "#fff" }}
          >
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium"
            style={{ color: "var(--foreground)" }}
          >
            Nome completo
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm"
            style={{ borderColor: "var(--border)" }}
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium"
            style={{ color: "var(--foreground)" }}
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm"
            style={{ borderColor: "var(--border)" }}
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium"
            style={{ color: "var(--foreground)" }}
          >
            Senha
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm"
            style={{ borderColor: "var(--border)" }}
            placeholder="••••••••"
          />
        </div>

        <div>
          <label
            htmlFor="organization"
            className="block text-sm font-medium"
            style={{ color: "var(--foreground)" }}
          >
            Organização
          </label>
          <select
            id="organization"
            value={organizationId}
            onChange={(e) => setOrganizationId(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border px-3 py-2 text-sm"
            style={{ borderColor: "var(--border)" }}
          >
            <option value="">Selecione...</option>
            {ORGANIZATIONS.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          style={{ background: "var(--primary)" }}
        >
          {loading ? "Criando conta..." : "Cadastrar"}
        </button>
      </form>

      <p className="text-center text-sm" style={{ color: "var(--muted-foreground)" }}>
        Já tem conta?{" "}
        <Link href="/login" className="underline" style={{ color: "var(--primary)" }}>
          Faça login
        </Link>
      </p>
    </div>
  );
}
