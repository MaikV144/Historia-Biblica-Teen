import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type SectionPageTitleProps = {
  children: ReactNode
  className?: string
}

/** Título principal de cada pestaña: grande y llamativo */
export function SectionPageTitle({ children, className }: SectionPageTitleProps) {
  return (
    <h1
      className={cn(
        "border-b-4 border-[rgb(43_76_49)] pb-2 text-3xl font-black tracking-tight text-foreground",
        "drop-shadow-[0_2px_0_rgba(0,0,0,0.06)] md:text-4xl",
        className
      )}
    >
      {children}
    </h1>
  )
}
