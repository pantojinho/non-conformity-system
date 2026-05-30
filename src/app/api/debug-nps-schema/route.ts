import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const admin = createAdminClient();

    const { data, error } = await admin
      .from('nps_records')
      .select('id, canal, prioridade, severidade, nota_nps, departamento, assunto, cliente, descricao, status')
      .limit(1);

    if (error) {
      return NextResponse.json({ error: error.message, hint: error.hint }, { status: 500 });
    }

    if (data && data.length > 0) {
      return NextResponse.json({
        exists: true,
        columns: Object.keys(data[0]),
        sample: data[0]
      });
    }

    return NextResponse.json({ exists: false, message: "No records found" });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}