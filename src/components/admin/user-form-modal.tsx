"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";

export interface Role {
  id: string;
  name: string;
}

export interface Organization {
  id: string;
  name: string;
}

export interface UserTableRow {
  id: string;
  email: string;
  name: string;
  role_id: string;
  role_name: string;
  organization_id: string;
  organization_name: string;
  country: string;
  unit: string | null;
  is_active: boolean;
  created_at: string;
}

interface UserFormModalProps {
  user: UserTableRow | null; // null = creating new
  roles: Role[];
  organizations: Organization[];
  onClose: () => void;
  onSuccess: () => void;
}

export function UserFormModal({
  user,
  roles,
  organizations,
  onClose,
  onSuccess,
}: UserFormModalProps) {
  const isEditing = !!user;

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState(user?.role_id ?? "");
  const [organizationId, setOrganizationId] = useState(
    user?.organization_id ?? ""
  );
  const [country, setCountry] = useState(user?.country ?? "brasil");
  const [unit, setUnit] = useState(user?.unit ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isEditing) {
        // PATCH
        const body: Record<string, unknown> = {
          name,
          role_id: roleId,
          organization_id: organizationId,
          country,
          unit,
        };
        if (password) body.password = password;

        const res = await fetch(`/api/admin/users/${user!.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error ?? "Erro ao atualizar usuário");
        }
      } else {
        // POST
        if (!password) {
          throw new Error("Senha é obrigatória para novos usuários");
        }

        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            name,
            role_id: roleId,
            organization_id: organizationId,
            country,
            unit,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error ?? "Erro ao criar usuário");
        }
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-lg rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditing ? "Editar Usuário" : "Novo Usuário"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Nome *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Nome completo"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isEditing}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
              placeholder="email@exemplo.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {isEditing ? "Nova Senha (deixe vazio para manter)" : "Senha *"}
            </label>
            <input
              type="password"
              required={!isEditing}
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          {/* Role */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Perfil *
            </label>
            <select
              required
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Selecione um perfil</option>
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Organization */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Organização *
            </label>
            <select
              required
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Selecione uma organização</option>
              {organizations.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>

          {/* Country */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              País
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="brasil">🇧🇷 Brasil</option>
              <option value="argentina">🇦🇷 Argentina</option>
            </select>
          </div>

          {/* Unit */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Unidade
            </label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Ex: Fábrica São Paulo"
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={(e) => {
              const form = (e.target as HTMLButtonElement).closest("form");
              if (form) form.requestSubmit();
            }}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isEditing ? "Salvar Alterações" : "Criar Usuário"}
          </button>
        </div>
      </div>
    </div>
  );
}
