// Cartas del segundo grupo (últimas 5) — colores y estilo independientes del primer grupo

import type { Card } from "@/lib/collection-data"

export const INITIAL_CARDS_SET2: Card[] = [
  {
    id: "card-6",
    name: "Noe", // [MODIFICADO]
    description: "Hombre justo que obedeció a Dios y sobrevivió al diluvio.", // [MODIFICADO]
    rarity: "especial",
    color: "#5dbd61", // [MODIFICADO]
    icon: "Noe", // [MODIFICADO]
    image: "/cards/Noe.jpg", // [MODIFICADO]
    collected: false,
  },
  {
    id: "card-7",
    name: "Animales",
    description: "Fueron preservados en parejas para repoblar la Tierra después del diluvio.",
    rarity: "especial",
    color: "#5dbd61", // [MODIFICADO]
    icon: "Animales",
    image: "/cards/animales.jpg",
    collected: false,
  },
  {
    id: "card-8",
    name: "Arca",
    description: "Gran barco construido para salvar a Noé, su familia y los animales.",
    rarity: "legendaria",
    color: "#5dbd61", // [MODIFICADO]
    icon: "Arca",
    image: "/cards/arca.jpg",
    collected: false,
  },
  {
    id: "card-9",
    name: "Enoc",
    description: "Hombre que caminó con Dios y fue llevado al cielo sin morir.",
    rarity: "rara",
    color: "#5dbd61", // [MODIFICADO]
    icon: "Enoc",
    image: "/cards/enoc.jpg",
    collected: false,
  },
  {
    id: "card-10",
    name: "Torre de Babel",
    description: "Torre donde los humanos desafiaron a Dios y sus lenguas fueron confundidas.",
    rarity: "rara",
    color: "#5dbd61", // [MODIFICADO]
    icon: "Torre de Babel",
    image: "/cards/torrebabel.jpg",
    collected: false,
  },
]
