import { NextRequest, NextResponse } from "next/server"
import {
  createTrade,
  getTradesByToCode,
  getTradesByFromCode,
} from "@/lib/trades-store"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const toCode = searchParams.get("toCode")
  const fromCode = searchParams.get("fromCode")

  if (toCode) {
    const status = searchParams.get("status") ?? undefined
    const trades = getTradesByToCode(toCode, status as "pending" | "accepted" | "cancelled" | undefined)
    return NextResponse.json(trades)
  }

  if (fromCode) {
    const trades = getTradesByFromCode(fromCode)
    return NextResponse.json(trades)
  }

  return NextResponse.json(
    { error: "Falta toCode o fromCode" },
    { status: 400 }
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fromCode, toCode, cardId } = body

    if (!fromCode || !toCode || !cardId) {
      return NextResponse.json(
        { error: "Faltan fromCode, toCode o cardId" },
        { status: 400 }
      )
    }

    if (fromCode === toCode) {
      return NextResponse.json(
        { error: "No puedes enviarte una carta a ti mismo" },
        { status: 400 }
      )
    }

    const trade = createTrade(fromCode, toCode, cardId)
    return NextResponse.json(trade)
  } catch {
    return NextResponse.json(
      { error: "Cuerpo de la petición inválido" },
      { status: 400 }
    )
  }
}
