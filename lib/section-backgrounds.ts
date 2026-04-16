import type { TabId } from "@/lib/conquistadores-data"
import { APP_BACKGROUND_PUBLIC_PATH } from "@/lib/app-background"

/**
 * Fondo de pantalla por sección (pestaña inferior).
 * Archivos en `public/section-bg/`.
 */
export const SECTION_BACKGROUND_IMAGES: Record<TabId, string> = {
  specialties: "/section-bg/especialidades.png",
  classes: "/section-bg/clases.png",
  bible: "/section-bg/biblia.png",
  masteries: "/section-bg/maestrias.png",
}

export function getSectionBackgroundImage(tab: TabId): string {
  const path = SECTION_BACKGROUND_IMAGES[tab]?.trim()
  if (path) return path
  return APP_BACKGROUND_PUBLIC_PATH
}
