import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface RouteContext {
  params: Promise<{ id: string }>;
}

/** Map raw MIME type to the DB `file_type` enum accepted by the CHECK constraint. */
function mapMimeToCategory(mimeType: string): string {
  if (mimeType.startsWith("image/")) return "foto";
  if (mimeType.startsWith("video/")) return "video";
  if (mimeType.startsWith("audio/")) return "audio";
  if (mimeType === "application/pdf") return "pdf";
  if (
    mimeType.includes("presentation") ||
    mimeType.includes("powerpoint") ||
    mimeType.includes("ppt")
  )
    return "ppt";
  if (
    mimeType.includes("sheet") ||
    mimeType.includes("excel") ||
    mimeType.includes("xlsx") ||
    mimeType.includes("xls") ||
    mimeType.includes("csv")
  )
    return "excel";
  return "print";
}

// GET /api/nps/[id]/attachments — List attachments
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
      .from("nps_attachments")
      .select("*")
      .eq("nps_record_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("NPS attachments list error:", error);
      return NextResponse.json(
        { error: "Erro ao buscar anexos", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: data || [] });
  } catch (err) {
    console.error("NPS attachments GET error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST /api/nps/[id]/attachments — Upload attachment
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

    // Lookup public.users.id from auth uid (FK requires public.users id, not auth.users id)
    const { data: appUser } = await admin
      .from("users")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Arquivo não fornecido" },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
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
    const filePath = `${id}/${timestamp}-${sanitizedName}`;

    // Upload to Supabase Storage
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error: uploadError } = await admin.storage
      .from("nps-attachments")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("NPS attachment upload error:", uploadError);
      return NextResponse.json(
        { error: "Erro ao fazer upload do arquivo", details: uploadError.message },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = admin.storage
      .from("nps-attachments")
      .getPublicUrl(filePath);

    const fileUrl = urlData?.publicUrl || "";

    // Create attachment record
    const { data: attachment, error } = await admin
      .from("nps_attachments")
      .insert({
        nps_record_id: id,
        file_name: file.name,
        file_url: fileUrl,
        file_type: mapMimeToCategory(file.type),
        file_size: file.size,
        uploaded_by: appUser?.id || user.id,
      })
      .select()
      .single();

    if (error) {
      console.error("NPS attachment record error:", error);
      return NextResponse.json(
        { error: "Erro ao registrar anexo", details: error.message },
        { status: 500 }
      );
    }

    // Auto-create activity log
    await admin.from("nps_activity_log").insert({
      nps_record_id: id,
      acao: "attachment_added",
      descricao: `Anexo "${file.name}" adicionado`,
      alterado_por: appUser?.id || user.id,
    });

    return NextResponse.json({ data: attachment }, { status: 201 });
  } catch (err) {
    console.error("NPS attachments POST error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE /api/nps/[id]/attachments — Delete attachment
export async function DELETE(
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

    const { searchParams } = new URL(request.url);
    const attachmentId = searchParams.get("attachment_id");

    if (!attachmentId) {
      return NextResponse.json(
        { error: "attachment_id é obrigatório" },
        { status: 400 }
      );
    }

    // Get attachment info to delete from storage
    const { data: attachment } = await admin
      .from("nps_attachments")
      .select("file_url, file_name")
      .eq("id", attachmentId)
      .eq("nps_record_id", id)
      .single();

    // Lookup public.users.id from auth uid
    const { data: appUser } = await admin
      .from("users")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();

    if (attachment?.file_url) {
      // Extract file path from URL
      try {
        const url = new URL(attachment.file_url);
        const filePath = decodeURIComponent(
          url.pathname.split("/nps-attachments/")[1] || ""
        );
        if (filePath) {
          await admin.storage.from("nps-attachments").remove([filePath]);
        }
      } catch {
        // If URL parsing fails, continue with DB deletion
        console.warn("Could not parse file URL for storage deletion");
      }
    }

    // Delete record
    const { error } = await admin
      .from("nps_attachments")
      .delete()
      .eq("id", attachmentId)
      .eq("nps_record_id", id);

    if (error) {
      console.error("NPS attachment DELETE error:", error);
      return NextResponse.json(
        { error: "Erro ao excluir anexo" },
        { status: 500 }
      );
    }

    // Log removal in activity log
    await admin.from("nps_activity_log").insert({
      nps_record_id: id,
      acao: "attachment_removed",
      descricao: `Anexo "${attachment?.file_name || "arquivo"}" removido`,
      alterado_por: appUser?.id || user.id,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("NPS attachment DELETE error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
