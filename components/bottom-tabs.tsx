"use client"

import { Layers, LayoutGrid, Users, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

export type TabId = "collection" | "boards" | "contacts" | "challenges"

interface BottomTabsProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "collection", label: "Coleccion", icon: Layers },
  { id: "boards", label: "Tableros", icon: LayoutGrid },
  { id: "contacts", label: "Contactos", icon: Users },
  { id: "challenges", label: "Desafios", icon: Trophy },
]

export function BottomTabs({ activeTab, onTabChange }: BottomTabsProps) {
  return (
    <nav
      role="tablist"
      aria-label="Navegacion principal"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card"
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
