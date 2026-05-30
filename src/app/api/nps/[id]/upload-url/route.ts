import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/nps/[id]/upload-url — Generate signed URL for direct upload
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
    const { fileName, fileType } = body;

    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: "Nome e tipo do arquivo são obrigatórios" },
        { status: 400 }
      );
    }

    // Generate unique file path
    const timestamp = Date.now();
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath = `${id}/${timestamp}-${sanitizedName}`;

    // Generate signed URL (valid for 5 minutes)
    const { data: urlData, error: urlError } = await admin.storage
      .from("nps-attachments")
      .createSignedUrl(filePath, 300);

    if (urlError || !urlData) {
      return NextResponse.json(
        { error: "Erro ao gerar URL de upload", details: urlError?.message },
        { status: 500 }
      );
    }

    // Create attachment record (without URL initially)
    const { data: attachment, error: insertError } = await admin
      .from("nps_attachments")
      .insert({
        nps_record_id: id,
        file_name: fileName,
        file_url: urlData.signedUrl,
        file_type: fileType,
        file_size: 0,
        uploaded_by: appUser?.id || user.id,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: "Erro ao registrar anexo", details: insertError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      signedUrl: urlData.signedUrl,
      filePath,
      attachmentId: attachment.id,
    });
  } catch (err) {
    console.error("NPS upload URL error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}