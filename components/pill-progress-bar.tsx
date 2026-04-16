"use client"

type PillProgressBarProps = {
  percent: number
  current: number
  total: number
  /** Texto corto junto a current/total (ej. "especialidades", "clases") */
  unitLabel?: string
  /** Etiqueta opcional encima (ej. PROGRESO GLOBAL) */
  label?: string
  /** Muestra fila current/total + % a los lados encima de la barra */
  showCountRow?: boolean
  /** Color del relleno de la barra (ej. accent de clase) */ // [MODIFICADO]
  fillColor?: string // [MODIFICADO]
}

function clampPct(n: number) {
  if (Number.isNaN(n)) return 0
  return Math.max(0, Math.min(100, Math.round(n)))
}

export function PillProgressBar({
  percent,
  current,
  total,
  unitLabel,
  label,
  showCountRow = true,
  fillColor, // [MODIFICADO]
}: PillProgressBarProps) {
  const pct = clampPct(percent)
  const showPctInsideBar = pct >= 14

  return (
    <div className="flex w-full flex-col gap-2">
      {label ? (
        <p className="text-[11px] font-extrabold uppercase tracking-wide text-foreground">{label}</p>
      ) : null}
      {showCountRow ? (
        <div className="flex items-center justify-between gap-2 text-sm font-extrabold text-foreground">
          <span>
            {current}/{total}
            {unitLabel ? <span className="font-semibold text-muted-foreground"> {unitLabel}</span> : null}
          </span>
          <span className="tabular-nums text-[rgb(22_19_20)]">{pct}%</span>
        </div>
      ) : null}
      <div className="relative h-9 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner">
        <div
          className="absolute left-0 top-0 flex h-full items-center justify-center rounded-full shadow-sm transition-[width] duration-500 ease-out"
          style={{
            width: `${pct}%`,
            minWidth: pct > 0 ? "2.75rem" : undefined,
            background: fillColor ? fillColor : "linear-gradient(90deg, #3b82f6, #0d9488)", // [MODIFICADO]
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
        {!showPctInsideBar ? (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-extrabold text-white">
            {pct}%
          </span>
        ) : null}
      </div>
    </div>
  )
}
