"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { type Card, getRarityLabel, getRarityColor } from "@/lib/collection-data"
import { Badge } from "@/components/ui/badge"

interface CardItemProps {
  card: Card
  size?: "sm" | "md"
  onClick?: () => void
  showCollected?: boolean
  /** [MODIFICADO] Solo visualización: div con borde e imagen, siempre activo, sin relación a colección */
  displayOnly?: boolean
}

export function CardItem({ card, size = "md", onClick, showCollected = true, displayOnly = false }: CardItemProps) {
  const isMd = size === "md"
  const isDisplayOnlySm = displayOnly && !isMd

  const wrapperClassName = cn(
    "group relative flex flex-col items-center justify-center overflow-hidden rounded-[25px] border-[3px] border-[rgba(45,36,21,1)] text-black transition-all mt-0 mb-0" /* [MODIFICADO] border-color a rgba(45,36,21,1); border-width, margin; background y border-image en style */,
    card.collected ? "shadow-sm" : "grayscale" /* [MODIFICADO] displayOnly también usa collected para activado/desactivado (color vs blanco y negro) */,
    !displayOnly && "h-[300px]" /* [MODIFICADO] height 200px → 300px desde preview */,
    isDisplayOnlySm && "h-[100px] gap-0.5 pb-0 justify-start", // [MODIFICADO]
    isMd && "gap-[1px] pb-[5px]",
    !isMd && !isDisplayOnlySm && "gap-1 pb-2",
    (!displayOnly && onClick && "cursor-pointer hover:shadow-md hover:scale-[1.03] active:scale-[0.98]") || (displayOnly && "cursor-default")
  )
  // Grupo 1 (primeras 5): dorado/crema. Grupo 2 (últimas 5): estilo distinto para colores diferentes.
  const isSet2 = card.cardSet === 2
  const wrapperStyle = {
    background: isSet2
      ? "radial-gradient(circle at 50% 50%, rgba(232, 245, 233, 1) 0%, rgba(200, 230, 201, 1) 100%)" // verde claro para set 2
      : "radial-gradient(circle at 50% 50%, rgba(249, 241, 235, 1) 0%, rgba(247, 227, 182, 1) 100%)", // [MODIFICADO] gradiente radial crema/beige desde preview
    borderColor: isSet2 ? "rgba(76, 175, 80, 1)" : "rgba(223, 167, 77, 1)", // set 2: borde verde; set 1: dorado
    borderImage: "none",
    boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1), 0px 4px 12px 0px rgba(0, 0, 0, 0.15)" // [MODIFICADO] sombra persistida desde preview
  }
  const imageWrapperHeight = isDisplayOnlySm ? "h-[72px]" : isMd ? "h-[300px]" : "h-16" /* [MODIFICADO] height 150px → 300px desde preview */

  const content = (
    <>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-b-0 border-0 text-black" /* [MODIFICADO] border-radius inferior a 0 */,
          imageWrapperHeight
        )}
        style={{ fontFamily: 'var(--font-shadows), cursive', lineHeight: 24 }}
      >
        <Image
          src={card.image}
          alt={card.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes={isMd ? "180px" : "10px"} /* [MODIFICADO] sizesInput 120px → 10px desde preview */
          style={{
            backgroundClip: "unset",
            WebkitBackgroundClip: "unset",
            color: "rgba(0, 0, 0, 0)",
          }}
        />
      </div>
      <span
        className={cn(
          "px-2 text-center font-bold leading-tight text-[rgba(53,29,8,1)]" /* [MODIFICADO] */,
          isMd ? "text-sm" : "text-xs"
        )}
      >
        {card.name}
      </span>
      {isMd && !displayOnly && (
        <Badge
          className={cn("text-[10px] border-2 border-[rgba(229,240,229,1)]", getRarityColor(card.rarity))}
          style={{ borderImage: "none", boxShadow: "0px 4px 12px 0px rgba(229, 36, 36, 0.15)" }}
        >
          {getRarityLabel(card.rarity)}
        </Badge>
      )}
      {!displayOnly && showCollected && card.collected && (
        <span className="absolute top-1.5 right-1.5 flex size-5 items-center justify-center rounded-full bg-pastel-green text-[10px] text-foreground shadow-sm">
          {"✓"}
        </span>
      )}
    </>
  )

  if (displayOnly) {
    return (
      <button
        type="button"
        name="CardTab-Button"
        aria-label="CardTab-Button"
        className={wrapperClassName}
        style={wrapperStyle}
      >
        {content}
      </button>
    )
  }
  return (
    <button onClick={onClick} className={wrapperClassName} style={wrapperStyle}>
      {content}
    </button>
  )
}
