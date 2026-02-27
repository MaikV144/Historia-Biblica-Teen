"use client"

import { useState } from "react"
import { type Card } from "@/lib/collection-data"
import { type Board } from "@/lib/boards-data"
import { CardItem } from "@/components/card-item"
import { LayoutGrid, Calendar, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

type BoardDialogView = "events" | "abilities"

interface BoardsTabProps {
  boards: Board[]
  cards: Card[]
}

export function BoardsTab({ boards, cards }: BoardsTabProps) {
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null)
  const [dialogView, setDialogView] = useState<BoardDialogView>("events")

  return (
    <section className="flex flex-col gap-5">
      <header>
        <h1 className="text-xl font-bold text-foreground">Tableros</h1>
        <p className="text-sm text-muted-foreground">
          Desbloquea cartas para completar tableros
        </p>
      </header>

      {boards.map((board) => {
        const boardCards = board.cardIds.map(
          (id) => cards.find((c) => c.id === id)!
        )
        const collectedInBoard = boardCards.filter((c) => c.collected).length
        const totalInBoard = boardCards.length
        const isComplete = collectedInBoard === totalInBoard

        return (
          <div
            key={board.id}
            role="button"
            tabIndex={0}
            onClick={() => {
              setSelectedBoard(board)
              setDialogView("events")
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setSelectedBoard(board)
                setDialogView("events")
              }
            }}
            className="flex cursor-pointer flex-col gap-4 rounded-2xl border-2 border-border bg-card p-5 transition-colors hover:border-pastel-blue/50 hover:bg-card/80"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-xl bg-pastel-blue">
                <LayoutGrid className="size-6 text-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-foreground">{board.name}</h2>
                <p className="text-xs text-muted-foreground">{board.description}</p>
              </div>
            </div>

            {/* Progress */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progreso</span>
                <span className="font-semibold text-foreground">
                  {collectedInBoard}/{totalInBoard}
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-pastel-blue transition-all duration-500"
                  style={{ width: `${(collectedInBoard / totalInBoard) * 100}%` }}
                />
              </div>
            </div>

            {isComplete && (
              <div className="rounded-xl bg-pastel-green/40 p-3 text-center text-sm font-semibold text-foreground">
                Tablero completado!
              </div>
            )}

            {/* Board cards */}
            <div className="grid grid-cols-3 gap-2">
              {boardCards.map((card) => (
                <CardItem key={card.id} card={card} size="sm" displayOnly />
              ))}
            </div>
          </div>
        )
      })}

      {/* Ventana de detalle del tablero */}
      <Dialog
        open={!!selectedBoard}
        onOpenChange={(open) => !open && setSelectedBoard(null)}
      >
        <DialogContent className="max-w-md">
          {selectedBoard && (
            <>
              <DialogHeader>
                <DialogTitle className="text-foreground">{selectedBoard.name}</DialogTitle>
                <DialogDescription>{selectedBoard.description}</DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <Button
                    variant={dialogView === "events" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setDialogView("events")}
                  >
                    <Calendar className="mr-2 size-4" />
                    Eventos de Tablero
                  </Button>
                  <Button
                    variant={dialogView === "abilities" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setDialogView("abilities")}
                  >
                    <Sparkles className="mr-2 size-4" />
                    Habilidades
                  </Button>
                </div>

                {dialogView === "events" && (
                  <div className="flex flex-col gap-3 rounded-lg border border-border bg-muted/30 p-3">
                    <h3 className="text-sm font-semibold text-foreground">
                      Los 3 eventos más destacados
                    </h3>
                    {selectedBoard.events.map((event, i) => (
                      <div
                        key={i}
                        className="rounded-md border-l-2 border-pastel-blue bg-background p-3"
                      >
                        <p className="font-medium text-foreground">{event.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {dialogView === "abilities" && (
                  <div className="flex max-h-80 flex-col gap-3 overflow-y-auto rounded-lg border border-border bg-muted/30 p-3">
                    <h3 className="text-sm font-semibold text-foreground">
                      Habilidades de los personajes
                    </h3>
                    {selectedBoard.abilities.map((ability, i) => (
                      <div
                        key={i}
                        className="rounded-md border border-border bg-background p-3"
                      >
                        <p className="text-xs font-medium text-muted-foreground">
                          {ability.characterName}
                        </p>
                        <p className="mt-1 font-medium text-foreground">
                          {ability.abilityName}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {ability.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
