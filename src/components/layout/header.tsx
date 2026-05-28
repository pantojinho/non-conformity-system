"use client";

import { Bell, LogOut, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header
      className="flex h-16 items-center justify-between border-b px-6"
      style={{
        background: "var(--background)",
        borderColor: "var(--border)",
      }}
    >
      <div />

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          className="relative rounded-md p-2 hover:opacity-80"
          style={{ color: "var(--muted-foreground)" }}
          title="Notificações"
        >
          <Bell className="h-5 w-5" />
          {/* Badge placeholder */}
        </button>

        {/* User */}
        <div
          className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm"
          style={{ color: "var(--foreground)" }}
        >
          <User className="h-4 w-4" />
          <span>Usuário</span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="rounded-md p-2 hover:opacity-80"
          style={{ color: "var(--muted-foreground)" }}
          title="Sair"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
