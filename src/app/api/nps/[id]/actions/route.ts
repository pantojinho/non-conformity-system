import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/nps/[id]/actions — List corrective actions
export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const supabase = await createClient();
    const admin = createAdminClient();
    const { id } = await context.params;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { data, error } = await admin
      .from("nps_corrective_actions")
      .select("*")
      .eq("nps_record_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("NPS actions list error:", error);
      return NextResponse.json(
        { error: "Erro ao buscar ações corretivas", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data || [] });
  } catch (err) {
    console.error("NPS actions GET error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST /api/nps/[id]/actions — Create corrective action
export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const supabase = await createClient();
    const admin = createAdminClient();
    const { id } = await context.params;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Lookup public.users.id from auth uid
    const { data: appUser } = await admin
      .from("users")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();

    // Verify NPS record exists
    const { data: record } = await admin
      .from("nps_records")
      .select("id, codigo")
      .eq("id", id)
      .single();

    if (!record) {
      return NextResponse.json(
        { error: "Registro NPS não encontrado" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { descricao, responsavel, prazo } = body;

    if (!descricao || !responsavel) {
      return NextResponse.json(
        { error: "Campos obrigatórios: descricao, responsavel" },
        { status: 400 }
      );
    }

    const { data: action, error } = await admin
      .from("nps_corrective_actions")
      .insert({
        nps_record_id: id,
        descricao,
        responsavel,
        prazo: prazo || null,
        status: "pendente",
      })
      .select()
      .single();

    if (error) {
      console.error("NPS action create error:", error);
      return NextResponse.json(
        { error: "Erro ao criar ação corretiva", details: error.message },
        { status: 500 }
      );
    }

    // Auto-create activity log
    await admin.from("nps_activity_log").insert({
      nps_record_id: id,
      acao: "action_created",
      descricao: `Ação corretiva criada: ${(descricao as string).substring(0, 80)}`,
      alterado_por: appUser?.id || user.id,
    });

    return NextResponse.json({ data: action }, { status: 201 });
  } catch (err) {
    console.error("NPS actions POST error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// PATCH /api/nps/[id]/actions — Update corrective action status
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const supabase = await createClient();
    const admin = createAdminClient();
    const { id } = await context.params;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Lookup public.users.id from auth uid
    const { data: appUser } = await admin
      .from("users")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();

    const body = await request.json();
    const { action_id, status, descricao, responsavel, prazo, data_conclusao } = body;

    if (!action_id) {
      return NextResponse.json(
        { error: "Campo obrigatório: action_id" },
        { status: 400 }
      );
    }

    // Verify action belongs to this NPS record
    const { data: existing } = await admin
      .from("nps_corrective_actions")
      .select("*")
      .eq("id", action_id)
      .eq("nps_record_id", id)
      .single();

    if (!existing) {
      return NextResponse.json(
        { error: "Ação corretiva não encontrada" },
        { status: 404 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (descricao) updateData.descricao = descricao;
    if (responsavel) updateData.responsavel = responsavel;
    if (prazo) updateData.prazo = prazo;
    if (data_conclusao) updateData.data_conclusao = data_conclusao;

    // If status is concluida, set data_conclusao automatically
    if (status === "concluida" && !data_conclusao) {
      updateData.data_conclusao = new Date().toISOString().split("T")[0];
    }

    const { data: updated, error } = await admin
      .from("nps_corrective_actions")
      .update(updateData)
      .eq("id", action_id)
      .select()
      .single();

    if (error) {
      console.error("NPS action update error:", error);
      return NextResponse.json(
        { error: "Erro ao atualizar ação corretiva", details: error.message },
        { status: 500 }
      );
    }

    // Activity log for status change
    if (status && status !== existing.status) {
      await admin.from("nps_activity_log").insert({
        nps_record_id: id,
        acao: "action_status_change",
        descricao: `Ação corretiva: status alterado de "${existing.status}" para "${status}"`,
        alterado_por: appUser?.id || user.id,
      });
    }

    return NextResponse.json({ data: updated });
  } catch (err) {
    console.error("NPS actions PATCH error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
