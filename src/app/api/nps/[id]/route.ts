import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/nps/[id] — Get single NPS record with relations
export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const supabase = await createClient();
    const admin = createAdminClient();
    const { id } = await context.params;

    // Authenticate
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { data: record, error } = await admin
      .from("nps_records")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !record) {
      return NextResponse.json(
        { error: "Registro NPS não encontrado" },
        { status: 404 }
      );
    }

    // Fetch related data in parallel
    const [commentsRes, attachmentsRes, activityRes, actionsRes] =
      await Promise.all([
        admin
          .from("nps_comments")
          .select("*")
          .eq("nps_record_id", id)
          .order("created_at", { ascending: true }),
        admin
          .from("nps_attachments")
          .select("*")
          .eq("nps_record_id", id)
          .order("created_at", { ascending: false }),
        admin
          .from("nps_activity_log")
          .select("*")
          .eq("nps_record_id", id)
          .order("created_at", { ascending: false }),
        admin
          .from("nps_corrective_actions")
          .select("*")
          .eq("nps_record_id", id)
          .order("created_at", { ascending: false }),
      ]);

    // Fetch user names for originador and responsavel
    const userIds = [
      record.originador_id,
      record.responsavel_id,
    ].filter(Boolean) as string[];

    const uniqueUserIds = [...new Set(userIds)];
    let usersMap: Record<string, { name: string; email: string }> = {};

    if (uniqueUserIds.length > 0) {
      const { data: users } = await admin
        .from("users")
        .select("id, name, email")
        .in("id", uniqueUserIds);

      if (users) {
        usersMap = Object.fromEntries(
          users.map((u: { id: string; name: string; email: string }) => [u.id, { name: u.name, email: u.email }])
        );
      }
    }

    // Compute SLA fields
    const now = new Date();
    const slaDate = record.sla_data_limite
      ? new Date(record.sla_data_limite as string)
      : null;
    let days_remaining: number | null = null;
    let sla_status: "within" | "at_risk" | "overdue" = "within";

    if (slaDate) {
      const diffMs = slaDate.getTime() - now.getTime();
      days_remaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      if (days_remaining < 0) sla_status = "overdue";
      else if (days_remaining <= 3) sla_status = "at_risk";
    }

    const enriched = {
      ...record,
      days_remaining,
      sla_status,
      originador: usersMap[record.originador_id as string] || null,
      responsavel: usersMap[record.responsavel_id as string] || null,
    };

    return NextResponse.json({
      data: enriched,
      comments: commentsRes.data || [],
      attachments: attachmentsRes.data || [],
      activity_log: activityRes.data || [],
      corrective_actions: actionsRes.data || [],
    });
  } catch (err) {
    console.error("NPS GET [id] error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// PATCH /api/nps/[id] — Update NPS record
export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const supabase = await createClient();
    const admin = createAdminClient();
    const { id } = await context.params;

    // Authenticate
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Verify record exists
    const { data: existing, error: fetchError } = await admin
      .from("nps_records")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        { error: "Registro NPS não encontrado" },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Build update object — only allow certain fields
    const allowedFields = [
      "cliente",
      "projeto",
      "pedido",
      "categoria",
      "impacto",
      "descricao",
      "area_responsavel_id",
      "responsavel_id",
      "data_ocorrencia",
      "sla_prazo_dias",
      "sla_data_limite",
      "nc_vinculada_id",
      "status",
      "severidade",
      "prioridade",
      "canal",
      "evidencias",
      "nota_nps",
      "departamento",
      "assunto",
    ];

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    // If sla_prazo_dias is being updated, recalculate sla_data_limite
    if (body.sla_prazo_dias !== undefined) {
      const baseDate = body.data_ocorrencia
        ? new Date(body.data_ocorrencia)
        : new Date(existing.data_ocorrencia as string);
      baseDate.setDate(baseDate.getDate() + body.sla_prazo_dias);
      updateData.sla_data_limite = baseDate.toISOString().split("T")[0];
    }

    const { data: updated, error } = await admin
      .from("nps_records")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("NPS update error:", error);
      return NextResponse.json(
        { error: "Erro ao atualizar registro NPS", details: error.message },
        { status: 500 }
      );
    }

    // Track status change in activity log
    if (body.status && body.status !== existing.status) {
      await admin.from("nps_activity_log").insert({
        nps_record_id: id,
        acao: "status_change",
        descricao: `Status alterado de "${existing.status}" para "${body.status}"`,
        alterado_por: user.id,
      });
    }

    // General update activity log
    await admin.from("nps_activity_log").insert({
      nps_record_id: id,
      acao: "updated",
      descricao: "Registro atualizado",
      alterado_por: user.id,
    });

    return NextResponse.json({ data: updated });
  } catch (err) {
    console.error("NPS PATCH [id] error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// DELETE /api/nps/[id] — Delete NPS record
export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const supabase = await createClient();
    const admin = createAdminClient();
    const { id } = await context.params;

    // Authenticate
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    // Verify record exists
    const { data: existing, error: fetchError } = await admin
      .from("nps_records")
      .select("id, codigo")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        { error: "Registro NPS não encontrado" },
        { status: 404 }
      );
    }

    // Delete child records first
    await Promise.all([
      admin.from("nps_comments").delete().eq("nps_record_id", id),
      admin.from("nps_attachments").delete().eq("nps_record_id", id),
      admin.from("nps_activity_log").delete().eq("nps_record_id", id),
      admin
        .from("nps_corrective_actions")
        .delete()
        .eq("nps_record_id", id),
    ]);

    // Delete the record
    const { error } = await admin.from("nps_records").delete().eq("id", id);

    if (error) {
      console.error("NPS delete error:", error);
      return NextResponse.json(
        { error: "Erro ao excluir registro NPS", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `Registro ${existing.codigo} excluído com sucesso`,
    });
  } catch (err) {
    console.error("NPS DELETE [id] error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
