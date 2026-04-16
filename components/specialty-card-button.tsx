"use client"

import * as React from "react"
import { SpecialtyImageWithFallback } from "@/components/specialty-image-with-fallback"
import { cn } from "@/lib/utils"

export type SpecialtyCardButtonProps = {
  title: string
  /** Tailwind background class when accentHex is not set (progress fill fallback) */
  color: string
  progress: number
  current: number
  total: number
  onClick?: () => void
  disabled?: boolean
  className?: string
  accentHex?: string
  /** URL resuelta (p. ej. `getAreaImageUrl`); si falla la carga se muestra el placeholder */
  imageSrc?: string
  imageAlt?: string
  "aria-label"?: string
}

function clampPercent(value: number) {
  if (Number.isNaN(value)) return 0
  return Math.max(0, Math.min(100, Math.round(value)))
}

function getReadableTitleColor(hex?: string) {
  if (!hex) return "#ffffff"
  const h = hex.replace("#", "").trim()
  if (h.length !== 6) return "#ffffff"
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  return luminance > 0.82 ? "#0f172a" : "#ffffff"
}

function progressGradientEnd(hex: string) {
  const h = hex.replace("#", "").trim()
  if (h.length === 6) return `#${h}`
  return "#14b8a6"
}

/** Pastel panel behind placeholder (matches ref: soft tinted rounded zone) */
function illustrationPanelStyle(accentHex?: string): React.CSSProperties {
  if (!accentHex) {
    return { backgroundColor: "color-mix(in srgb, #14b8a6 16%, white)" }
  }
  return { backgroundColor: `color-mix(in srgb, ${accentHex} 18%, white)` }
}

function getBorderHex(hex?: string) {
  if (!hex) return "#14b8a6"
  const h = hex.replace("#", "").trim()
  if (h.length !== 6) return "#14b8a6"
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  if (luminance > 0.88) return "#cbd5e1"
  return `#${h}`
}

/** Tab solid color: very light accents get a readable teal pill */
function tabAccentFill(fallback: string, hex?: string) {
  if (!hex) return fallback
  const h = hex.replace("#", "").trim()
  if (h.length !== 6) return fallback
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  if (luminance > 0.88) return "#0d9488"
  return `#${h}`
}

function DonutRing({
  pct,
  accentHex,
  current,
  total,
}: {
  pct: number
  accentHex: string
  current: number
  total: number
}) {
  const size = 72
  const stroke = 5
  const r = (size - stroke) / 2 - 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - pct / 100)

  return (
    <div className="relative flex shrink-0 flex-col items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-slate-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={accentHex}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-500 ease-out"
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-1">
        <span className="text-center text-xs font-extrabold leading-tight text-foreground">
          {current} / {total}
        </span>
        <span className="mt-0.5 text-[10px] font-semibold text-foreground/85">Actividades</span>
      </div>
    </div>
  )
}

export function SpecialtyCardButton({
  title,
  color,
  progress,
  current,
  total,
  onClick,
  disabled,
  className,
  accentHex,
  imageSrc,
  imageAlt,
  "aria-label": ariaLabel,
}: SpecialtyCardButtonProps) {
  const pct = clampPercent(progress)
  const accent = accentHex ?? "#14b8a6"
  const borderHex = getBorderHex(accentHex)
  const brandSolid = tabAccentFill(accent, accentHex)
  const gradEnd = progressGradientEnd(brandSolid)
  const showPctInsideBar = pct >= 18

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        "group relative w-full text-left font-sans",
        "rounded-[1.35rem] bg-white p-4 pt-9 shadow-[0_10px_30px_-8px_rgba(15,23,42,0.12)]",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:scale-[1.015] hover:shadow-[0_16px_40px_-10px_rgba(15,23,42,0.18)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        "disabled:pointer-events-none disabled:opacity-60",
        className
      )}
      style={{
        borderWidth: 4,
        borderStyle: "solid",
        borderColor: borderHex,
        boxShadow: `0 10px 30px -8px rgba(15,23,42,0.12), inset 0 1px 0 rgba(255,255,255,0.8)`,
      }}
    >
      {/* Title tab — centered on top edge */}
      <div
        className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full px-5 py-2 shadow-sm"
        style={{
          backgroundColor: brandSolid,
          color: getReadableTitleColor(brandSolid),
        }}
      >
        <span className="block max-w-[14rem] truncate text-center text-xs font-extrabold uppercase tracking-wide">
          {title}
        </span>
      </div>

      {/* Ilustración o placeholder */}
      <SpecialtyImageWithFallback
        src={imageSrc}
        alt={imageAlt ?? title}
        fallback={
          <div
            className="mt-1 flex min-h-[9.5rem] items-center justify-center rounded-2xl border-2 border-dashed border-teal-400/35 px-3 py-6"
            style={illustrationPanelStyle(accentHex)}
          >
            <span className="text-sm font-bold text-slate-500/90">Imagen aquí</span>
          </div>
        }
      />

      {/* Progress row */}
      <div className="mt-4 flex items-end gap-3">
        <div className="min-w-0 flex-1">
          <p className="mb-2 text-[11px] font-extrabold uppercase tracking-wide text-foreground">
            PROGRESO DE TEMAS
          </p>
          <div className="relative h-9 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner">
            {accentHex ? (
              <div
                className="absolute left-0 top-0 flex h-full items-center justify-center rounded-full shadow-sm transition-[width] duration-500 ease-out"
                style={{
                  width: `${pct}%`,
                  minWidth: pct > 0 ? "2.75rem" : undefined,
                  background: `linear-gradient(90deg, #3b82f6, ${gradEnd})`,
                }}
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {showPctInsideBar ? (
                  <span className="text-sm font-extrabold text-white drop-shadow-sm">{pct}%</span>
                ) : null}
              </div>
            ) : (
              <div
                className={cn(
                  "absolute left-0 top-0 flex h-full items-center justify-center rounded-full transition-all duration-500",
                  color
                )}
                style={{ width: `${pct}%`, minWidth: pct > 0 ? "2.75rem" : undefined }}
                role="progressbar"
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {showPctInsideBar ? (
                  <span className="text-sm font-extrabold text-white drop-shadow-sm">{pct}%</span>
                ) : null}
              </div>
            )}
            {!showPctInsideBar && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-500">
                {pct}%
              </span>
            )}
          </div>
        </div>

        <DonutRing pct={pct} accentHex={brandSolid} current={current} total={total} />
      </div>
    </button>
  )
}
