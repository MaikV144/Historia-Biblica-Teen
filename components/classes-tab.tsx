"use client"

import { useMemo, useState } from "react"
import { CLASSES } from "@/lib/conquistadores-data"
import {
  CLASS_REQUIREMENT_SECTIONS,
  getClassRequirementLabels,
  normalizeClassRequirementChecks,
} from "@/lib/conquistadores-data"
import { PillProgressBar } from "@/components/pill-progress-bar"
import { SectionPageTitle } from "@/components/section-page-title"
import { ClassLevelNavCard } from "@/components/class-level-nav-card"
import { getClassCardTheme } from "@/lib/class-card-themes"
import { cn } from "@/lib/utils"

interface ClassesTabProps {
  classRequirements: Record<string, boolean[]>
  onToggleRequirement: (classId: string, requirementIndex: number) => void
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

function isClassFullyDone(
  itemId: string,
  classRequirements: Record<string, boolean[]>
): boolean {
  const labels = getClassRequirementLabels(itemId)
  if (!labels.length) return false
  const requirements = normalizeClassRequirementChecks(itemId, classRequirements[itemId])
  return requirements.filter(Boolean).length === labels.length
}

function ClassRequirementsDetail({
  itemId,
  itemName,
  classRequirements,
  onToggleRequirement,
  onBack,
}: {
  itemId: string
  itemName: string
  classRequirements: Record<string, boolean[]>
  onToggleRequirement: (classId: string, requirementIndex: number) => void
  onBack: () => void
}) {
  const theme = getClassCardTheme(itemId) // [MODIFICADO]
  const accent = theme.accent // [MODIFICADO]
  const doneBg = mixWithWhite(accent, 0.86) // [MODIFICADO]
  const sections = CLASS_REQUIREMENT_SECTIONS[itemId] ?? [
    { title: "Requisitos", items: getClassRequirementLabels(itemId) },
  ]
  const labels = getClassRequirementLabels(itemId)
  const requirements = normalizeClassRequirementChecks(itemId, classRequirements[itemId])
  const completed = requirements.filter(Boolean).length
  const totalReq = labels.length
  const percent = totalReq > 0 ? Math.round((completed / totalReq) * 100) : 0

  return (
    <div className="flex flex-col gap-5">
      <button
        type="button"
        onClick={onBack}
        className="flex w-full max-w-[14rem] items-center gap-2 rounded-xl border-2 border-border bg-card px-4 py-3 text-left text-sm font-extrabold text-foreground shadow-sm transition-colors hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <span className="text-lg leading-none" aria-hidden>
          ←
        </span>
        Todas las clases
      </button>

      <header className="flex flex-col gap-4">
        <SectionPageTitle>{itemName}</SectionPageTitle>
        <PillProgressBar
          label="Requisitos"
          percent={percent}
          current={completed}
          total={labels.length}
          unitLabel="requisitos"
          fillColor={accent} // [MODIFICADO]
        />
      </header>

      <div className="flex flex-col gap-4">
        {(() => {
          let baseIndex = 0
          return sections.map((section) => {
            const startIndex = baseIndex
            baseIndex += section.items.length
            return (
              <div key={`${itemId}-${section.title}`} className="flex flex-col gap-2">
                <h3
                  className="text-base font-extrabold tracking-wide" // [MODIFICADO]
                  style={{ color: accent }} // [MODIFICADO]
                >
                  {section.title}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {section.items.map((label, sectionOffset) => {
                    const index = startIndex + sectionOffset
                    const done = !!requirements[index]
                    return (
                      <button
                        key={`${itemId}-req-${index}`}
                        type="button"
                        onClick={() => onToggleRequirement(itemId, index)}
                        className={cn(
                          "rounded-lg border px-2 py-2 text-left text-xs transition-colors",
                          done
                            ? "text-foreground" // [MODIFICADO]
                            : "border-border bg-background text-muted-foreground hover:bg-muted"
                        )} // [MODIFICADO]
                        style={
                          done
                            ? {
                                borderColor: accent, // [MODIFICADO]
                                backgroundColor: doneBg, // [MODIFICADO]
                              }
                            : undefined
                        } // [MODIFICADO]
                      >
                        {label || `Requisito ${index + 1}`}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })
        })()}
      </div>
    </div>
  )
}

export function ClassesTab({ classRequirements, onToggleRequirement }: ClassesTabProps) {
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null)

  const totalClasses = CLASSES.length
  const finishedClasses = useMemo(
    () => CLASSES.filter((c) => isClassFullyDone(c.id, classRequirements)).length,
    [classRequirements]
  )
  const classesTabPercent =
    totalClasses > 0 ? Math.round((finishedClasses / totalClasses) * 100) : 0

  const selected = CLASSES.find((c) => c.id === selectedClassId)

  if (selected) {
    return (
      <section className="flex flex-col gap-5">
        <ClassRequirementsDetail
          itemId={selected.id}
          itemName={selected.name}
          classRequirements={classRequirements}
          onToggleRequirement={onToggleRequirement}
          onBack={() => setSelectedClassId(null)}
        />
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-col gap-4">
        <SectionPageTitle>Clases</SectionPageTitle>
        <PillProgressBar
          label="Clases terminadas"
          percent={classesTabPercent}
          current={finishedClasses}
          total={totalClasses}
          unitLabel="clases"
        />
      </header>

      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-muted-foreground">
          Elige una clase para ver y marcar sus requisitos.
        </p>
        {CLASSES.map((item) => {
          const labels = getClassRequirementLabels(item.id)
          const requirements = normalizeClassRequirementChecks(item.id, classRequirements[item.id])
          const completed = requirements.filter(Boolean).length
          const totalReq = labels.length
          const percent = totalReq > 0 ? Math.round((completed / totalReq) * 100) : 0
          const doneClass = isClassFullyDone(item.id, classRequirements)
          const theme = getClassCardTheme(item.id)

          return (
            <ClassLevelNavCard
              key={item.id}
              name={item.name}
              completed={completed}
              total={totalReq}
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
