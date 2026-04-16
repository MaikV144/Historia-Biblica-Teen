import { CLASS_REQUIREMENT_SECTIONS } from "./class-requirement-sections"

export type TabId = "specialties" | "classes" | "bible" | "masteries"

export interface Specialty {
  id: string
  name: string
  areaId: string
  /** Ruta en `public/` (p. ej. `/specialties/items/mi-id.webp`) o URL absoluta */
  image?: string
}

export interface SpecialtyArea {
  id: string
  name: string
  borderClass: string
  themeColor: string
  /** Ruta en `public/` (p. ej. `/specialties/areas/mi-area.webp`) o URL absoluta */
  image?: string
  specialties: Specialty[]
}

export interface ConquistadorClass {
  id: string
  name: string
}

export type { ClassRequirementSection } from "./class-requirement-sections"
export { CLASS_REQUIREMENT_SECTIONS }

export interface BibleChallenge {
  id: string
  classId: string
  day: number
  title: string
}

export interface Mastery {
  id: string
  name: string
  requiredSpecialtyIds: string[]
}

export const CLASSES: ConquistadorClass[] = [
  { id: "amigo", name: "Amigo" },
  { id: "companero", name: "Companero" },
  { id: "explorador", name: "Explorador" },
  { id: "pionero", name: "Pionero" },
  { id: "excursionista", name: "Excursionista" },
  { id: "guia", name: "Guia" },
]

export const CLASS_REQUIREMENTS: Record<string, string[]> = {
  amigo: [
    // definido en CLASS_REQUIREMENT_SECTIONS.amigo
  ],
  companero: [
    "Repasar voto y ley con aplicacion practica",
    "Estudiar la historia del movimiento joven adventista",
    "Leer el evangelio de Lucas",
    "Memorizar 8 versiculos sobre discipulado",
    "Liderar una dinamica espiritual grupal",
    "Participar en dos proyectos de servicio",
    "Completar una acampada de fin de semana",
    "Demostrar tecnicas de orientacion con mapa y brujula",
    "Aprender tecnicas de fogata segura",
    "Demostrar filtrado o purificacion de agua",
    "Identificar 15 especies de flora o fauna",
    "Completar especialidad de Campamento I",
    "Completar especialidad de Nudos y Amarres",
    "Realizar una caminata de 8 km",
    "Demostrar conceptos de nutricion saludable",
    "Preparar menu saludable para campamento",
    "Demostrar primeros auxilios en heridas leves",
    "Participar en programa misionero local",
    "Presentar informe de lectura devocional",
    "Completar una segunda especialidad",
  ],
  explorador: [
    "Memorizar 10 pasajes biblicos de esperanza",
    "Leer el libro de Hechos",
    "Liderar una semana de culto joven",
    "Dar estudio biblico breve a un companero",
    "Participar en evangelismo publico o mision urbano",
    "Planificar y ejecutar actividad recreativa del club",
    "Completar especialidad de Senderismo",
    "Completar especialidad de Orientacion",
    "Aplicar senales de pista en salida practica",
    "Realizar caminata de 12 km",
    "Demostrar armado de refugio sencillo",
    "Practicar seguridad en clima adverso",
    "Identificar 20 especies de la naturaleza",
    "Completar especialidad de Mamiferos o Aves",
    "Demostrar reanimacion basica y manejo de emergencias",
    "Ejecutar plan de acondicionamiento fisico por 4 semanas",
    "Preparar devocional usando metodo inductivo",
    "Mantener registro de crecimiento espiritual",
    "Participar en camporee o evento de campo",
    "Completar tercera especialidad",
  ],
  orientador: [
    "Estudiar y presentar doctrina biblica fundamental",
    "Leer Romanos y Santiago",
    "Memorizar 12 textos doctrinales",
    "Dirigir clase biblica para menores",
    "Liderar un proyecto misionero trimestral",
    "Completar especialidad de Primeros Auxilios avanzados",
    "Completar especialidad de Campamento II",
    "Planificar campamento con seguridad y logistica",
    "Demostrar cocina al aire libre balanceada",
    "Dirigir caminata de 15 km con equipo",
    "Ensenar 15 nudos y usos a otra unidad",
    "Demostrar navegacion basica nocturna",
    "Completar especialidad de Ecologia",
    "Disenar actividad de conservacion ambiental",
    "Realizar charla sobre salud integral",
    "Participar en actividad deportiva oficial",
    "Liderar ceremonia civica del club",
    "Presentar bitacora de liderazgo cristiano",
    "Mentorear a un Conquistador de clase menor",
    "Completar cuarta especialidad",
  ],
  viajero: [
    "Leer Exodo, Daniel y 1 Pedro",
    "Memorizar 15 textos sobre mision y mayordomia",
    "Preparar y dirigir semana de oracion joven",
    "Planificar salida misionera fuera de tu distrito",
    "Participar en impacto social de alcance regional",
    "Completar especialidad de Supervivencia",
    "Completar especialidad de Cartografia",
    "Completar especialidad de Rescate basico",
    "Dirigir campamento de tres dias",
    "Realizar travesia de 20 km en etapas",
    "Demostrar tecnicas de senalizacion y emergencia",
    "Aplicar gestion de riesgo en actividad real",
    "Identificar 25 especies de flora y fauna",
    "Desarrollar proyecto de reciclaje en iglesia o barrio",
    "Capacitar a tu unidad en primeros auxilios",
    "Organizar jornada de salud comunitaria",
    "Ensenar especialidad a una clase menor",
    "Presentar informe de servicio anual",
    "Conducir evaluacion espiritual de tu unidad",
    "Completar quinta especialidad",
  ],
  guia: [
    "Leer el evangelio de Juan y Apocalipsis 1-14",
    "Memorizar 20 textos clave de liderazgo cristiano",
    "Preparar plan anual de discipulado juvenil",
    "Liderar un grupo pequeno por 8 semanas",
    "Coordinar proyecto misionero de alto impacto",
    "Completar especialidad de Liderazgo",
    "Completar especialidad de Campamento III",
    "Completar especialidad de Busqueda y Rescate",
    "Dirigir campamento escuela para clases menores",
    "Realizar expedicion de 24 km con plan completo",
    "Disenar y dictar modulo de orientacion avanzada",
    "Coordinar simulacro de emergencia con tu club",
    "Completar especialidad de Zoologia o Botanica",
    "Liderar iniciativa de cuidado ambiental sostenible",
    "Promover estilo de vida saludable con evidencia",
    "Capacitar instructores para nuevas unidades",
    "Dirigir ceremonia de investidura anual",
    "Presentar portafolio de liderazgo y servicio",
    "Mentorear al menos dos Conquistadores",
    "Completar sexta especialidad",
  ],
}

export function getClassRequirementLabels(classId: string): string[] {
  const sections = CLASS_REQUIREMENT_SECTIONS[classId]
  if (!sections) return CLASS_REQUIREMENTS[classId] ?? []
  return sections.flatMap((s) => s.items)
}

/** Alinea el array guardado (p. ej. localStorage) con la cantidad actual de requisitos por clase. */
export function normalizeClassRequirementChecks(
  classId: string,
  checks: boolean[] | undefined
): boolean[] {
  const n = getClassRequirementLabels(classId).length
  if (n === 0) return []
  const base = checks ?? []
  return Array.from({ length: n }, (_, i) => Boolean(base[i]))
}

function toId(input: string) {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/&/g, " y ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export type SpecialtyEntry = string | { name: string; image?: string }

function makeSpecialties(areaId: string, entries: SpecialtyEntry[]): Specialty[] {
  return entries.map((entry) => {
    if (typeof entry === "string") {
      return { id: toId(entry), name: entry, areaId }
    }
    const { name, image } = entry
    return {
      id: toId(name),
      name,
      areaId,
      ...(image ? { image } : {}),
    }
  })
}

export const SPECIALTY_AREAS: SpecialtyArea[] = [
  {
    id: "actividades-misioneras",
    name: "Actividades Misioneras",
    image: "/specialties/areas/misioneras.jpg",
    borderClass: "border-border",
    themeColor: "#5b4bff",
    specialties: makeSpecialties("actividades-misioneras", [
      {
        name: "Adoración cristiana",
        image: "/specialties/items/adoracion-cristiana.webp",
      },
      "Apocalipsis",
      "Arqueología bíblica",
      "Arte cristiano de predicar",
      "Arte cristiano de predicar - Avanzado",
      "Arte de narrar historias cristianas",
      "Arte en títeres",
      "Arte en títeres - Avanzado",
      "Audio y sonido",
      "Audio y sonido - Avanzado",
      "Aventurero para Cristo",
      "Braille",
      "Buena conducta escolar",
      "Ceremonias",
      "Civismo cristiano",
      "Creacionismo",
      "Creacionismo - Avanzado",
      "Crítico de medios",
      "Cultura Sudamericana",
      "Desfile con carros alegóricos",
      "Dramatización cristiana",
      "Educación inclusiva",
      "Escatología",
      "Espíritu de Profecía",
      "Estudio de Lenguas",
      "Estudio de Lenguas - Avanzado",
      "Etnología cristiana",
      "Evangelismo personal",
      "Evangelismo web",
      "Evangelismo web - Avanzado",
      "Historiador eclesiástico",
      "Investigador bíblico",
      "Interpretación bíblica",
      "Inteligencia emocional",
      "Lenguaje de señas",
      "Lenguaje de señas - Avanzado",
      "Liderazgo de menores",
      "Libro de Daniel",
      "Marcado de Biblia",
      "Marcado de Biblia - Avanzado",
      "Mayordomía",
      "Mensajera de Dios",
      "Pacificador - Avanzado",
      "Parábolas de Jesús",
      "Patriotismo",
      "Pioneros Adventistas",
      "Predicador evangelista",
      "Predicador evangelista - Avanzado",
      "Relaciones saludables",
      "Santuario",
      "Temperancia",
      "Testificación de menores",
      "Transmisión de adoración online",
      "Vida familiar",
    ]),
  },
  {
    id: "naturaleza",
    name: "Estudio de la Naturaleza",
    image: "/specialties/areas/naturaleza.jpg",
    borderClass: "border-border",
    themeColor: "#ffffff",
    specialties: makeSpecialties("naturaleza", [
      "Abejas y avispas",
      "Acuarios",
      "Algas",
      "Anfibios",
      "Anfibios - Avanzado",
      "Animales en peligro de extinción",
      "Animales migratorios",
      "Animales nocivos",
      "Animales nocturnos",
      "Animales venenosos",
      "Arañas",
      "Árboles",
      "Árboles - Avanzado",
      "Arbustos",
      "Arbustos - Avanzado",
      "Arenas",
      "Astronomía",
      "Astronomía - Avanzado",
      "Aves",
      "Aves - Avanzado",
      "Aves domésticas",
      "Aves mascotas",
      "Aves de rapiña",
      "Bacterias",
      "Briófitas",
      "Bromelias",
      "Cactus",
      "Cactus - Avanzado",
      "Camellos",
      "Cataratas",
      "Cetáceos",
      "Ciencia planetaria",
      "Cigarras",
      "Citología",
      "Climatología",
      "Climatología - Avanzado",
      "Compostaje casero",
      "Conservación ambiental",
      "Crustáceos",
      "Dinosaurios",
      "Ecología",
      "Ecología - Avanzado",
      "Energía renovable",
      "Equinodermos",
      "Estuarios",
      "Eucaliptos",
      "Fauna marina",
      "Felinos",
      "Felinos - Avanzado",
      "Fisiología vegetal",
      "Flores",
      "Flores - Avanzado",
      "Fósiles",
      "Gramíneas",
      "Gusanos",
      "Gusanos - Avanzado",
      "Helechos",
      "Hierbas",
      "Hongos",
      "Hormigas",
      "Insectos",
      "Insectos - Avanzado",
      "Líquenes",
      "Mamíferos",
      "Mamíferos - Avanzado",
      "Mamíferos marinos",
      "Mamíferos pequeños como mascotas",
      "Mariposas y polillas",
      "Marsupiales",
      "Mimetismo y camuflaje",
      "Moluscos",
      "Moluscos - Avanzado",
      "Murciélagos",
      "Murciélagos - Avanzado",
      "Odonata",
      "Orquídeas",
      "Orquídeas - Avanzado",
      "Palmeras",
      "Papagayos, loros y periquitos",
      "Peces",
      "Peces ornamentales",
      "Perros",
      "Plantas carnívoras",
      "Plantas caseras",
      "Plantas silvestres comestibles",
      "Poríferos y cnidarios",
      "Preservación de recursos hídricos",
      "Primates",
      "Protozoarios",
      "Rastreo de animales",
      "Rastreo de animales - Avanzado",
      "Rebaños domésticos",
      "Reciclaje",
      "Reciclaje - Avanzado",
      "Reptiles",
      "Reptiles - Avanzado",
      "Rocas y minerales",
      "Rocas y minerales - Avanzado",
      "Semillas",
      "Semillas - Avanzado",
      "Suelos",
      "Tiburones",
      "Tortugas",
      "Virus",
      "Volcanes",
    ]),
  },
  {
    id: "arte-habilidades-manuales",
    name: "Arte y Habilidades Manuales",
    image: "/specialties/areas/manuales.jpg",
    borderClass: "border-border",
    themeColor: "#38bdf8",
    specialties: makeSpecialties("arte-habilidades-manuales", [
      "Aeromodelismo",
      "Álbum de recortes",
      "Álbum de recortes - Avanzado",
      "Alfarería",
      "Amigurumi",
      "Arte con hilo",
      "Arte de hacer esteras",
      "Arte de trenzar",
      "Arte de trenzar - Avanzado",
      "Arte Digital",
      "Arte en telar",
      "Automodelismo",
      "Batik",
      "Biscuit",
      "Bordado en punto cruz",
      "Bordados",
      "Carrera de autitos de madera",
      "Cerámica",
      "Cestería",
      "Construcciones nativas",
      "Croché",
      "Croché - Avanzado",
      "Cultura nativa",
      "Cultura nativa - Avanzado",
      "Decoración",
      "Decoración con flores",
      "Decoración de tortas",
      "Decoupage",
      "Dibujo vectorial",
      "Dibujo y pintura",
      "Envoltorio",
      "Escultura",
      "Esmaltado en cobre",
      "Estampado con molde",
      "EVA",
      "Fabricación de velas",
      "Faros",
      "Filigrana",
      "Filigrana - Avanzado",
      "Fotografía digital",
      "Fuxico",
      "Genealogía",
      "Globos aeroestáticos",
      "Grabado en vidrio",
      "Guitarra",
      "Guitarra - Avanzado",
      "Herencia cultural",
      "Historietas animadas",
      "Letreros y carteles",
      "Lettering",
      "Macramé",
      "Modelaje en yeso",
      "Modelaje y fabricación de jabón",
      "Modelaje y fabricación de jabón - Avanzado",
      "Modelismo espacial",
      "Modelismo espacial - Avanzado",
      "Modelismo ferroviario",
      "Modelismo naval",
      "Música - Básico",
      "Música - Intermedio",
      "Música - Avanzado",
      "Origami",
      "Origami - Avanzado",
      "Papel maché",
      "Papercraft",
      "Patchwork",
      "Pintura en tela",
      "Pintura en vidrio",
      "Pirograbado",
      "Plástico canvas",
      "Plastimodelismo",
      "Serigrafía",
      "Serigrafía - Avanzado",
      "Silbatos",
      "Tallado en madera",
      "Tallado en piedra",
      "Tapicería",
      "Tejidos",
      "Tejido",
      "Tejido - Avanzado",
      "Trabajos en acrílico",
      "Trabajos en cuero",
      "Trabajos en cuero - Avanzado",
      "Trabajos en madera",
      "Trabajos en metal",
      "Trabajos en paño lenci",
      "Trabajos en vidrio",
    ]),
  },
  {
    id: "recreacionales",
    name: "Actividades Recreativas",
    image: "/specialties/areas/recreativas.jpg",
    borderClass: "border-border",
    themeColor: "#22c55e",
    specialties: makeSpecialties("recreacionales", [
      "Acrobacia y equilibrio",
      "Arco y flecha",
      "Arte de acampar",
      "Atletismo",
      "Básquetbol",
      "Bowling",
      "Buceo",
      "Canotaje",
      "Caminata",
      "Caminata - Avanzado",
      "Caminata con mochila",
      "Caminata con mochila - Avanzado",
      "Campamento I",
      "Campamento II",
      "Campamento III",
      "Campamento IV",
      "Campamento en bajas temperaturas",
      "Campamento seguro",
      "Campamento seguro - Avanzado",
      "Campamento consciente",
      "Camporí seguro",
      "Canicas",
      "Carritos de rueditas",
      "Ciclismo",
      "Ciclismo - Avanzado",
      "Cocina en horno holandés",
      "Cocina segura",
      "Coleccionista",
      "Cometas",
      "Comida de supervivencia",
      "Construcción de canoas",
      "Construcciones rústicas",
      "Cubo de Rubik",
      "Tenis de mesa",
      "Deportes paralímpicos",
      "Educación física",
      "Equitación",
      "Escalada",
      "Escalada - Avanzado",
      "Espeleología",
      "Espeleología - Avanzado",
      "Esquí acuático",
      "Esquí alpino",
      "Evolución en orden cerrado",
      "Filatelia",
      "Fogatas y cocina al aire libre",
      "Fútbol",
      "Fútbol de botones",
      "Fútbol sala",
      "Geocaching",
      "Geocaching - Avanzado",
      "Grandes construcciones rústicas",
      "Hándbol",
      "Intercambio de pines",
      "Kayak",
      "Letterboxing",
      "Liderazgo al aire libre",
      "Liderazgo al aire libre - Avanzado",
      "Liderazgo en la naturaleza",
      "Liderazgo en la naturaleza - Avanzado",
      "Monociclo",
      "Mountain bike",
      "Natación - Principiante I",
      "Natación - Principiante II",
      "Natación - Intermedio I",
      "Natación - Intermedio II",
      "Natación - Avanzado",
      "Navegación",
      "Navegación a vela",
      "Nudos y amarras",
      "Nudos y amarras - Avanzado",
      "Numismática",
      "Numismática - Avanzado",
      "Orden cerrado",
      "Orden cerrado - Avanzado",
      "Orden cerrado - Instructor",
      "Orientación",
      "Orientación con GPS",
      "Patines",
      "Pionerismo",
      "Rafting",
      "Rápel",
      "Rápel - Avanzado",
      "Rápel - Instructor",
      "Remo",
      "Rescate acuático",
      "Rescate acuático - Avanzado",
      "Saltos ornamentales",
      "Seguridad básica en el agua",
      "Sendero de señales",
      "Skate",
      "Slackline",
      "Sóftbol",
      "Supervivencia en la naturaleza",
      "Tambores y percusión",
      "Telecartofilia",
      "Trepar árboles",
      "Triatlón",
      "Trompo",
      "Viajes y turismo",
      "Viajes y turismo - Avanzado",
      "Vida silvestre",
      "Vóleibol",
      "Wakeboard",
      "Waveboarding",
      "Windsurf",
    ]),
  },
  {
    id: "salud-ciencia",
    name: "Ciencia y Salud",
    image: "/specialties/areas/cienciaysalud.jpg",
    borderClass: "border-border",
    themeColor: "#7c3aed",
    specialties: makeSpecialties("salud-ciencia", [
      "Alerta Roja",
      "Anatomía cristiana",
      "Bioquímica",
      "Científicos cristianos",
      "Corazón y circulación",
      "Digestión",
      "Enfermería básico",
      "Experimentos científicos",
      "Física",
      "Habilidad matemática I",
      "Habilidad matemática II",
      "Heredibilidad",
      "Higiene oral",
      "Higiene oral - Avanzado",
      "Huesos, músculos y articulaciones",
      "Metodología de estudio",
      "Microscopía",
      "Nutrición",
      "Nutrición - Avanzado",
      "Óptica",
      "Patrimonio histórico",
      "Plantas medicinales",
      "Prevención de enfermedades tropicales",
      "Primeros auxilios - Básico",
      "Primeros auxilios - Intermedio",
      "Primeros auxilios - Avanzado",
      "Química",
      "Reanimación cardiopulmonar",
      "Remedios naturales",
      "Rescate básico",
      "Salud mental",
      "Salud y cura",
      "Sangre y defensa del cuerpo",
      "Sexualidad humana",
      "Sistema nervioso",
      "Sistema respiratorio",
      "Tránsito seguro",
      "Vacunas",
      "Zoonosis",
    ]),
  },
  {
    id: "agricolas",
    name: "Actividades Agrícolas",
    image: "/specialties/areas/agricolas.jpg",
    borderClass: "border-border",
    themeColor: "#8b5e34",
    specialties: makeSpecialties("agricolas", [
      "Agricultura",
      "Agricultura familiar de subsistencia",
      "Apicultura",
      "Avicultura",
      "Cría de caballos",
      "Cría de cabras",
      "Cría de ovejas",
      "Cría de palomas",
      "Fruticultura I",
      "Fruticultura II",
      "Floricultura",
      "Ganadería",
      "Ganadería lechera",
      "Jardinería y horticultura",
      "Pesca",
      "Paisajismo",
    ]),
  },
  {
    id: "profesionales",
    name: "Actividades Profesionales",  
    image: "/specialties/areas/profesionales.jpg",
    borderClass: "border-border",
    themeColor: "#ef4444",
    specialties: makeSpecialties("profesionales", [
      "Administración",
      "Albañilería",
      "Bibliotecología",
      "Blogs",
      "Carpintería",
      "Código de semáforo",
      "Código morse",
      "Computación I - Básico",
      "Computación II - Intermedio",
      "Computación III - Regular",
      "Computación IV - Avanzado",
      "Computación V - Especializado",
      "Contabilidad",
      "Corte y confección",
      "Corte y confección - Avanzado",
      "Cuidado y adiestramiento de perros",
      "Cuidado y mantenimiento de guitarras",
      "Desarrollo de software",
      "Diseñador web - Básico",
      "Diseñador web - Avanzado",
      "Ebanistería",
      "Electricidad",
      "Electrónica",
      "Empapelado de pared",
      "Encuadernación",
      "Ensamblaje y mantenimiento de computadoras",
      "Enseñanza",
      "Evangelismo",
      "Fotografía",
      "Gasfitería",
      "Imprenta",
      "Informática programable",
      "Internet",
      "Internet - Avanzado",
      "Intérprete de lenguaje de señas",
      "Logística",
      "Manejo y mantenimiento de impresoras",
      "Mantenimiento de bicicletas",
      "Marketing",
      "Marketing - Avanzado",
      "Mecánica automotriz",
      "Mecánica de motores pequeños",
      "Modelado textil",
      "Nociones de economía",
      "Nociones de derecho",
      "Peluquería",
      "Periodismo",
      "Pintura de paredes exteriores",
      "Pintura de paredes interiores",
      "Producción de video",
      "Radioaficionado",
      "Reparación de zapatos",
      "Restauración y conservación de documentos",
      "Sastrería",
      "Secretariado",
      "Seguridad contra incendios",
      "Seguridad en redes sociales",
      "Silvicultura",
      "Soldadura",
      "Taquigrafía",
      "Ventas",
    ]),
  },
  {
    id: "domesticas",
    name: "Actividades Domésticas",
    image: "/specialties/areas/domesticas.jpg",
    borderClass: "border-border",
    themeColor: "#f97316",
    specialties: makeSpecialties("domesticas", [
      "Producción de pizzas",
      "Arte culinario",
      "Técnicas de Lavandería",
      "Cuidado del bebé",
      "Atención y aseo del hogar",
      "Técnicas de conservación",
      "Presupuesto familiar",
      "Panificación",
      "Arte culinario Avanzado",
      "Costura básica",
      "Comidas típicas",
      "Alimentos congelados",
      "Deshidratación de alimentos",
    ]),
  },
  {
    id: "adra",
    name: "ADRA (Servicio y Acción Comunitaria)",
    image: "/specialties/areas/adra.jpg",
    borderClass: "border-border",
    themeColor: "#a78bfa",
    specialties: makeSpecialties("adra", [
      "Alfabetización",
      "Alivio del hambre",
      "Desarrollo comunitario",
      "Evaluación de la comunidad",
      "Reasentamiento de refugiados",
      "Resolución de conflictos",
      "Respuesta a emergencias y desastres",
      "Respuesta a emergencias y desastres - Avanzado",
      "Servicio comunitario",
    ]),
  },
]

export const ALL_SPECIALTIES = SPECIALTY_AREAS.flatMap((area) => area.specialties)

/**
 * Apartado central para PNG de TODAS las especialidades (490).
 * Cada id queda listo para su imagen en:
 * `public/specialties/items/{id}.png`
 * Puedes sobrescribir una ruta puntual editando este objeto o usando `SPECIALTY_IMAGE_OVERRIDES`.
 */ // [MODIFICADO]
export const SPECIALTY_PNG_IMAGE_PATHS: Record<string, string> = Object.fromEntries( // [MODIFICADO]
  ALL_SPECIALTIES.map((specialty) => [specialty.id, `/specialties/items/${specialty.id}.png`]) // [MODIFICADO]
) as Record<string, string> // [MODIFICADO]

/** Convención: coloca archivos en `public/specialties/areas/{id}.jpg` (o .webp / .png). */
export function specialtyAreaAssetPath(areaId: string) {
  return `/specialties/areas/${areaId}.jpg`
}

/** Convención: coloca archivos en `public/specialties/items/{specialtyId}.png`. El id es el generado por `toId(nombre)`. */ // [MODIFICADO]
export function specialtyItemAssetPath(specialtyId: string) {
  return `/specialties/items/${specialtyId}.png` // [MODIFICADO]
}

/**
 * Imágenes por id de área. Orden de resolución:
 * 1) `area.image` en el objeto del área
 * 2) esta tabla
 * 3) ruta por convención `specialtyAreaAssetPath`
 */
export const AREA_IMAGE_OVERRIDES: Partial<Record<string, string>> = {
  // "salud-ciencia": "/specialties/areas/ciencia-salud.webp",
}

/**
 * Imágenes por id de especialidad (`toId`). Tiene prioridad tras `specialty.image` del objeto.
 */
export const SPECIALTY_IMAGE_OVERRIDES: Partial<Record<string, string>> = {
  // [toId("Campamento I")]: "/specialties/items/campamento-i.webp",
}

export function getAreaImageUrl(area: SpecialtyArea): string {
  const fromArea = area.image?.trim()
  if (fromArea) return fromArea
  const fromMap = AREA_IMAGE_OVERRIDES[area.id]?.trim()
  if (fromMap) return fromMap
  return specialtyAreaAssetPath(area.id)
}

/** Orden: `specialty.image` → `SPECIALTY_IMAGE_OVERRIDES[id]` → `specialtyItemAssetPath(id)` */
export function getSpecialtyImageUrl(specialty: Specialty): string {
  const fromSpec = specialty.image?.trim()
  if (fromSpec) return fromSpec
  const fromMap = SPECIALTY_IMAGE_OVERRIDES[specialty.id]?.trim()
  if (fromMap) return fromMap
  const fromPngSection = SPECIALTY_PNG_IMAGE_PATHS[specialty.id]?.trim() // [MODIFICADO]
  if (fromPngSection) return fromPngSection // [MODIFICADO]
  return specialtyItemAssetPath(specialty.id)
}

const BIBLE_READING_BY_CLASS: Record<string, string[]> = { // [MODIFICADO]
  amigo: [ // [MODIFICADO]
    "Gn 1", "Gn 2", "Gn 3", "Gn 4:1-16", "Gn 6:11-22", "Gn 7", "Gn 8", "Gn 9:1-19", "Gn 11:1-9", "Gn 12:1-10", // [MODIFICADO]
    "Gn 13", "Gn 14:18-24", "Gn 15", "Gn 17:1-8; 15-22", "Gn 18:1-15", "Gn 18:16-33", "Gn 19:1-29", "Gn 21:1-21", "Gn 22:1-19", "Gn 23", // [MODIFICADO]
    "Gn 24:1-46,48", "Gn 24:52-67", "Gn 27", "Gn 28", "Gn 29", "Gn 30:25-31; 31:2-3,17-18", "Gn 32", "Gn 33", "Gn 37", "Gn 39", // [MODIFICADO]
    "Gn 40", "Gn 41", "Gn 42", "Gn 43", "Gn 44", "Gn 45", "Gn 47", "Gn 50", "Éx 1", "Éx 2", // [MODIFICADO]
    "Éx 3", "Éx 4:1-17; 27-31", "Éx 5", "Éx 7", "Éx 8", "Éx 9", "Éx 10, 11", "Éx 12", "Éx 13:17-22; 14", "Éx 15:22-27; 16", // [MODIFICADO]
    "Éx 17", "Éx 18", "Éx 19", "Éx 20", "Éx 24", "Éx 32", "Éx 33", "Éx 34:1-14,29-35", "Éx 35:4-29; 40", // [MODIFICADO]
  ], // [MODIFICADO]
  companero: [ // [MODIFICADO]
    "Lv 11", "Nm 9:15-23", "Nm 11", "Nm 12", "Nm 13", "Nm 14:1-38", "Nm 16", "Nm 17", "Nm 20:1-13; 22-29", "Nm 21:4-9", // [MODIFICADO]
    "Nm 22", "Nm 23; 24:1-10", "Dt 1:1-17, 4:1-8", "Dt 32:1-43", "Dt 33", "Dt 34", "Js 1", "Js 2", "Js 3", "Js 4", // [MODIFICADO]
    "Js 5:10; 6", "Js 7", "Js 9", "Js 24:1-15; 29", "Jz 6", "Jz 7", "Jz 13:1-18; 14", "Jz 15", "Jz 16", "Rt 1", // [MODIFICADO]
    "Rt 2,3", "Rt 4", "1 Sm 1", "1 Sm 2", "1 Sm 3", "1 Sm 4", "1 Sm 5", "1 Sm 6", "1 Sm 8", "1 Sm 9", // [MODIFICADO]
    "1 Sm 10;11:12-15", "1 Sm 12", "1 Sm 13", "1 Sm 15", "1 Sm 16", "1 Sm 17", "1 Sm 18:1-19", "1 Sm 20", "1 Sm 21:1-7; 22", "1 Sm 24", // [MODIFICADO]
    "1 Sm 25", "1 Sm 26", "1 Sm 31", "2 Sm 1", "2 Sm 5", "2 Sm 6", "2 Sm 7", "2 Sm 9", "2 Sm 11; 12:1-25", "2 Sm 15", // [MODIFICADO]
    "2 Sm 18", // [MODIFICADO]
  ], // [MODIFICADO]
  explorador: [ // [MODIFICADO]
    "Primer Libro de los Reyes 1:28-53", "Primer Libro de los Reyes 3", "Primer Libro de los Reyes 4:20-34", "Primer Libro de los Reyes 5-6", "Primer Libro de los Reyes 8:12-60", // [MODIFICADO]
    "Primer Libro de los Reyes 10", "Primer Libro de los Reyes 11:6-43", "Primer Libro de los Reyes 12", "Primer Libro de los Reyes 16:29-33; 17:1-7", "Primer Libro de los Reyes 17:8-24", // [MODIFICADO]
    "Primer Libro de los Reyes 18", "Primer Libro de los Reyes 19", "Primer Libro de los Reyes 21", "Segundo Libro de los Reyes 2", "Segundo Libro de los Reyes 4:1-7", // [MODIFICADO]
    "Segundo Libro de los Reyes 4:8-41", "Segundo Libro de los Reyes 5", "Segundo Libro de los Reyes 6:1-23", "Segundo Libro de los Reyes 6:24-33; 7", "Segundo Libro de los Reyes 20", // [MODIFICADO]
    "Segundo Libro de los Reyes 22", "Segundo Libro de los Reyes 23:36-37; 24; 25:1-7", "Segundo Libro de Crónicas 24:1-14", "Segundo Libro de Crónicas 36", "Libro de Esdras 1", // [MODIFICADO]
    "Libro de Esdras 3; 6:14-15", "Libro de Nehemías 1", "Libro de Nehemías 2", "Libro de Nehemías 4", "Libro de Nehemías 8", // [MODIFICADO]
    "Libro de Ester 1", "Libro de Ester 2", "Libro de Ester 3", "Libro de Ester 4", "Libro de Ester 5", "Libro de Ester 6", "Libro de Ester 7-8", // [MODIFICADO]
    "Libro de Job 1", "Libro de Job 2", "Libro de Job 42", "Libro de los Salmos 1; 15; 19", "Libro de los Salmos 23; 24; 27", // [MODIFICADO]
    "Libro de los Salmos 37", "Libro de los Salmos 39", "Libro de los Salmos 42", "Libro de los Salmos 46", "Libro de los Salmos 67", // [MODIFICADO]
    "Libro de los Salmos 90; 91", "Libro de los Salmos 92; 97", "Libro de los Salmos 98; 100; 117", "Libro de los Salmos 119:1-80", "Libro de los Salmos 119:81-176", // [MODIFICADO]
    "Libro de los Salmos 121; 125; 150", "Libro de Proverbios 1", "Libro de Proverbios 3", "Libro de Proverbios 4", "Libro de Proverbios 10", // [MODIFICADO]
    "Libro de Proverbios 15", "Libro de Proverbios 20", "Libro de Proverbios 25", "Libro de Eclesiastés 1", // [MODIFICADO]
  ], // [MODIFICADO]
  pionero: [ // [MODIFICADO]
    "Ec 3", "Ec 5", "Ec 7", "Ec 11,12", "Is 5", "Is 11", "Is 26:1-12; 35", "Is 40", "Is 43", "Is 52:13-15; 53", // [MODIFICADO]
    "Is 58", "Is 60", "Is 61", "Jr 9:23-26", "Jr 10:1-16", "Jr 18:1-6", "Jr 26", "Jr 36", "Jr 52:1-11", "Dn 1", // [MODIFICADO]
    "Dn 2", "Dn 3", "Dn 4", "Dn 5", "Dn 6", "Dn 7", "Dn 8", "Dn 9", "Dn 10", "Dn 11", "Dn 12", // [MODIFICADO]
    "Joel 2:12-31", "Am 7:10-16; 8:4-11", "Jon 1", "Jon 2", "Jn 3 y 4", "Mq 4", "Ag 2", "Zc 4", "Mt 3,4", // [MODIFICADO]
    "Mt 1", "Mt 2", "Mt 3", "Mt 4", "Mt 5", "Mt 6", "Mt 7", "Mt 8", "Mt 9", "Mt 10", // [MODIFICADO]
    "Mt 11", "Mt 12", "Mt 13", "Mt 14", "Mt 15", "Mt 16", "Mt 17", "Mt 18", "Mt 19", "Mt 20", // [MODIFICADO]
    "Mt 21", "Mt 22", "Mt 23", // [MODIFICADO]
  ], // [MODIFICADO]
  excursionista: [ // [MODIFICADO]
    "Mt 24", "Mt 25", "Mt 26:1-35", "Mt 26:36-75", "Mt 27:1-31", "Mt 27:32-56", "Mt 27:57-66", "Mt 28", "Mr 7", "Mr 9", // [MODIFICADO]
    "Mr 10", "Mr 11", "Mr 12", "Mr 16", "Lc 1:4-25", "Lc 1:26-66", "Lc 2:21-38", "Lc 2:39-52", "Lc 7:18-28", "Lc 8", // [MODIFICADO]
    "Lc 10:1-37", "Lc 10:38-42;11:1-13", "Lc 12", "Lc 13", "Lc 14", "Lc 15", "Lc 16:1-17", "Lc 17", "Lc 18", "Lc 19", // [MODIFICADO]
    "Lc 21", "Lc 22", "Lc 23", "Lc 24", "Jn 1", "Jn 2", "Jn 3", "Jn 4", "Jn 5", "Jn 6:1-21", // [MODIFICADO]
    "Jn 6:22-71", "Jn 8:1-38", "Jn 9", "Jn 10", "Jn 11:1-46", "Jn 12", "Jn 13", "Jn 14", "Jn 15", "Jn 17", // [MODIFICADO]
    "Jn 18", "Jn 19", "Jn 20", "Jn 21", "He 1", "He 2", "He 3", "He 4", "He 5", "He 6", "He 7", "He 8", // [MODIFICADO]
  ], // [MODIFICADO]
  guia: [ // [MODIFICADO]
    "He 9:1-31", "He 9:32-43", "He 10", "He 11", "He 12", "He 13", "He 14", "He 16", "He 17:1-15", "He 17:16-34", // [MODIFICADO]
    "He 18", "He 19:1-22", "He 19:23-41", "He 20", "He 21:17-40; 22:1-16", "He 23", "He 24", "He 25", "He 26", "He 27", // [MODIFICADO]
    "He 28", "Rm 12", "Rm13,14", "1 Co 13", "2 Co 5:11-21", "2 Co 11:16-33; 12:1-10", "Gal 5:16-26; 6:1-10", "Ef 5:1-21", "Ef 6", "Fil 4", // [MODIFICADO]
    "Col 3", "1Ts 4:13-18", "1 Ts 5", "2 Ts 2, 3", "1Tm 4:6-16", "1 Tm 5:1-16; 6:11-21", "2 Tm 2", "2 Tm 3", "Flm", "Hb 11", // [MODIFICADO]
    "Stg l", "Stg 3", "Stg 5:7-20", "1 Pe 1", "1 Pe 5:1-11", "2 Pe 3", "1 Jn 2", "1 Jn 3", "1 Jn 4", "1 Jn 5", // [MODIFICADO]
    "Jd 1:17-25", "Ap 1", "Ap 2", "Ap 3", "Ap 7:9-17", "Ap 12", "Ap 13", "Ap 14", "Ap 19", "Ap 20", "Ap 21", // [MODIFICADO]
  ], // [MODIFICADO]
} // [MODIFICADO]

export const BIBLE_CHALLENGES: BibleChallenge[] = CLASSES.flatMap((item) => // [MODIFICADO]
  (BIBLE_READING_BY_CLASS[item.id] ?? []).map((title, index) => ({ // [MODIFICADO]
    id: `${item.id}-dia-${index + 1}`, // [MODIFICADO]
    classId: item.id, // [MODIFICADO]
    day: index + 1, // [MODIFICADO]
    title, // [MODIFICADO]
  })) // [MODIFICADO]
) // [MODIFICADO]

export const MASTERIES: Mastery[] = [
  {
    id: "maestria-naturaleza",
    name: "Naturaleza",
    requiredSpecialtyIds: [
      toId("Dinosaurios"),
      toId("Fósiles"),
      toId("Mamíferos"),
      toId("Aves"),
      toId("Ecología"),
      toId("Rocas y minerales"),
    ],
  },
  {
    id: "maestria-salud",
    name: "Salud",
    requiredSpecialtyIds: [
      toId("Nutrición"),
      toId("Primeros auxilios - Básico"),
      toId("Higiene oral"),
      toId("Salud mental"),
      toId("Microscopía"),
      toId("Prevención de enfermedades tropicales"),
    ],
  },
  {
    id: "maestria-aire-libre",
    name: "Aire Libre",
    requiredSpecialtyIds: [
      toId("Campamento I"),
      toId("Caminata con mochila"),
      toId("Nudos y amarras"),
      toId("Orientación"),
      toId("Supervivencia en la naturaleza"),
      toId("Sendero de señales"),
    ],
  },
  {
    id: "maestria-deporte",
    name: "Deporte",
    requiredSpecialtyIds: [
      toId("Atletismo"),
      toId("Natación - Avanzado"),
      toId("Ciclismo - Avanzado"),
      toId("Escalada - Avanzado"),
      toId("Equitación"),
      toId("Vóleibol"),
    ],
  },
  {
    id: "maestria-zoologia",
    name: "Zoologia",
    requiredSpecialtyIds: [
      toId("Mamíferos"),
      toId("Aves"),
      toId("Insectos"),
      toId("Reptiles"),
      toId("Peces"),
      toId("Moluscos"),
    ],
  },
  {
    id: "maestria-botanica",
    name: "Botanica",
    requiredSpecialtyIds: [
      toId("Árboles"),
      toId("Flores"),
      toId("Helechos"),
      toId("Orquídeas"),
      toId("Gramíneas"),
      toId("Briófitas"),
    ],
  },
  {
    id: "maestria-profesionales",
    name: "Profesionales",
    requiredSpecialtyIds: [
      toId("Desarrollo de software"),
      toId("Electricidad"),
      toId("Diseñador web - Avanzado"),
      toId("Marketing - Avanzado"),
      toId("Seguridad en redes sociales"),
      toId("Internet - Avanzado"),
    ],
  },
  {
    id: "maestria-manualidades",
    name: "Manualidades",
    requiredSpecialtyIds: [
      toId("Origami - Avanzado"),
      toId("Bordados"),
      toId("Croché - Avanzado"),
      toId("Serigrafía - Avanzado"),
      toId("Cerámica"),
      toId("Tallado en madera"),
    ],
  },
]
