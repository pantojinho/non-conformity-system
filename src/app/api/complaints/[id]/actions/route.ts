import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

// POST /api/complaints/[id]/actions — Add corrective action
export async function POST(
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
    const { descricao, responsavel, prazo, data_conclusao, status } = body;

    if (!descricao || !responsavel || !prazo) {
      return NextResponse.json(
        { error: "Campos obrigatórios: descricao, responsavel, prazo" },
        { status: 400 }
      );
    }

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

    // Lookup user profile
    const { data: userProfile } = await adminClient
      .from("users")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();

    // Insert corrective action
    const { data: newAction, error: insertError } = await adminClient
      .from("nps_corrective_actions")
      .insert({
        nps_record_id: id,
        descricao,
        responsavel,
        prazo,
        data_conclusao: data_conclusao ?? null,
        status: status ?? "pendente",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error creating corrective action:", insertError);
      return NextResponse.json(
        {
          error: `Erro ao criar ação corretiva: ${insertError.message}`,
        },
        { status: 400 }
      );
    }

    // Log activity
    await adminClient.from("nps_activity_log").insert({
      nps_record_id: id,
      acao: "acao_corretiva",
      descricao: `Nova ação corretiva adicionada: ${descricao.substring(0, 50)}`,
      alterado_por: userProfile?.id ?? null,
    });

    return NextResponse.json({ action: newAction }, { status: 201 });
  } catch (err) {
    console.error(
      "Unexpected error in POST /api/complaints/[id]/actions:",
      err
    );
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// PATCH /api/complaints/[id]/actions — Update corrective action
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
    const { action_id, descricao, responsavel, prazo, data_conclusao, status } =
      body;

    if (!action_id) {
      return NextResponse.json(
        { error: "ID da ação corretiva é obrigatório (action_id)" },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();

    // Verify action belongs to this record
    const { data: existingAction, error: fetchError } = await adminClient
      .from("nps_corrective_actions")
      .select("id")
      .eq("id", action_id)
      .eq("nps_record_id", id)
      .single();

    if (fetchError || !existingAction) {
      return NextResponse.json(
        { error: "Ação corretiva não encontrada" },
        { status: 404 }
      );
    }

    // Build update object
    const updateData: Record<string, unknown> = {};
    if (descricao !== undefined) updateData.descricao = descricao;
    if (responsavel !== undefined) updateData.responsavel = responsavel;
    if (prazo !== undefined) updateData.prazo = prazo;
    if (data_conclusao !== undefined) updateData.data_conclusao = data_conclusao;
    if (status !== undefined) updateData.status = status;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "Nenhum campo válido para atualização" },
        { status: 400 }
      );
    }

    const { data: updatedAction, error: updateError } = await adminClient
      .from("nps_corrective_actions")
      .update(updateData)
      .eq("id", action_id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating corrective action:", updateError);
      return NextResponse.json(
        {
          error: `Erro ao atualizar ação corretiva: ${updateError.message}`,
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
    await adminClient.from("nps_activity_log").insert({
      nps_record_id: id,
      acao: "acao_corretiva_atualizada",
      descricao: `Ação corretiva atualizada: ${Object.keys(updateData).join(", ")}`,
      alterado_por: userProfile?.id ?? null,
    });

    return NextResponse.json({ action: updatedAction });
  } catch (err) {
    console.error(
      "Unexpected error in PATCH /api/complaints/[id]/actions:",
      err
    );
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
