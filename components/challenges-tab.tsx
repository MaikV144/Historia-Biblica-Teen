"use client"

import { CheckCircle2, Circle, Trophy, Gift, RotateCcw } from "lucide-react"
import { type Challenge, type Card } from "@/lib/card-data"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ChallengesTabProps {
  challenges: Challenge[]
  cards: Card[]
  onCompleteChallenge: (challengeId: string) => void
  onResetChallenges?: () => void
}

export function ChallengesTab({
  challenges,
  cards,
  onCompleteChallenge,
  onResetChallenges,
}: ChallengesTabProps) {
  const pending = challenges.filter((c) => !c.completed)
  const completed = challenges.filter((c) => c.completed)

  function getRewardCard(cardId: string) {
    return cards.find((c) => c.id === cardId)
  }

  return (
    <section className="flex flex-col gap-5">
      <header>
        <h1 className="text-xl font-bold text-foreground">Desafios</h1>
        <p className="text-sm text-muted-foreground">
          Completa desafios del mundo real para ganar cartas
        </p>
      </header>

      {/* Stats */}
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-pastel-yellow/40 p-3">
          <span className="text-2xl font-bold text-foreground">{pending.length}</span>
          <span className="text-xs text-muted-foreground">Pendientes</span>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-pastel-green/40 p-3">
          <span className="text-2xl font-bold text-foreground">{completed.length}</span>
          <span className="text-xs text-muted-foreground">Cumplidos</span>
        </div>
      </div>

      {/* Pending challenges */}
      {pending.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
            Pendientes
          </h2>
          {pending.map((challenge) => {
            const reward = getRewardCard(challenge.cardReward)
            return (
              <button
                key={challenge.id}
                onClick={() => onCompleteChallenge(challenge.id)}
                className="group flex items-start gap-3 rounded-xl border-2 border-border bg-card p-4 text-left transition-all hover:border-primary/40 hover:shadow-sm active:scale-[0.98]"
              >
                <Circle className="mt-0.5 size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{challenge.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {challenge.description}
                  </p>
                  {reward && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <Gift className="size-3 text-primary" style={{ color: "rgba(67, 170, 177, 1)" }} /> {/* [MODIFICADO] */}
                      <span className="text-xs font-medium text-primary" style={{ color: "rgba(67, 170, 177, 1)" }}> {/* [MODIFICADO] */}
                        Recompensa: {reward.name}
                      </span>
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Completed challenges */}
      {completed.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
            Cumplidos
          </h2>
          {completed.map((challenge) => {
            const reward = getRewardCard(challenge.cardReward)
            return (
              <div
                key={challenge.id}
                className={cn(
                  "flex items-start gap-3 rounded-xl border-2 border-pastel-green/50 bg-pastel-green/10 p-4"
                )}
              >
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-pastel-green" />
                <div className="flex-1">
                  <p className="font-semibold text-foreground line-through decoration-muted-foreground/40">
                    {challenge.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {challenge.description}
                  </p>
                  {reward && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <Trophy className="size-3 text-pastel-green" />
                      <span className="text-xs font-medium text-foreground">
                        Carta obtenida: {reward.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {pending.length === 0 && completed.length > 0 && (
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-pastel-yellow/30 py-6">
          <Trophy className="size-8 text-foreground" />
          <p className="font-semibold text-foreground">Todos los desafios cumplidos!</p>
          <p className="text-xs text-muted-foreground">Eres increible</p>
        </div>
      )}

      {onResetChallenges && completed.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={onResetChallenges}
          className="w-full border-dashed"
        >
          <RotateCcw className="mr-2 size-4" />
          Poner desafíos incompletos
        </Button>
      )}
    </section>
  )
}
