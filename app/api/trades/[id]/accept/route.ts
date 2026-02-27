import { NextRequest, NextResponse } from "next/server"
import { acceptTrade } from "@/lib/trades-store"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json().catch(() => ({}))
  const toCode = body.toCode as string | undefined

  if (!toCode) {
    return NextResponse.json(
      { error: "Falta toCode en el cuerpo" },
      { status: 400 }
    )
  }

  const trade = acceptTrade(id, toCode)
  if (!trade) {
    return NextResponse.json(
      { error: "Intercambio no encontrado o ya aceptado" },
      { status: 404 }
    )
  }

  return NextResponse.json(trade)
}
