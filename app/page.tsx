"use client"

import type { CSSProperties } from "react"
import { useEffect, useMemo, useState } from "react"
import { BottomTabs } from "@/components/bottom-tabs"
import { SpecialtiesTab } from "@/components/specialties-tab"
import { ClassesTab } from "@/components/classes-tab"
import { BibleStudyTab } from "@/components/bible-study-tab"
import { MasteriesTab } from "@/components/masteries-tab"
import {
  CLASSES,
  getClassRequirementLabels,
  normalizeClassRequirementChecks,
  type TabId,
} from "@/lib/conquistadores-data"
import { getSectionBackgroundImage } from "@/lib/section-backgrounds"

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("specialties")
  const [unlockedSpecialties, setUnlockedSpecialties] = useState<Record<string, boolean>>({})
  const [classRequirements, setClassRequirements] = useState<Record<string, boolean[]>>({})
  const [completedBibleChallenges, setCompletedBibleChallenges] = useState<Record<string, boolean>>({})

  const defaultRequirements = useMemo(
    () =>
      Object.fromEntries(
        CLASSES.map((item) => {
          const n = getClassRequirementLabels(item.id).length
          return [item.id, Array(n > 0 ? n : 1).fill(false)]
        })
      ) as Record<string, boolean[]>,
    []
  )

  useEffect(() => {
    const savedSpecialties = localStorage.getItem("conquistadores-specialties")
    const savedClasses = localStorage.getItem("conquistadores-classes")
    const savedBible = localStorage.getItem("conquistadores-bible")

    if (savedSpecialties) {
      setUnlockedSpecialties(JSON.parse(savedSpecialties))
    }
    if (savedClasses) {
      try {
        const parsed = JSON.parse(savedClasses) as Record<string, boolean[]>
        setClassRequirements(
          Object.fromEntries(
            CLASSES.map((c) => [c.id, normalizeClassRequirementChecks(c.id, parsed[c.id])])
          ) as Record<string, boolean[]>
        )
      } catch {
        setClassRequirements(defaultRequirements)
      }
    } else {
      setClassRequirements(defaultRequirements)
    }
    if (savedBible) {
      setCompletedBibleChallenges(JSON.parse(savedBible))
    }
  }, [defaultRequirements])

  useEffect(() => {
    localStorage.setItem("conquistadores-specialties", JSON.stringify(unlockedSpecialties))
  }, [unlockedSpecialties])

  useEffect(() => {
    if (Object.keys(classRequirements).length > 0) {
      localStorage.setItem("conquistadores-classes", JSON.stringify(classRequirements))
    }
  }, [classRequirements])

  useEffect(() => {
    localStorage.setItem("conquistadores-bible", JSON.stringify(completedBibleChallenges))
  }, [completedBibleChallenges])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" }) // [MODIFICADO]
  }, [activeTab]) // [MODIFICADO]

  function handleToggleSpecialty(specialtyId: string) {
    setUnlockedSpecialties((prev) => ({
      ...prev,
      [specialtyId]: !prev[specialtyId],
    }))
  }

  function handleToggleRequirement(classId: string, requirementIndex: number) {
    setClassRequirements((prev) => {
      const current = normalizeClassRequirementChecks(classId, prev[classId])
      const updated = [...current]
      if (requirementIndex >= 0 && requirementIndex < updated.length) {
        updated[requirementIndex] = !updated[requirementIndex]
      }
      return { ...prev, [classId]: updated }
    })
  }

  function handleToggleBibleChallenge(challengeId: string) {
    setCompletedBibleChallenges((prev) => ({
      ...prev,
      [challengeId]: !prev[challengeId],
    }))
  }

  const sectionBg = getSectionBackgroundImage(activeTab)

  /** Imagen completa: ancho = pantalla, alto proporcional; se repite en Y si hace falta (patrón vertical). Sin `cover` para no recortar. */
  const sectionBackdropStyle: CSSProperties = {
    backgroundColor: "#F2E8CF",
    backgroundImage: `url('${sectionBg}')`,
    backgroundSize: "100% auto",
    backgroundRepeat: "repeat-y",
    backgroundPosition: "center top",
    backgroundAttachment: "scroll",
  }

  return (
    <div className="relative flex min-h-dvh flex-col">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 min-h-dvh"
        style={sectionBackdropStyle}
      />
      <div className="relative z-10 flex min-h-dvh flex-col bg-transparent">
        <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-24 pt-6">
          {activeTab === "specialties" && (
            <SpecialtiesTab
              unlockedSpecialties={unlockedSpecialties}
              onToggleSpecialty={handleToggleSpecialty}
            />
          )}
          {activeTab === "classes" && (
            <ClassesTab
              classRequirements={classRequirements}
              onToggleRequirement={handleToggleRequirement}
            />
          )}
          {activeTab === "bible" && (
            <BibleStudyTab
              completedBibleChallenges={completedBibleChallenges}
              onToggleBibleChallenge={handleToggleBibleChallenge}
            />
          )}
          {activeTab === "masteries" && <MasteriesTab unlockedSpecialties={unlockedSpecialties} />}
        </main>
        <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}
