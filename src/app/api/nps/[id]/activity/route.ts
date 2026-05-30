import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/nps/[id]/activity — List activity log
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
      .from("nps_activity_log")
      .select("*")
      .eq("nps_record_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("NPS activity list error:", error);
      return NextResponse.json(
        { error: "Erro ao buscar log de atividades", details: error.message },
        { status: 500 }
      );
    }

    // Enrich with user names
    const entries = data || [];
    const userIds = [...new Set(entries.map((e: Record<string, unknown>) => e.alterado_por).filter(Boolean))] as string[];

    let usersMap: Record<string, string> = {};
    if (userIds.length > 0) {
      const { data: users } = await admin
        .from("users")
        .select("id, name")
        .in("id", userIds);

      if (users) {
        usersMap = Object.fromEntries(
          users.map((u: { id: string; name: string }) => [u.id, u.name])
        );
      }
    }

    const enriched = entries.map((entry: Record<string, unknown>) => ({
      ...entry,
      alterado_por_nome: usersMap[entry.alterado_por as string] || "Sistema",
    }));

    return NextResponse.json({ data: enriched });
  } catch (err) {
    console.error("NPS activity GET error:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
