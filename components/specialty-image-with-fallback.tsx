"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type SpecialtyImageWithFallbackProps = {
  src?: string | null
  alt: string
  /** Contenedor cuando hay imagen válida */
  className?: string
  imgClassName?: string
  /** Bloque completo cuando no hay `src`, falla la carga, o aún no existe el archivo */
  fallback: React.ReactNode
}

export function SpecialtyImageWithFallback({
  src,
  alt,
  className,
  imgClassName,
  fallback,
}: SpecialtyImageWithFallbackProps) {
  const [failed, setFailed] = useState(false)
  const trimmed = src?.trim() ?? ""

  useEffect(() => {
    setFailed(false)
  }, [trimmed])

  if (!trimmed || failed) {
    return <>{fallback}</>
  }

  return (
    <div
      className={cn(
        "mt-1 min-h-[9.5rem] overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-sm",
        className
      )}
    >
      <img
        src={trimmed}
        alt={alt}
        className={cn("h-full min-h-[9.5rem] w-full object-cover", imgClassName)}
        onError={() => setFailed(true)}
        draggable={false}
        loading="lazy"
      />
    </div>
  )
}
