import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// GET /api/nps — List all NPS records with filters & pagination
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const admin = createAdminClient();

    // Authenticate
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const categoria = searchParams.get("categoria");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = admin
      .from("nps_records")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (status) query = query.eq("status", status);
    if (categoria) query = query.eq("categoria", categoria);
    if (search) {
      query = query.or(
        `codigo.ilike.%${search}%,cliente.ilike.%${search}%,descricao.ilike.%${search}%,projeto.ilike.%${search}%`
      );
    }

    query = query.range(from, to);

    const { data, count, error } = await query;

    if (error) {
      console.error("NPS list error:", error);
      return NextResponse.json(
        { error: "Erro ao buscar registros NPS", details: error.message },
        { status: 500 }
      );
    }

    // Compute SLA fields
    const now = new Date();
    const enriched = (data || []).map((record: Record<string, unknown>) => {
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
        else sla_status = "within";
      }

      return { ...record, days_remaining, sla_status };
    });

    return NextResponse.json({
      data: enriched,
      pagination: {
        page,
        limit,
        total: count || 0,
      },
    });
  } catch (err) {
    console.error("NPS GET error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST /api/nps — Create new NPS record
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const admin = createAdminClient();

    // Authenticate
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const {
      cliente,
      descricao,
      categoria,
      originador_id,
      projeto,
      pedido,
      impacto,
      area_responsavel_id,
      responsavel_id,
      data_ocorrencia,
      sla_prazo_dias,
      nc_vinculada_id,
      severidade,
      prioridade,
      canal,
      evidencias,
      organization_id,
    } = body;

    // Validate required fields
    if (!cliente || !descricao || !categoria) {
      return NextResponse.json(
        { error: "Campos obrigatórios: cliente, descricao, categoria" },
        { status: 400 }
      );
    }

    // Auto-generate codigo: NPS-XXXXXX
    const { data: lastRecord } = await admin
      .from("nps_records")
      .select("codigo")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    let sequenceNumber = 1;
    if (lastRecord?.codigo) {
      const parts = (lastRecord.codigo as string).split("-");
      if (parts.length === 2) {
        sequenceNumber = parseInt(parts[1], 10) + 1;
      }
    }
    const codigo = `NPS-${String(sequenceNumber).padStart(6, "0")}`;

    // Compute SLA data limite
    const prazoDias = sla_prazo_dias || 30;
    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() + prazoDias);
    const sla_data_limite = dataLimite.toISOString().split("T")[0];

    const effectiveOriginador = originador_id || user.id;

    const insertData: Record<string, unknown> = {
      codigo,
      cliente,
      descricao,
      categoria,
      originador_id: effectiveOriginador,
      projeto: projeto || null,
      pedido: pedido || null,
      impacto: impacto || null,
      area_responsavel_id: area_responsavel_id || null,
      responsavel_id: responsavel_id || null,
      data_ocorrencia: data_ocorrencia || new Date().toISOString().split("T")[0],
      sla_prazo_dias: prazoDias,
      sla_data_limite,
      nc_vinculada_id: nc_vinculada_id || null,
      status: "aberto",
      severidade: severidade || "medium",
      prioridade: prioridade || "medium",
      canal: canal || "nps",
      evidencias: evidencias || [],
      organization_id: organization_id || null,
    };

    const { data: newRecord, error } = await admin
      .from("nps_records")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error("NPS create error:", error);
      return NextResponse.json(
        { error: "Erro ao criar registro NPS", details: error.message },
        { status: 500 }
      );
    }

    // Auto-create activity log
    await admin.from("nps_activity_log").insert({
      nps_record_id: newRecord.id,
      acao: "created",
      descricao: `Registro NPS ${codigo} criado`,
      alterado_por: effectiveOriginador,
    });

    return NextResponse.json({ data: newRecord }, { status: 201 });
  } catch (err) {
    console.error("NPS POST error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
