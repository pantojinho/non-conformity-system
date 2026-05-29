"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Muito fraca", color: "bg-red-500" };
  if (score === 2) return { score, label: "Fraca", color: "bg-orange-500" };
  if (score === 3) return { score, label: "Razoável", color: "bg-yellow-500" };
  if (score === 4) return { score, label: "Boa", color: "bg-green-400" };
  return { score, label: "Forte", color: "bg-green-600" };
}

export default function SecuritySettingsPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [showNew, setShowNew] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const strength = getPasswordStrength(newPassword);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Informe sua senha atual";
    }
    if (!newPassword) {
      newErrors.newPassword = "Informe a nova senha";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "A senha deve ter pelo menos 8 caracteres";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirme a nova senha";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleChangePassword() {
    if (!validate()) return;

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) throw error;

      showToast({
        type: "success",
        title: "Senha alterada",
        message: "Sua senha foi atualizada com sucesso.",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setErrors({});
    } catch {
      showToast({
        type: "error",
        title: "Erro ao alterar senha",
        message:
          "Não foi possível alterar sua senha. Verifique se a senha atual está correta.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Segurança
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Altere sua senha e gerencie a segurança da sua conta
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Header icon */}
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30">
                <ShieldCheck className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Alterar senha
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Escolha uma senha forte para proteger sua conta
                </p>
              </div>
            </div>

            {/* Current password */}
            <div className="relative">
              <Input
                label="Senha atual"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                error={errors.currentPassword}
                placeholder="Digite sua senha atual"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                tabIndex={-1}
              >
                {showCurrent ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* New password */}
            <div className="relative">
              <Input
                label="Nova senha"
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={errors.newPassword}
                placeholder="Digite a nova senha"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                tabIndex={-1}
              >
                {showNew ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Password strength indicator */}
            {newPassword.length > 0 && (
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1.5 flex-1 rounded-full transition-colors",
                        i <= strength.score ? strength.color : "bg-gray-200 dark:bg-gray-700"
                      )}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Força: {strength.label}
                </p>
              </div>
            )}

            {/* Confirm new password */}
            <div className="relative">
              <Input
                label="Confirmar nova senha"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={errors.confirmPassword}
                placeholder="Confirme a nova senha"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                tabIndex={-1}
              >
                {showConfirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button onClick={handleChangePassword} isLoading={loading}>
                Alterar senha
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
