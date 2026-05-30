import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

// POST /api/complaints/[id]/comments — Add comment to a complaint
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
    const { conteudo } = body;

    if (!conteudo || typeof conteudo !== "string" || conteudo.trim() === "") {
      return NextResponse.json(
        { error: "Conteúdo do comentário é obrigatório" },
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

    // Insert comment
    const { data: newComment, error: insertError } = await adminClient
      .from("nps_comments")
      .insert({
        nps_record_id: id,
        conteudo: conteudo.trim(),
        autor_id: userProfile?.id ?? null,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error creating comment:", insertError);
      return NextResponse.json(
        { error: `Erro ao criar comentário: ${insertError.message}` },
        { status: 400 }
      );
    }

    // Log activity
    await adminClient.from("nps_activity_log").insert({
      nps_record_id: id,
      acao: "comentario",
      descricao: "Novo comentário adicionado",
      alterado_por: userProfile?.id ?? null,
    });

    return NextResponse.json({ comment: newComment }, { status: 201 });
  } catch (err) {
    console.error(
      "Unexpected error in POST /api/complaints/[id]/comments:",
      err
    );
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
