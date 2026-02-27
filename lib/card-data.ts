// [MODIFICADO] Barrel: re-exporta colección, tableros y contactos/desafíos para compatibilidad

export type { Card } from "@/lib/collection-data"
export {
  INITIAL_CARDS,
  getRarityLabel,
  getRarityColor,
} from "@/lib/collection-data"

export type { Board } from "@/lib/boards-data"
export { INITIAL_BOARD, INITIAL_BOARDS } from "@/lib/boards-data"

export interface Contact {
  id: string
  name: string
  avatar: string
  cardsOwned: number
  /** Código del amigo para intercambio por internet; si existe, se envía la carta por API */
  remoteCode?: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  cardReward: string
  completed: boolean
}

export const INITIAL_CONTACTS: Contact[] = [
  { id: "contact-3", name: "Jesús", avatar: "J", cardsOwned: 60 },
]

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: "challenge-1",
    title: "Leer Génesis 1",
    description: "Conectate con Dios en un lugar tranquilo",
    cardReward: "card-5",
    completed: false,
  },
  {
    id: "challenge-2",
    title: "Leer Génesis 2",
    description: "Responder las preguntas del desafío",
    cardReward: "card-1",
    completed: false,
  },
  {
    id: "challenge-3",
    title: "Leer Génesis 3",
    description: "Escribir una frase o mini reflexión",
    cardReward: "card-2",
    completed: false,
  },
  {
    id: "challenge-4",
    title: "Leer Génesis 4",
    description: "Responder las preguntas del desafío",
    cardReward: "card-4",
    completed: false,
  },
  {
    id: "challenge-5",
    title: "Compartir con alguien Génesis 1-4",
    description: "Cumple los retos de este desafío",
    cardReward: "card-3",
    completed: false,
  },
  {
  id: "challenge-6",
  title: "Realizar una acción",
  description: "Durante la semana deben hacer una acción correcta aunque nadie los vea y anotarla.",
  cardReward: "card-6",
  completed: false,
  },
  {
    id: "challenge-7",
    title: "Cuidado de la naturaleza",
    description: "Cuidar la naturaleza mediante alguna acción pequeña y compartirla",
    cardReward: "card-7",
    completed: false,
  }, 
  {
    id: "challenge-8",
    title: "Lectura de Genesis 6-9",
    description: "Leer los capítulos 6-9 de Genesis y responder las preguntas del desafío",
    cardReward: "card-8",
    completed: false,
  },
] 