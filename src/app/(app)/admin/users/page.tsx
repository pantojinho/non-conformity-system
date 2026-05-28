"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { UserTable } from "@/components/admin/user-table";
import type { UserTableRow } from "@/components/admin/user-form-modal";

interface Role {
  id: string;
  name: string;
}

interface Organization {
  id: string;
  name: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserTableRow[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Erro ao carregar dados");
      }

      setUsers(data.users ?? []);
      setRoles(data.roles ?? []);
      setOrganizations(data.organizations ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao carregar usuários"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <p className="text-sm text-red-700">{error}</p>
        <button
          onClick={fetchData}
          className="mt-3 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <UserTable
      users={users}
      roles={roles}
      organizations={organizations}
      onRefresh={fetchData}
    />
  );
}
