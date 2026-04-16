"use client"

import { ALL_SPECIALTIES, SPECIALTY_AREAS, getSpecialtyImageUrl } from "@/lib/conquistadores-data"
import { PillProgressBar } from "@/components/pill-progress-bar"
import { SectionPageTitle } from "@/components/section-page-title"
import { cn } from "@/lib/utils"

interface MasteriesTabProps {
  unlockedSpecialties: Record<string, boolean>
}

type MasteryStyle = {
  accent: string
  fill: string
  image: string
}

type MasteryRule =
  | {
      kind: "pool"
      options: string[]
      requiredCount: number
    }
  | {
      kind: "area-count"
      areaId: string
      requiredCount: number
    }
  | {
      kind: "area-plus-one"
      areaId: string
      areaCount: number
      extraOptions: string[]
      extraCount: number
    }
  | {
      kind: "fixed-plus-pool"
      mandatory: string[]
      pool: string[]
      poolCount: number
    }

type MasteryDefinition = {
  id: string
  name: string
  style: MasteryStyle
  rule: MasteryRule
}

function toSpecialtyId(input: string) {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/&/g, " y ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

const ALL_SPECIALTY_IDS = new Set(ALL_SPECIALTIES.map((s) => s.id))
const NAME_BY_ID: Record<string, string> = Object.fromEntries(ALL_SPECIALTIES.map((s) => [s.id, s.name]))

function idsFromNames(names: string[]) {
  return names.map(toSpecialtyId).filter((id) => ALL_SPECIALTY_IDS.has(id))
}

function areaSpecialtyIds(areaId: string) {
  const area = SPECIALTY_AREAS.find((a) => a.id === areaId)
  return area ? area.specialties.map((s) => s.id) : []
}

const MASTERY_DEFINITIONS: MasteryDefinition[] = [
  {
    id: "maestria-adra",
    name: "Maestria en ADRA",
    style: { accent: "#7c3aed", fill: "#ede9fe", image: "/specialties/areas/madra.png" },
    rule: {
      kind: "area-plus-one",
      areaId: "adra",
      areaCount: 6,
      extraOptions: idsFromNames([
        "Etnología cristiana",
        "Herencia cultural",
        "Estudio de Lenguas",
        "Temperancia",
        "Testificación de menores",
      ]),
      extraCount: 1,
    },
  },
  {
    id: "maestria-testificacion",
    name: "Maestria en Testificacion",
    style: { accent: "#2563eb", fill: "#dbeafe", image: "/specialties/areas/testificacion.png" },
    rule: {
      kind: "pool",
      requiredCount: 7,
      options: idsFromNames([
        "Arte de narrar historias cristianas",
        "Arte en títeres",
        "Arte en títeres - Avanzado",
        "Etnología cristiana",
        "Colportaje",
        "Civismo cristiano",
        "Evangelismo personal",
        "Liderazgo de menores",
        "Testificación de menores",
        "Modales cristianos",
        "Vida familiar",
        "Temperancia",
        "Lenguaje de señas",
        "Mayordomía",
        "Aventuras con Cristo",
        "Aventuras con Cristo - Avanzado",
        "Lenguaje de señas - Avanzado",
        "Marcado de Biblia",
        "Marcado de Biblia - Avanzado",
        "Predicador evangelista",
        "Predicador evangelista - Avanzado",
        "Santuario",
        "Dramatización cristiana",
        "Adoración cristiana",
        "Arte cristiano de predicar",
        "Arte cristiano de predicar - Avanzado",
        "Arqueología bíblica",
        "Braille",
        "Creacionismo",
        "Creacionismo - Avanzado",
        "Espíritu de Profecía",
        "Escatología",
        "Historiador eclesiástico",
        "Evangelismo web",
        "Evangelismo web - Avanzado",
        "Intercesor",
        "Pioneros adventistas",
      ]),
    },
  },
  {
    id: "maestria-acuatico",
    name: "Maestria en Acuática",
    style: { accent: "#0891b2", fill: "#cffafe", image: "/specialties/areas/acuatico.png" },
    rule: {
      kind: "pool",
      requiredCount: 7,
      options: idsFromNames([
        "Natación - Intermedio I",
        "Rescate acuático",
        "Kayak",
        "Canotaje",
        "Navegación",
        "Navegación a vela",
        "Remo",
        "Esquí acuático",
        "Esquí acuático - Avanzado",
        "Buceo",
        "Rescate acuático - Avanzado",
        "Saltos ornamentales",
        "Buceo con escafandra",
        "Buceo con escafandra - Avanzado",
        "Botes a motor",
        "Windsurf",
        "Wakeboard",
        "Rafting",
      ]),
    },
  },
  {
    id: "maestria-agricolas",
    name: "Maestria en Actividades Agricolas",
    style: { accent: "#65a30d", fill: "#ecfccb", image: "/specialties/areas/magricolas.png" },
    rule: { kind: "area-count", areaId: "agricolas", requiredCount: 7 },
  },
  {
    id: "maestria-domesticas",
    name: "Maestria en Actividades Domesticas",
    style: { accent: "#d97706", fill: "#fef3c7", image: "/specialties/areas/mdomesticas.png" },
    rule: { kind: "area-count", areaId: "domesticas", requiredCount: 7 },
  },
  {
    id: "maestria-manuales",
    name: "Maestria en Artes y Habilidades Manuales",
    style: { accent: "#7c3aed", fill: "#ede9fe", image: "/specialties/areas/mmanuales.png" },
    rule: { kind: "area-count", areaId: "arte-habilidades-manuales", requiredCount: 7 },
  },
  {
    id: "maestria-ecologia",
    name: "Maestria en Ecologia",
    style: { accent: "#15803d", fill: "#dcfce7", image: "/specialties/areas/ecologia.png" },
    rule: {
      kind: "fixed-plus-pool",
      mandatory: idsFromNames(["Ecología", "Conservación ambiental", "Animales en peligro de extinción"]),
      pool: idsFromNames([
        "Ecología - Avanzado",
        "Cataratas",
        "Papagayos, loros y periquitos",
        "Energía renovable",
        "Estuario",
        "Preservación de recursos hídricos",
        "Reciclaje",
        "Reciclaje - Avanzado",
      ]),
      poolCount: 4,
    },
  },
  {
    id: "maestria-deportes",
    name: "Maestria en Deportes",
    style: { accent: "#b91c1c", fill: "#fee2e2", image: "/specialties/areas/deportes.png" },
    rule: {
      kind: "pool",
      requiredCount: 7,
      options: idsFromNames([
        "Educación física",
        "Ciclismo",
        "Esquí alpino",
        "Arco y flecha",
        "Equitación",
        "Saltos ornamentales",
        "Escalada",
        "Escalada - Avanzado",
        "Espeleología",
        "Espeleología - Avanzado",
        "Arco y flecha - Avanzado",
        "Ciclismo - Avanzado",
        "Acrobacia y equilibrio",
        "Acrobacia y equilibrio - Avanzado",
        "Atletismo",
        "Esquí de fondo",
        "Skate",
        "Mountain bike",
        "Fútbol",
        "Equitación - Avanzado",
        "Rapel",
        "Rapel - Avanzado",
        "Rapel - Instructor",
        "Triatlón",
        "Triatlón - Avanzado",
        "Sóftbol",
        "Bowling",
        "Deportes paraolímpicos",
        "Fútbol sala",
        "Hándbol",
        "Patines",
        "Tenis de mesa",
        "Vóleibol",
        "Waveboarding",
      ]),
    },
  },
  {
    id: "maestria-botanica",
    name: "Maestria en Botanica",
    style: { accent: "#0f766e", fill: "#ccfbf1", image: "/specialties/areas/botanica.png" },
    rule: {
      kind: "pool",
      requiredCount: 7,
      options: idsFromNames([
        "Flores",
        "Árboles",
        "Cactus",
        "Helechos",
        "Arbustos",
        "Gramíneas",
        "Flores - Avanzado",
        "Árboles - Avanzado",
        "Algas",
        "Hierbas",
        "Eucaliptos",
        "Semillas",
        "Semillas - Avanzado",
        "Orquídeas",
        "Plantas caseras",
        "Cactus - Avanzado",
        "Orquídeas - Avanzado",
        "Palmeras",
        "Arbustos - Avanzado",
        "Briófitas",
        "Citología",
        "Fisiología vegetal",
        "Líquenes",
        "Plantas carnívoras",
      ]),
    },
  },
  { 
    id: "maestria-zoologia", 
    name: "MAESTRIA EN ZOOLOGIA", 
    style: { accent: "#0f766e", fill: "#dcfce7", image: "/specialties/areas/zoo.png" }, 
    rule: { 
      kind: "pool", 
      requiredCount: 7, 
      options: idsFromNames([ 
        "Arañas", 
        "Aves", 
        "Aves domésticas", 
        "Insectos", 
        "Mariposas y polillas", 
        "Mamíferos", 
        "Reptiles", 
        "Moluscos", 
        "Aves de mascotas", 
        "Peces", 
        "Anfibios", 
        "Felinos", 
        "Rebaños domésticos", 
        "Aves - Avanzado", 
        "Insectos - Avanzado", 
        "Mamíferos - Avanzado", 
        "Moluscos - Avanzado", 
        "Perros", 
        "Cetáceos", 
        "Mamíferos marinos", 
        "Mamíferos pequeños como mascotas", 
        "Anfibios - Avanzado", 
        "Felinos - Avanzado", 
        "Reptiles - Avanzado", 
        "Murciélagos", 
        "Murciélagos - Avanzado", 
        "Marsupiales", 
        "Gusanos", 
        "Gusanos - Avanzado", 
        "Acuarios", 
        "Equinodermos", // [MODIFICADO]
        "Fauna marina", // [MODIFICADO]
        "Hormigas", // [MODIFICADO]
        "Odonata", // [MODIFICADO]
        "Poríferos y cnidários", // [MODIFICADO]
        "Tiburones", // [MODIFICADO]
      ]), // [MODIFICADO]
    }, // [MODIFICADO]
  }, // [MODIFICADO]
  {
    id: "maestria-salud",
    name: "Maestria en Salud",
    style: { accent: "#be185d", fill: "#fce7f3", image: "/specialties/areas/msalud.png" },
    rule: {
      kind: "pool",
      requiredCount: 7,
      options: idsFromNames([
        "Salud y cura",
        "Primeros auxilios - Básico",
        "Primeros auxilios - Intermedio",
        "Primeros auxilios - Avanzado",
        "Enfermería - Básico",
        "Nutrición",
        "Nutrición - Avanzado",
        "Reanimación cardiopulmonar",
        "Rescate - Básico",
        "Digestión",
        "Huesos, músculos y articulaciones",
        "Sistema nervioso",
        "Sangre y defensa del cuerpo",
        "Heredabilidad",
        "Corazón y circulación",
        "Higiene oral",
        "Higiene oral - Avanzado",
        "Prevención de enfermedades tropicales",
        "Salud mental",
        "Sexualidad humana",
        "Sistema respiratorio",
      ]),
    },
  },
  {
    id: "maestria-recreativas",
    name: "Maestria en Actividades Recreativas",
    style: { accent: "#0369a1", fill: "#e0f2fe", image: "/specialties/areas/mrecreativas.png" },
    rule: {
      kind: "pool",
      requiredCount: 7,
      options: idsFromNames([
        "Filatelia",
        "Filatelia - Avanzado",
        "Numismática",
        "Nudos y amarras",
        "Orden cerrado",
        "Orden cerrado - Avanzado",
        "Campamento I",
        "Cometas",
        "Numismática - Avanzado",
        "Geocaching",
        "Geocaching - Avanzado",
        "Tambores y percusión",
        "Telecartofilia",
        "Telecartofilia - Avanzado",
        "Letterboxing",
        "Letterboxing - Avanzado",
        "Monociclo",
        "Viajes y turismo",
        "Viajes y turismo - Avanzado",
        "Carritos de rueditas",
        "Coleccionista",
        "Fútbol de botón",
        "Nudos y amarras - Avanzado",
        "Orden cerrado - Instructor",
        "Trompo",
      ]),
    },
  },
  {
    id: "maestria-profesionales",
    name: "Maestria en Actividades Profesionales",
    style: { accent: "#475569", fill: "#e2e8f0", image: "/specialties/areas/mprofesionales.png" },
    rule: {
      kind: "pool",
      requiredCount: 7,
      options: idsFromNames([
        "Reparación de zapatos",
        "Fotografía",
        "Mecánica automotriz",
        "Radioaficionado",
        "Dactilografía",
        "Electricidad",
        "Carpintería",
        "Corte y confección",
        "Taquigrafía",
        "Imprenta",
        "Ebanistería",
        "Encuadernación",
        "Albañilería",
        "Peluquería",
        "Empapelado de pared",
        "Contabilidad",
        "Evangelismo",
        "Gasfitería",
        "Periodismo",
        "Sastrería",
        "Pintura de paredes exteriores",
        "Pintura de paredes interiores",
        "Radioelectrónica",
        "Enseñanza",
        "Corte y confección - Avanzado",
        "Radioaficionado - Avanzado",
        "Mecánica automotriz - Avanzado",
        "Mecánica de motores pequeños",
        "Cuidado y adiestramiento de perros",
        "Soldadura",
        "Ventas",
        "Producción de video",
        "Silvicultura",
        "Administración",
        "Banderas náuticas",
        "Bibliotecología",
        "Código de semáforo",
        "Código Morse",
        "Cuidado y mantenimiento de guitarras",
        "Electrónica",
        "Intérprete del lenguaje de señas",
        "Mantenimiento de bicicletas",
        "Marketing",
        "Marketing - Avanzado",
        "Modelado textil",
        "Nociones de economía",
        "Manejo y mantenimiento de impresoras",
        "Restauración y conservación de documentos",
        "Secretariado",
        "Torno mecánico",
      ]),
    },
  },
  {
    id: "maestria-ciencia-tecnologia",
    name: "Maestria en Ciencia y Tecnologia",
    style: { accent: "#1d4ed8", fill: "#dbeafe", image: "/specialties/areas/mciencia.png" },
    rule: {
      kind: "pool",
      requiredCount: 7,
      options: idsFromNames([
        "Química",
        "Óptica",
        "Física",
        "Bioquímica",
        "Bioquímica - Avanzado",
        "Internet",
        "Internet - Avanzado",
        "Computación I - Básico",
        "Computación II - Intermedio",
        "Computación III - Regular",
        "Computación IV - Avanzado",
        "Computación V - Especializado",
        "Desarrollo de software",
        "Informática programable",
      ]),
    },
  },
  {
    id: "maestria-naturaleza-silvestre",
    name: "Maestria en Naturaleza Silvestre",
    style: { accent: "#166534", fill: "#dcfce7", image: "/specialties/areas/mnaturaleza.png" },
    rule: {
      kind: "pool",
      requiredCount: 7,
      options: idsFromNames([
        "Arte de acampar",
        "Caminata",
        "Fogatas y cocina al aire libre",
        "Orientación",
        "Pionerismo",
        "Vida silvestre",
        "Campamento en bajas temperaturas",
        "Trepar árboles",
        "Plantas silvestres comestibles",
        "Liderazgo en la naturaleza",
        "Liderazgo en la naturaleza - Avanzado",
        "Campamento IV",
        "Caminata - Avanzado",
        "Caminata con mochila",
        "Liderazgo al aire libre",
        "Liderazgo al aire libre - Avanzado",
        "Cocina en horno holandés",
        "Campamento seguro - Avanzado",
        "Caminata en la nieve",
        "Caminata en la nieve - Avanzado",
        "Caminata con mochila - Avanzado",
        "Nudos y amarras - Avanzado",
        "Construcciones rústicas",
        "Construcciones rústicas - Avanzado",
        "Orientación con GPS",
      ]),
    },
  },
]

function pickMasteryImage(definition: MasteryDefinition, unlockedSpecialties: Record<string, boolean>) {
  const unlockedFromArea = ALL_SPECIALTIES.find((s) => unlockedSpecialties[s.id] && s.areaId === "adra")
  if (definition.id === "maestria-adra" && unlockedFromArea) {
    return getSpecialtyImageUrl(unlockedFromArea)
  }
  return definition.style.image
}

function progressForRule(rule: MasteryRule, unlockedSpecialties: Record<string, boolean>) {
  if (rule.kind === "pool") {
    const unlocked = rule.options.filter((id) => unlockedSpecialties[id])
    const completed = Math.min(unlocked.length, rule.requiredCount)
    return {
      completed,
      total: rule.requiredCount,
      unlockedIds: unlocked,
      lockedIds: rule.options.filter((id) => !unlockedSpecialties[id]),
      done: completed >= rule.requiredCount,
    }
  }

  if (rule.kind === "area-count") {
    const options = areaSpecialtyIds(rule.areaId)
    const unlocked = options.filter((id) => unlockedSpecialties[id])
    const completed = Math.min(unlocked.length, rule.requiredCount)
    return {
      completed,
      total: rule.requiredCount,
      unlockedIds: unlocked,
      lockedIds: options.filter((id) => !unlockedSpecialties[id]),
      done: completed >= rule.requiredCount,
    }
  }

  if (rule.kind === "area-plus-one") {
    const areaIds = areaSpecialtyIds(rule.areaId)
    const unlockedArea = areaIds.filter((id) => unlockedSpecialties[id])
    const unlockedExtra = rule.extraOptions.filter((id) => unlockedSpecialties[id])
    const completedArea = Math.min(unlockedArea.length, rule.areaCount)
    const completedExtra = Math.min(unlockedExtra.length, rule.extraCount)
    return {
      completed: completedArea + completedExtra,
      total: rule.areaCount + rule.extraCount,
      unlockedIds: [...unlockedArea, ...unlockedExtra],
      lockedIds: [...areaIds.filter((id) => !unlockedSpecialties[id]), ...rule.extraOptions.filter((id) => !unlockedSpecialties[id])],
      done: completedArea >= rule.areaCount && completedExtra >= rule.extraCount,
    }
  }

  const unlockedMandatory = rule.mandatory.filter((id) => unlockedSpecialties[id])
  const unlockedPool = rule.pool.filter((id) => unlockedSpecialties[id])
  const completedPool = Math.min(unlockedPool.length, rule.poolCount)
  return {
    completed: unlockedMandatory.length + completedPool,
    total: rule.mandatory.length + rule.poolCount,
    unlockedIds: [...unlockedMandatory, ...unlockedPool],
    lockedIds: [...rule.mandatory.filter((id) => !unlockedSpecialties[id]), ...rule.pool.filter((id) => !unlockedSpecialties[id])],
    done: unlockedMandatory.length === rule.mandatory.length && completedPool >= rule.poolCount,
  }
}

export function MasteriesTab({ unlockedSpecialties }: MasteriesTabProps) {
  const totalMasteries = MASTERY_DEFINITIONS.length
  const unlockedMasteries = MASTERY_DEFINITIONS.filter((mastery) =>
    progressForRule(mastery.rule, unlockedSpecialties).done
  ).length
  const masteriesTabPercent = totalMasteries > 0 ? Math.round((unlockedMasteries / totalMasteries) * 100) : 0
  const masteryEntries = MASTERY_DEFINITIONS.map((mastery) => { // [MODIFICADO]
    const progress = progressForRule(mastery.rule, unlockedSpecialties) // [MODIFICADO]
    const percent = progress.total > 0 ? Math.round((progress.completed / progress.total) * 100) : 0 // [MODIFICADO]
    const previewImage = pickMasteryImage(mastery, unlockedSpecialties) // [MODIFICADO]
    return { mastery, progress, percent, previewImage } // [MODIFICADO]
  }) // [MODIFICADO]
  const obtainedMasteries = masteryEntries.filter((entry) => entry.progress.done) // [MODIFICADO]
  const pendingMasteries = masteryEntries.filter((entry) => !entry.progress.done) // [MODIFICADO]
  const orderedMasteries = [...obtainedMasteries, ...pendingMasteries] // [MODIFICADO]

  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-4">
        <SectionPageTitle>Maestrías</SectionPageTitle>
        <PillProgressBar
          label="Maestrías completadas"
          percent={masteriesTabPercent}
          current={unlockedMasteries}
          total={totalMasteries}
          unitLabel="maestrías"
        />
      </header>

      <div className="flex flex-col gap-4">
        {obtainedMasteries.length > 0 ? ( // [MODIFICADO]
          <h3 className="text-sm font-black uppercase tracking-wide text-emerald-700">Maestrias Obtenidas</h3>
        ) : null} //
        {orderedMasteries.map(({ mastery, progress, percent, previewImage }) => { // [MODIFICADO]
          return (
            <article
              key={mastery.id}
              className={cn(
                "rounded-xl border-2 p-4", // [MODIFICADO]
                progress.done // [MODIFICADO]
                  ? "border-4 ring-2 ring-emerald-400/70 shadow-[0_16px_30px_-8px_rgba(16,185,129,0.7)]" // [MODIFICADO]
                  : "bg-card" // [MODIFICADO]
              )}
              style={{
                borderColor: progress.done ? "#10b981" : mastery.style.accent, // [MODIFICADO]
                backgroundColor: progress.done ? "#ecfdf5" : mastery.style.fill, // [MODIFICADO]
              }}
            >
              <div className="mb-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-lg font-black text-foreground">{mastery.name}</h2>
                  <span
                    className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold"
                    style={{
                      backgroundColor: progress.done ? "#86efac" : "#e2e8f0",
                      color: progress.done ? "#14532d" : "#0f172a",
                    }}
                  >
                    {progress.done ? "Desbloqueada" : `${percent}%`}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="relative aspect-[1.3] w-28 overflow-hidden rounded-[42%] border-2 bg-white/40"
                    style={{ borderColor: mastery.style.accent }}
                  >
                    <img src={previewImage} alt={mastery.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-700">Progreso</p>
                    <PillProgressBar
                      percent={percent}
                      current={progress.completed}
                      total={progress.total}
                      unitLabel="especialidades"
                      fillColor={mastery.style.accent}
                      showCountRow
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {progress.unlockedIds.map((specialtyId) => {
                  const done = !!unlockedSpecialties[specialtyId]
                  return (
                    <div
                      key={`${mastery.id}-${specialtyId}`}
                      className="rounded-lg border px-2 py-2 text-xs"
                      style={
                        done
                          ? {
                              borderColor: mastery.style.accent,
                              backgroundColor: "#ffffff",
                              color: mastery.style.accent,
                            }
                          : {
                              borderColor: "#cbd5e1",
                              backgroundColor: "#f8fafc",
                              color: "#94a3b8",
                            }
                      }
                    >
                      {done ? NAME_BY_ID[specialtyId] ?? specialtyId : ""}
                    </div>
                  )
                })}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
