"use client"

import { useMemo, useState } from "react"
import { PillProgressBar } from "@/components/pill-progress-bar"
import { SectionPageTitle } from "@/components/section-page-title"
import { BIBLE_CHALLENGES, CLASSES } from "@/lib/conquistadores-data"
import { getClassCardTheme } from "@/lib/class-card-themes"
import { ClassLevelNavCard } from "@/components/class-level-nav-card"
import { cn } from "@/lib/utils"

interface BibleStudyTabProps {
  completedBibleChallenges: Record<string, boolean>
  onToggleBibleChallenge: (challengeId: string) => void
}

const BIBLE_CLASS_IMAGES: Record<string, string> = {
  amigo: "/classes/lamigo.png",
  companero: "/classes/lcompanero.png",
  explorador: "/classes/lexplorador.png",
  pionero: "/classes/lpionero.png",
  excursionista: "/classes/lexcursionista.png",
  guia: "/classes/lguia.png",
}

function mixWithWhite(hexColor: string, whiteMix = 0.86) { // [MODIFICADO]
  const hex = hexColor.replace("#", "").trim() // [MODIFICADO]
  if (hex.length !== 6) return "rgb(241 245 249)" // [MODIFICADO]
  const r = parseInt(hex.slice(0, 2), 16) // [MODIFICADO]
  const g = parseInt(hex.slice(2, 4), 16) // [MODIFICADO]
  const b = parseInt(hex.slice(4, 6), 16) // [MODIFICADO]
  const mix = Math.max(0, Math.min(1, whiteMix)) // [MODIFICADO]
  const nr = Math.round(r + (255 - r) * mix) // [MODIFICADO]
  const ng = Math.round(g + (255 - g) * mix) // [MODIFICADO]
  const nb = Math.round(b + (255 - b) * mix) // [MODIFICADO]
  return `rgb(${nr} ${ng} ${nb})` // [MODIFICADO]
} // [MODIFICADO]

export function BibleStudyTab({
  completedBibleChallenges,
  onToggleBibleChallenge,
}: BibleStudyTabProps) {
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null)

  const totalChallenges = BIBLE_CHALLENGES.length
  const completedTotal = BIBLE_CHALLENGES.filter((challenge) => completedBibleChallenges[challenge.id]).length
  const totalPercent = totalChallenges > 0 ? Math.round((completedTotal / totalChallenges) * 100) : 0

  const selectedClass = CLASSES.find((item) => item.id === selectedClassId)

  if (selectedClass) {
    const challenges = BIBLE_CHALLENGES.filter((challenge) => challenge.classId === selectedClass.id)
    const completed = challenges.filter((challenge) => completedBibleChallenges[challenge.id]).length
    const percent = challenges.length > 0 ? Math.round((completed / challenges.length) * 100) : 0
    const theme = getClassCardTheme(selectedClass.id)
    const image = BIBLE_CLASS_IMAGES[selectedClass.id] || theme.bannerImage
    const doneBg = mixWithWhite(theme.accent, 0.82) // [MODIFICADO]
    const pendingBg = mixWithWhite(theme.accent, 0.92) // [MODIFICADO]

    return (
      <section className="flex flex-col gap-5">
        <button
          type="button"
          onClick={() => setSelectedClassId(null)}
          className="flex w-full max-w-[14rem] items-center gap-2 rounded-xl border-2 border-border bg-card px-4 py-3 text-left text-sm font-extrabold text-foreground shadow-sm transition-colors hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <span className="text-lg leading-none" aria-hidden>
            ←
          </span>
          Todas las clases
        </button>

        <header className="flex flex-col gap-4">
          <SectionPageTitle>Lectura Biblica - {selectedClass.name}</SectionPageTitle>
          <div className="relative h-36 overflow-hidden rounded-2xl border-2" style={{ borderColor: theme.accent }}>
            <img src={image} alt={selectedClass.name} className="h-full w-full object-cover" />
          </div>
          <PillProgressBar
            label="Capitulos leidos"
            percent={percent}
            current={completed}
            total={challenges.length}
            unitLabel="capitulos"
            fillColor={theme.accent}
          />
        </header>

        <div className="grid grid-cols-1 gap-2">
          {challenges.map((challenge) => {
            const done = !!completedBibleChallenges[challenge.id]
            return (
              <button
                key={challenge.id}
                type="button"
                onClick={() => onToggleBibleChallenge(challenge.id)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                  done ? "text-foreground" : "text-muted-foreground hover:bg-muted"
                )}
                style={
                  done
                    ? {
                        borderColor: theme.accent,
                        backgroundColor: doneBg, // [MODIFICADO]
                      }
                    : { // [MODIFICADO]
                        borderColor: theme.accent, // [MODIFICADO]
                        backgroundColor: pendingBg, // [MODIFICADO]
                      } // [MODIFICADO]
                }
              >
                Capitulo {challenge.day}: {challenge.title}
              </button>
            )
          })}
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-4">
        <SectionPageTitle>Desafíos de estudio bíblico</SectionPageTitle>
        <PillProgressBar
          label="Progreso global de Biblia"
          percent={totalPercent}
          current={completedTotal}
          total={totalChallenges}
          unitLabel="capitulos"
        />
      </header>

      <div className="flex flex-col gap-3">
        {CLASSES.map((item) => {
          const challenges = BIBLE_CHALLENGES.filter((challenge) => challenge.classId === item.id)
          const completed = challenges.filter((challenge) => completedBibleChallenges[challenge.id]).length
          const percent = challenges.length > 0 ? Math.round((completed / challenges.length) * 100) : 0
          const theme = getClassCardTheme(item.id)
          const doneClass = completed === challenges.length && challenges.length > 0
          return (
            <ClassLevelNavCard
              key={item.id}
              name={item.name}
              completed={completed}
              total={challenges.length}
              percent={percent}
              theme={theme}
              isComplete={doneClass}
              onEnter={() => setSelectedClassId(item.id)}
            />
          )
        })}
      </div>
    </section>
  )
}
