import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

// GET /api/complaints/[id] — Fetch single nps_record with related data
export async function GET(
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
    const adminClient = createAdminClient();

    const { data: record, error: fetchError } = await adminClient
      .from("nps_records")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !record) {
      return NextResponse.json(
        { error: "Reclamação não encontrada" },
        { status: 404 }
      );
    }

    // Fetch related data in parallel
    const [commentsResult, attachmentsResult, actionsResult, activityResult] =
      await Promise.all([
        adminClient
          .from("nps_comments")
          .select("*")
          .eq("nps_record_id", id)
          .order("created_at", { ascending: true }),
        adminClient
          .from("nps_attachments")
          .select("*")
          .eq("nps_record_id", id)
          .order("created_at", { ascending: false }),
        adminClient
          .from("nps_corrective_actions")
          .select("*")
          .eq("nps_record_id", id)
          .order("created_at", { ascending: false }),
        adminClient
          .from("nps_activity_log")
          .select("*")
          .eq("nps_record_id", id)
          .order("created_at", { ascending: false }),
      ]);

    return NextResponse.json({
      record,
      comments: commentsResult.data ?? [],
      attachments: attachmentsResult.data ?? [],
      correctiveActions: actionsResult.data ?? [],
      activityLog: activityResult.data ?? [],
    });
  } catch (err) {
    console.error("Unexpected error in GET /api/complaints/[id]:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// PATCH /api/complaints/[id] — Update nps_record
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

    const adminClient = createAdminClient();

    // Verify record exists
    const { data: existing, error: fetchError } = await adminClient
      .from("nps_records")
      .select("id, codigo")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        { error: "Reclamação não encontrada" },
        { status: 404 }
      );
    }

    // Build update object — only allowed fields
    const allowedFields = [
      "cliente",
      "projeto",
      "pedido",
      "categoria",
      "impacto",
      "area_responsavel",
      "responsavel_id",
      "data_ocorrencia",
      "descricao",
      "severidade",
      "evidencias",
      "sla_prazo_dias",
      "sla_data_limite",
      "nc_vinculada_id",
      "status",
      "prioridade",
      "canal",
    ];

    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "Nenhum campo válido para atualização" },
        { status: 400 }
      );
    }

    const { data: updatedRecord, error: updateError } = await adminClient
      .from("nps_records")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating complaint:", updateError);
      return NextResponse.json(
        { error: `Erro ao atualizar reclamação: ${updateError.message}` },
        { status: 400 }
      );
    }

    // Lookup user profile for activity log
    const { data: userProfile } = await adminClient
      .from("users")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();

    // Log activity
    const changedFields = Object.keys(updateData).join(", ");
    await adminClient.from("nps_activity_log").insert({
      nps_record_id: id,
      acao: "atualizacao",
      descricao: `Campos atualizados: ${changedFields}`,
      alterado_por: userProfile?.id ?? null,
    });

    return NextResponse.json({ record: updatedRecord });
  } catch (err) {
    console.error("Unexpected error in PATCH /api/complaints/[id]:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
