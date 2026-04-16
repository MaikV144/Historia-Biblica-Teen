"use client"

import { Award, BookOpen, GraduationCap, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"
import { type TabId } from "@/lib/conquistadores-data"

interface BottomTabsProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "specialties", label: "Especialidades", icon: Leaf },
  { id: "classes", label: "Clases", icon: GraduationCap },
  { id: "bible", label: "Biblia", icon: BookOpen },
  { id: "masteries", label: "Maestrías", icon: Award },
]

export function BottomTabs({ activeTab, onTabChange }: BottomTabsProps) {
  return (
    <nav
      role="tablist"
      aria-label="Navegacion principal"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/80 bg-card/90 backdrop-blur-md supports-[backdrop-filter]:bg-card/75"
    >
      <div className="mx-auto flex max-w-lg items-stretch">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-label={tab.label}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative flex flex-1 flex-col items-center gap-0.5 pb-5 pt-3 transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" />
              )}
              <Icon className={cn("size-5", isActive && "scale-110")} />
              <span className="text-[11px] font-semibold leading-tight">
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
