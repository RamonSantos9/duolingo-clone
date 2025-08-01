import { NextResponse } from "next/server";
import { getUnits } from "@/db/queries";

export async function GET() {
  try {
    const units = await getUnits();

    return NextResponse.json(units);
  } catch (error) {
    console.error("Erro ao buscar unidades:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
