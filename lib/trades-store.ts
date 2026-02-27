/**
 * Almacén de intercambios por internet.
 * En desarrollo (next dev) usa memoria en el mismo proceso.
 * Para producción con múltiples instancias, sustituir por Vercel KV o una base de datos.
 */

export type TradeStatus = "pending" | "accepted" | "cancelled"

export interface Trade {
  id: string
  fromCode: string
  toCode: string
  cardId: string
  status: TradeStatus
  createdAt: string
}

const trades: Trade[] = []

function generateId(): string {
  return `trade-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function createTrade(fromCode: string, toCode: string, cardId: string): Trade {
  const trade: Trade = {
    id: generateId(),
    fromCode,
    toCode,
    cardId,
    status: "pending",
    createdAt: new Date().toISOString(),
  }
  trades.push(trade)
  return trade
}

export function getTradesByToCode(toCode: string, status?: TradeStatus): Trade[] {
  return trades.filter(
    (t) => t.toCode === toCode && (status === undefined || t.status === status)
  )
}

export function getTradesByFromCode(fromCode: string): Trade[] {
  return trades.filter((t) => t.fromCode === fromCode)
}

export function getTradeById(id: string): Trade | undefined {
  return trades.find((t) => t.id === id)
}

export function acceptTrade(id: string, toCode: string): Trade | null {
  const trade = trades.find((t) => t.id === id)
  if (!trade || trade.status !== "pending" || trade.toCode !== toCode) return null
  trade.status = "accepted"
  return trade
}
