import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

// POST /api/complaints/[id]/attachments — Upload file to Supabase Storage
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

    // Parse multipart/form-data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Arquivo não fornecido" },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Arquivo excede o limite de 10MB" },
        { status: 400 }
      );
    }

    // Generate unique file path
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath = `${id}/${timestamp}_${sanitizedName}`;

    // Upload to Supabase Storage
    const arrayBuffer = await file.arrayBuffer();
    const { error: uploadError } = await adminClient.storage
      .from("nps-attachments")
      .upload(filePath, arrayBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      return NextResponse.json(
        { error: `Erro ao enviar arquivo: ${uploadError.message}` },
        { status: 400 }
      );
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = adminClient.storage.from("nps-attachments").getPublicUrl(filePath);

    // Lookup user profile
    const { data: userProfile } = await adminClient
      .from("users")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();

    // Create attachment record
    const { data: newAttachment, error: insertError } = await adminClient
      .from("nps_attachments")
      .insert({
        nps_record_id: id,
        file_name: file.name,
        file_url: publicUrl,
        file_type: file.type,
        file_size: file.size,
        uploaded_by: userProfile?.id ?? null,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error creating attachment record:", insertError);
      // Try to clean up uploaded file
      await adminClient.storage.from("nps-attachments").remove([filePath]);
      return NextResponse.json(
        {
          error: `Erro ao registrar anexo: ${insertError.message}`,
        },
        { status: 400 }
      );
    }

    // Log activity
    await adminClient.from("nps_activity_log").insert({
      nps_record_id: id,
      acao: "anexo",
      descricao: `Arquivo "${file.name}" anexado`,
      alterado_por: userProfile?.id ?? null,
    });

    return NextResponse.json({ attachment: newAttachment }, { status: 201 });
  } catch (err) {
    console.error(
      "Unexpected error in POST /api/complaints/[id]/attachments:",
      err
    );
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
