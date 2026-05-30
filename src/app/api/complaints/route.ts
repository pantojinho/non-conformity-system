import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

// GET /api/complaints — List nps_records with filters + KPI counts
export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);

    const adminClient = createAdminClient();

    // Build base query
    let query = adminClient
      .from("nps_records")
      .select(
        `
        id,
        codigo,
        cliente,
        projeto,
        pedido,
        categoria,
        impacto,
        area_responsavel,
        responsavel_id,
        data_ocorrencia,
        descricao,
        severidade,
        sla_prazo_dias,
        sla_data_limite,
        status,
        prioridade,
        canal,
        originador_id,
        created_at,
        updated_at
      `,
        { count: "exact" }
      )
      .order("created_at", { ascending: false });

    // Apply filters
    if (status) query = query.eq("status", status);
    if (category) query = query.eq("categoria", category);
    if (search) {
      query = query.or(
        `cliente.ilike.%${search}%,projeto.ilike.%${search}%,codigo.ilike.%${search}%,descricao.ilike.%${search}%`
      );
    }

    // Pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data: records, error: fetchError, count } = await query;

    if (fetchError) {
      console.error("Error fetching complaints:", fetchError);
      return NextResponse.json(
        { error: "Erro ao buscar reclamações" },
        { status: 500 }
      );
    }

    // Fetch KPI counts in parallel
    const [totalResult, openResult, resolvedResult, overdueResult] =
      await Promise.all([
        adminClient
          .from("nps_records")
          .select("*", { count: "exact", head: true }),
        adminClient
          .from("nps_records")
          .select("*", { count: "exact", head: true })
          .in("status", ["aberto", "aberta", "em_analise", "em_andamento", "em_atendimento"]),
        adminClient
          .from("nps_records")
          .select("*", { count: "exact", head: true })
          .in("status", ["resolvido", "resolvida"]),
        adminClient
          .from("nps_records")
          .select("*", { count: "exact", head: true })
          .lt("sla_data_limite", new Date().toISOString())
          .not("status", "in", '("resolvido","resolvida","fechado","fechada","encerrada","cancelado","cancelada")'),
      ]);

    return NextResponse.json({
      records: records ?? [],
      pagination: {
        page,
        pageSize,
        total: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / pageSize),
      },
      kpis: {
        total: totalResult.count ?? 0,
        abertas: openResult.count ?? 0,
        resolvidas: resolvedResult.count ?? 0,
        atrasadas: overdueResult.count ?? 0,
      },
    });
  } catch (err) {
    console.error("Unexpected error in GET /api/complaints:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

// POST /api/complaints — Create new nps_record
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      cliente,
      projeto,
      pedido,
      categoria,
      impacto,
      area_responsavel,
      responsavel_id,
      data_ocorrencia,
      descricao,
      severidade,
      evidencias,
      sla_prazo_dias,
      nc_vinculada_id,
      prioridade,
      canal,
    } = body;

    if (!cliente || !categoria || !descricao || !data_ocorrencia) {
      return NextResponse.json(
        {
          error:
            "Campos obrigatórios: cliente, categoria, descricao, data_ocorrencia",
        },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();

    // Auto-generate codigo: NPS-XXXXXX
    const { data: maxResult } = await adminClient
      .from("nps_records")
      .select("codigo")
      .order("codigo", { ascending: false })
      .limit(1);

    let nextNumber = 1;
    if (maxResult && maxResult.length > 0 && maxResult[0].codigo) {
      const currentMax = parseInt(
        maxResult[0].codigo.replace("NPS-", ""),
        10
      );
      if (!isNaN(currentMax)) {
        nextNumber = currentMax + 1;
      }
    }
    const codigo = `NPS-${String(nextNumber).padStart(6, "0")}`;

    // Calculate SLA deadline
    const prazoDias = sla_prazo_dias ?? 7;
    const dataOcorrencia = new Date(data_ocorrencia);
    const slaDataLimite = new Date(dataOcorrencia);
    slaDataLimite.setDate(slaDataLimite.getDate() + prazoDias);

    // Lookup user profile to get originador_id
    const { data: userProfile } = await adminClient
      .from("users")
      .select("id")
      .eq("auth_user_id", user.id)
      .single();

    const { data: newRecord, error: insertError } = await adminClient
      .from("nps_records")
      .insert({
        codigo,
        cliente,
        projeto: projeto ?? null,
        pedido: pedido ?? null,
        categoria,
        impacto: impacto ?? null,
        area_responsavel: area_responsavel ?? null,
        responsavel_id: responsavel_id ?? null,
        data_ocorrencia,
        descricao,
        severidade: severidade ?? "media",
        evidencias: evidencias ?? null,
        sla_prazo_dias: prazoDias,
        sla_data_limite: slaDataLimite.toISOString(),
        nc_vinculada_id: nc_vinculada_id ?? null,
        status: "aberto",
        prioridade: prioridade ?? "media",
        canal: canal ?? "interno",
        originador_id: userProfile?.id ?? null,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error creating complaint:", insertError);
      return NextResponse.json(
        { error: `Erro ao criar reclamação: ${insertError.message}` },
        { status: 400 }
      );
    }

    // Log activity
    await adminClient.from("nps_activity_log").insert({
      nps_record_id: newRecord.id,
      acao: "criacao",
      descricao: `Reclamação ${codigo} criada`,
      alterado_por: userProfile?.id ?? null,
    });

    return NextResponse.json({ record: newRecord }, { status: 201 });
  } catch (err) {
    console.error("Unexpected error in POST /api/complaints:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
