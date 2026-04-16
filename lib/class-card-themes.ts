/**
 * Apariencia de las tarjetas de navegación por clase (pestaña Clases).
 *
 * Cómo cambiar la imagen de cada clase:
 * 1. Coloca el archivo en `public/classes/` (por ejemplo `public/classes/lamigo.png`). // [MODIFICADO]
 * 2. Actualiza `bannerImage` con la ruta pública: `"/classes/lamigo.png"`. // [MODIFICADO]
 *
 * `accent` controla borde, título y botón «Continuar aventura».
 * `ctaStyle`: "light" = texto oscuro sobre fondo claro (útil para amarillo).
 */

export type ClassCardCtaStyle = "dark" | "light"

export type ClassCardTheme = {
  accent: string
  /** Ruta bajo `public/` (ej. "/classes/lamigo.png") */ // [MODIFICADO]
  bannerImage: string
  /** Estilo del botón inferior: "dark" = texto blanco sobre `accent` (por defecto) */
  ctaStyle?: ClassCardCtaStyle
  /** Color del título (h2); si no se define, se usa `accent`. */
  titleColor?: string
}

export const CLASS_CARD_THEMES: Record<string, ClassCardTheme> = {
  amigo: {
    accent: "#1e3a8a",
    bannerImage: "/classes/amigo-banner.png", // [MODIFICADO]
  },
  companero: {
    accent: "#b91c1c",
    bannerImage: "/classes/companero-banner.png", // [MODIFICADO]
  },
  explorador: {
    accent: "#15803d",
    bannerImage: "/classes/explorador-banner.png", // [MODIFICADO]
  },
  pionero: {
    accent: "#475569",
    bannerImage: "/classes/pionero-banner.png", // [MODIFICADO]
  },
  excursionista: {
    accent: "#742f72",
    bannerImage: "/classes/excursionista-banner.png", // [MODIFICADO]
  },
  guia: {
    accent: "#ca8a04",
    bannerImage: "/classes/guia-banner.png", // [MODIFICADO]
    ctaStyle: "light",
    titleColor: "rgba(168, 138, 31, 1)",
  },
}

export function getClassCardTheme(classId: string): ClassCardTheme {
  return (
    CLASS_CARD_THEMES[classId] ?? {
      accent: "#334155",
      bannerImage: "/classes/placeholder.svg",
    }
  )
}
