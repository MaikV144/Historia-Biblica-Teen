"use client"

import { useState } from "react"
import { Compass } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ClassCardTheme } from "@/lib/class-card-themes"

type ClassLevelNavCardProps = {
  name: string
  completed: number
  total: number
  percent: number
  theme: ClassCardTheme
  onEnter: () => void
  isComplete?: boolean
}

/**
 * Tarjeta de clase: título, badge %, X/Y requisitos, imagen de ruta y CTA.
 * La imagen se configura en `lib/class-card-themes.ts` → `bannerImage`.
 */
export function ClassLevelNavCard({
  name,
  completed,
  total,
  percent,
  theme,
  onEnter,
  isComplete,
}: ClassLevelNavCardProps) {
  const [bannerFailed, setBannerFailed] = useState(false)
  const ctaStyle = theme.ctaStyle ?? "dark"
  const accent = theme.accent
  const titleColor = theme.titleColor ?? accent

  return (
    <button
      type="button"
      onClick={onEnter}
      className={cn(
        "group w-full overflow-hidden rounded-[1.35rem] border-2 bg-[#f7f0e4] text-left shadow-[0_10px_28px_-12px_rgba(15,23,42,0.25)] transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-12px_rgba(15,23,42,0.3)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f0e4]",
        isComplete && "ring-2 ring-emerald-500/60"
      )}
      style={{ borderColor: accent }}
    >
      <div className="relative flex items-center justify-center px-10 pb-2 pt-4">
        <h2
          className="text-center font-black tracking-tight"
          style={{
            color: titleColor,
            fontFamily: "ui-serif, Georgia, Cambria, 'Times New Roman', serif",
            fontSize: "1.35rem",
            lineHeight: 1.2,
          }}
        >
          {name}
        </h2>
        <span
          className="absolute right-3 top-3 min-w-[2.75rem] rounded-full px-2.5 py-1 text-center text-xs font-extrabold tabular-nums"
          style={{
            backgroundColor: `${accent}22`,
            color: accent,
          }}
        >
          {percent}%
        </span>
      </div>

      <div className="relative mx-2 mb-2 mt-1 min-h-[9.5rem] overflow-hidden rounded-2xl border border-black/5 bg-[#ebe4d4]">
        <div className="absolute inset-0">
          {!bannerFailed ? (
            // eslint-disable-next-line @next/next/no-img-element -- rutas en public/classes editables por el usuario
            <img
              src={theme.bannerImage}
              alt=""
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
              onError={() => setBannerFailed(true)}
            />
          ) : (
            <div
              className="h-full w-full bg-gradient-to-br from-slate-200/90 to-slate-400/50"
              aria-hidden
            />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#f7f0e4]/95 via-[#f7f0e4]/25 to-transparent"
            aria-hidden
          />
        </div>

        <div className="relative z-10 flex min-h-[9.5rem] flex-col justify-between p-3">
          {/* [MODIFICADO] */}
          <div className="mb-2 h-2.5 w-full overflow-hidden rounded-full bg-white/80 shadow-inner">
            {/* [MODIFICADO] */}
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${percent}%`, backgroundColor: accent }}
            />
          </div>
          <p className="text-sm font-semibold text-slate-700 drop-shadow-sm">
            <span className="tabular-nums">
              {completed}/{total}
            </span>{" "}
            requisitos
            {isComplete ? (
              <span className="ml-2 text-xs font-bold text-emerald-700">· Completada</span>
            ) : null}
          </p>

          <div className="flex justify-end pt-2">
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-wide shadow-md",
                ctaStyle === "light" ? "text-slate-900" : "text-white"
              )}
              style={{
                backgroundColor:
                  ctaStyle === "light" ? "rgba(255, 216, 61, 1)" : accent,
                boxShadow: `0 4px 14px -4px ${accent}88`,
              }}
            >
              <Compass className="size-4 shrink-0" strokeWidth={2.5} aria-hidden />
              Continuar aventura
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}
