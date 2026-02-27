// [MODIFICADO] Código de colección: imágenes y recuadros de cartas (separado de tableros)

import { INITIAL_CARDS_SET2 } from "@/lib/card-data-2"

export interface Card {
  id: string
  name: string
  description: string
  rarity: "comun" | "rara" | "epica" | "legendaria" | "mitica" | "especial" // [MODIFICADO]
  color: string
  icon: string
  image: string
  collected: boolean
  /** 1 = primeras 5 cartas (estilo dorado), 2 = últimas 5 (estilo distinto) */
  cardSet?: 1 | 2
}

/** Primeras 5 cartas — borde/estilo grupo 1 (dorado) */
export const INITIAL_CARDS_SET1: Card[] = [
  {
    id: "card-1",
    name: "Adán",
    description: "El primer hombre, símbolo de liderazgo y responsabilidad",
    rarity: "especial",
    color: "rgba(242, 174, 73, 1)", // [MODIFICADO]
    icon: "Adán", // [MODIFICADO]
    image: "/cards/Adan.jpg", // [MODIFICADO]
    collected: false,
    cardSet: 1,
  },
  {
    id: "card-2",
    name: "Eva",
    description: "La primera mujer, simbolo de compañía y amor",
    rarity: "especial",
    color: "rgba(242, 174, 73, 1)",
    icon: "Eva",
    image: "/cards/eva.jpg", // [MODIFICADO] ruta imagen Eva desde preview
    collected: false,
    cardSet: 1,
  },
  {
    id: "card-3",
    name: "Abel", // [MODIFICADO]
    description: "Hermano menor, aquel que fue asesinado", // [MODIFICADO]
    rarity: "rara", // [MODIFICADO]
    color: "rgba(242, 174, 73, 1)",
    icon: "Abel", // [MODIFICADO]
    image: "/cards/Abel.jpg",
    collected: false,
    cardSet: 1,
  },
  {
    id: "card-4",
    name: "Caín", // [MODIFICADO]
    description: "Hermano mayor, aquel que asesinó a su hermano", // [MODIFICADO]
    rarity: "rara", // [MODIFICADO]
    color: "rgba(242, 174, 73, 1)",
    icon: "Cain", // [MODIFICADO]
    image: "/cards/Cain.jpg",
    collected: false,
    cardSet: 1,
  },
  {
    id: "card-5",
    name: "Edén",
    description: "El lugar donde todo comenzó, símbolo de orden y perfección", // [MODIFICADO]
    rarity: "legendaria",
    color: "rgba(242, 174, 73, 1)",
    icon: "Eden",
    image: "/cards/eden2.jpg",
    collected: false,
    cardSet: 1,
  },
]

/** Todas las cartas: set 1 (primeras 5) + set 2 (últimas 5 desde card-data-2) */
export const INITIAL_CARDS: Card[] = [
  ...INITIAL_CARDS_SET1,
  ...INITIAL_CARDS_SET2.map((c) => ({ ...c, cardSet: 2 as const })),
]

export function getRarityLabel(rarity: Card["rarity"]): string {
  const labels: Record<Card["rarity"], string> = {
    comun: "Comun",
    rara: "Rara",
    epica: "Epica",
    legendaria: "Legendaria",
    mitica: "Mitica",
    especial: "Especial", // [MODIFICADO]
  }
  return labels[rarity]
}

export function getRarityColor(rarity: Card["rarity"]): string {
  const colors: Record<Card["rarity"], string> = {
    comun: "bg-muted text-muted-foreground",
    rara: "bg-pastel-blue text-foreground",
    epica: "bg-pastel-lavender text-foreground",
    legendaria: "bg-pastel-pink text-foreground",
    mitica: "bg-pastel-yellow text-foreground",
    especial: "bg-[rgba(76,175,80,1)] text-white", // [MODIFICADO] background y color del Badge Especial
  }
  return colors[rarity]
}
