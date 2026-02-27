// [MODIFICADO] Código de tableros (separado de colección e imágenes)

export interface BoardEvent {
  title: string
  description: string
}

export interface BoardAbility {
  characterName: string
  abilityName: string
  description: string
}

export interface Board {
  id: string
  name: string
  description: string
  cardIds: string[]
  /** Los 3 eventos más destacados del tablero */
  events: BoardEvent[]
  /** Habilidades de los personajes del tablero */
  abilities: BoardAbility[]
}

export const INITIAL_BOARD: Board = {
  id: "board-1",
  name: "Tablero del Edén	",
  description: "Completa las 5 cartas del Edén para conocer el plan de Dios para el hombre.",
  cardIds: ["card-1", "card-2", "card-3", "card-4", "card-5"],
  events: [
    {
      title: "Las instrucciones de Dios",
      description: "Dios da instrucciones a Adán y Eva para que cuiden el Edén y no coman del árbol de la vida.",
    },
    {
      title: "La caída del hombre",
      description: "Adán y Eva se desvían de la palabra de Dios y caen en el pecado.",
    },
    {
      title: "El sacrificio y la promesa",
      description: "Dios promete un sacrificio para salvar al hombre del pecado.",
    },
  ],
  abilities: [
    { characterName: "Adán", abilityName: "Apoyo", description: "Como apoyo, permite que la persona que lance los dados, tenga dos oportunidades." },
    { characterName: "Eva", abilityName: "Apoyo", description: "Como apoyo, permite que la persona que lance los dados, tenga pistas sobre los resultados del dado." },
    { characterName: "Edén", abilityName: "Orden", description: "Como orden, permite que la persona que lance los dados, tenga una oportunidad de repetir el lanzamiento si es necesario." },
   ],
}

export const INITIAL_BOARDS: Board[] = [
  INITIAL_BOARD,
  {
    id: "board-2",
    name: "Tablero del Diluvio",
    description: "Completa las 5 cartas del Diluvio para conocer el plan de Dios para el hombre.",
    cardIds: ["card-6", "card-7", "card-8", "card-9", "card-10"],
    events: [
      {
        title: "Evento misterioso 1",
        description: "El primero de los eventos destacados de este tablero por descubrir.",
      },
      {
        title: "Evento misterioso 2",
        description: "El segundo evento que desbloquearás al completar el tablero.",
      },
      {
        title: "Evento misterioso 3",
        description: "El tercer evento revelará el destino de este tablero.",
      },
    ],
    abilities: [
      { characterName: "Noé", abilityName: "Habilidad oculta", description: "Se revelará al jugar el tablero del Diluvio." },
      { characterName: "Animales", abilityName: "Habilidad oculta", description: "Se revelará al jugar el tablero del Diluvio." },
      { characterName: "Arca", abilityName: "Habilidad oculta", description: "Se revelará al jugar el tablero del Diluvio." },
    ],
  },
]