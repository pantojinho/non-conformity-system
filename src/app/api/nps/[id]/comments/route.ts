import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/nps/[id]/comments — List comments
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
      .from("nps_comments")
      .select("*")
      .eq("nps_record_id", id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("NPS comments list error:", error);
      return NextResponse.json(
        { error: "Erro ao buscar comentários", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data || [] });
  } catch (err) {
    console.error("NPS comments GET error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST /api/nps/[id]/comments — Create comment
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

    const body = await request.json();
    const { conteudo } = body;

    if (!conteudo || !(conteudo as string).trim()) {
      return NextResponse.json(
        { error: "Campo obrigatório: conteudo" },
        { status: 400 }
      );
    }

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

    const { data: comment, error } = await admin
      .from("nps_comments")
      .insert({
        nps_record_id: id,
        conteudo: (conteudo as string).trim(),
        autor_id: user.id,
      })
      .select()
      .single();

    if (error) {
      console.error("NPS comment create error:", error);
      return NextResponse.json(
        { error: "Erro ao criar comentário", details: error.message },
        { status: 500 }
      );
    }

    // Auto-create activity log
    await admin.from("nps_activity_log").insert({
      nps_record_id: id,
      acao: "comment_added",
      descricao: "Novo comentário adicionado",
      alterado_por: user.id,
    });

    return NextResponse.json({ data: comment }, { status: 201 });
  } catch (err) {
    console.error("NPS comments POST error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
