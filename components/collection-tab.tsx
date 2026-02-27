"use client"

import Image from "next/image"
import { Plus, RotateCcw } from "lucide-react"
import { type Card, getRarityLabel, getRarityColor } from "@/lib/collection-data"
import { CardItem } from "@/components/card-item"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface CollectionTabProps {
  cards: Card[]
  onCollectCard: (cardId: string) => void
  onResetCollection?: () => void
}

export function CollectionTab({ cards, onCollectCard, onResetCollection }: CollectionTabProps) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const collectedCount = cards.filter((c) => c.collected).length

  return (
    <section className="flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Mi Coleccion</h1>
          <p className="text-sm text-muted-foreground">
            {collectedCount} de {cards.length} cartas
          </p>
        </div>
        <div className="flex items-center gap-2">
          {onResetCollection && collectedCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onResetCollection}
              className="border-dashed"
              title="Poner todas las cartas en no coleccionadas"
            >
              <RotateCcw className="size-4" />
            </Button>
          )}
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
            {collectedCount}
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="flex flex-col gap-2">
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${(collectedCount / cards.length) * 100}%` }}
          />
        </div>
        <p className="text-center text-xs text-muted-foreground">
          {collectedCount === cards.length
            ? "Coleccion completa!"
            : `Te faltan ${cards.length - collectedCount} cartas`}
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-2 gap-3">
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            onClick={() => setSelectedCard(card)}
          />
        ))}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedCard} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="max-w-xs h-[450px] grid-cols-1 grid-rows-1">
          {selectedCard && (
            <>
              <DialogHeader className="h-[75px]">
                <DialogTitle className="text-foreground">{selectedCard.name}</DialogTitle>
                <DialogDescription>{selectedCard.description}</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 h-[300px]">
                <div
                  className="relative h-[250px] w-full overflow-hidden rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: selectedCard.color }}
                >
                  <div className="relative h-[200px] min-h-[100px] w-full">
                    <Image
                      src={selectedCard.image}
                      alt={selectedCard.name}
                      fill
                      className="object-contain object-center"
                      sizes="280px"
                      style={{ inset: "6px 0 0 -1px" }}
                    />
                  </div>
                </div>
                <Badge className={getRarityColor(selectedCard.rarity)}>
                  {getRarityLabel(selectedCard.rarity)}
                </Badge>
                {!selectedCard.collected ? (
                  <Button
                    onClick={() => {
                      onCollectCard(selectedCard.id)
                      setSelectedCard(null)
                    }}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Plus className="mr-2 size-4" />
                    Agregar a coleccion
                  </Button>
                ) : (
                  <p className="text-sm font-medium text-pastel-green">
                    Ya tienes esta carta
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
