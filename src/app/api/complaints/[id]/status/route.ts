import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

// Valid status transitions — canonical DB values (nps_status enum)
const VALID_STATUSES = [
  "aberto",
  "em_atendimento",
  "em_analise",
  "em_andamento",
  "resolvido",
  "escalonado",
  "fechado",
  "cancelado",
] as const;

type ValidStatus = (typeof VALID_STATUSES)[number];

// PATCH /api/complaints/[id]/status — Change complaint status
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const { status, motivo } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Novo status é obrigatório" },
        { status: 400 }
      );
    }

    if (!VALID_STATUSES.includes(status as ValidStatus)) {
      return NextResponse.json(
        { error: `Status inválido. Valores aceitos: ${VALID_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();

    // Get current record
    const { data: existing, error: fetchError } = await adminClient
      .from("nps_records")
      .select("id, codigo, status")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        { error: "Reclamação não encontrada" },
        { status: 404 }
      );
    }

    if (existing.status === status) {
      return NextResponse.json(
        { error: "Reclamação já está com este status" },
        { status: 400 }
      );
    }

    const previousStatus = existing.status;

    // Update status
    const { data: updatedRecord, error: updateError } = await adminClient
      .from("nps_records")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating complaint status:", updateError);
      return NextResponse.json(
        {
          error: `Erro ao atualizar status: ${updateError.message}`,
        },
        { status: 400 }
      );
    }

    // Lookup user profile
    const { data: userProfile } = await adminClient
      .from("users")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();

    // Log activity
    const descricao = motivo
      ? `Status alterado de "${previousStatus}" para "${status}": ${motivo}`
      : `Status alterado de "${previousStatus}" para "${status}"`;

    await adminClient.from("nps_activity_log").insert({
      nps_record_id: id,
      acao: "mudanca_status",
      descricao,
      alterado_por: userProfile?.id ?? null,
    });

    return NextResponse.json({ record: updatedRecord });
  } catch (err) {
    console.error(
      "Unexpected error in PATCH /api/complaints/[id]/status:",
      err
    );
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
