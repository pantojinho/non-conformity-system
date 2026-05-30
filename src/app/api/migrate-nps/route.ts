import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST() {
  try {
    const admin = createAdminClient();

    const statements = [
      "ALTER TABLE public.nps_records ADD COLUMN IF NOT EXISTS nota_nps INTEGER DEFAULT 0 CHECK (nota_nps >= 0 AND nota_nps <= 10)",
      "ALTER TABLE public.nps_records ADD COLUMN IF NOT EXISTS departamento TEXT",
      "ALTER TABLE public.nps_records ADD COLUMN IF NOT EXISTS assunto TEXT"
    ];

    const results = [];
    for (const sql of statements) {
      // Supabase não tem exec_sql direto via JS client
      // Vamos tentar inserir para testar se a coluna existe
      results.push({ sql, status: "manual_required", note: "Execute via Supabase Dashboard" });
    }

    return NextResponse.json({
      message: "Execute os seguintes SQLs no Supabase Dashboard:",
      sqls: statements
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}