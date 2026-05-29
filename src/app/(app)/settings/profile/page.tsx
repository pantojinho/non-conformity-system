"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { createClient } from "@/lib/supabase/client";
import { Camera, Loader2 } from "lucide-react";

export default function ProfileSettingsPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setName(user.user_metadata?.name || "");
          setEmail(user.email || "");
          setRole(user.user_metadata?.role || "Usuário");
          setAvatarUrl(user.user_metadata?.avatar_url || null);
        }
      } catch {
        // silently fail
      } finally {
        setFetchingUser(false);
      }
    }
    fetchUser();
  }, []);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";

  async function handleSave() {
    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        data: { name },
      });
      if (error) throw error;
      showToast({
        type: "success",
        title: "Perfil atualizado",
        message: "Suas informações foram salvas com sucesso.",
      });
    } catch {
      showToast({
        type: "error",
        title: "Erro ao salvar",
        message: "Não foi possível atualizar seu perfil. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  }

  if (fetchingUser) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Perfil
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Gerencie suas informações pessoais
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Avatar section */}
            <div className="flex items-center gap-4">
              <div className="relative">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={name}
                    className="h-20 w-20 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-purple-600 text-white text-xl font-bold border-2 border-gray-200 dark:border-gray-700">
                    {initials}
                  </div>
                )}
                <button
                  type="button"
                  className="absolute -bottom-1 -right-1 rounded-full bg-white p-1.5 shadow-sm border border-gray-200 text-gray-600 hover:text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white transition-colors"
                  aria-label="Alterar foto"
                >
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Foto de perfil
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  JPG, PNG ou GIF. Máximo 2MB.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Alterar foto
                </Button>
              </div>
            </div>

            {/* Form fields */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
              />
              <Input
                label="E-mail"
                value={email}
                disabled
                helperText="O e-mail não pode ser alterado"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Função
                </label>
                <Badge variant="primary" size="lg">
                  {role}
                </Badge>
              </div>
            </div>

            {/* Save button */}
            <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button onClick={handleSave} isLoading={loading}>
                Salvar alterações
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
