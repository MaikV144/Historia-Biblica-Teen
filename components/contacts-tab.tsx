"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ArrowLeftRight, UserPlus, Settings2, Copy, Inbox, Trash2 } from "lucide-react"
import { type Contact, type Card } from "@/lib/card-data"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface Trade {
  id: string
  fromCode: string
  toCode: string
  cardId: string
  status: string
  createdAt: string
}

interface ContactsTabProps {
  contacts: Contact[]
  cards: Card[]
  userCode: string | null
  profileAvatar: string | null
  onProfileAvatarChange: (imageUrl: string | null) => void
  onAddContact: (name: string, remoteCode?: string) => void
  onTrade: (contactId: string, cardId: string) => void
  onAcceptIncomingTrade: (cardId: string) => void
  onDeleteContact: (contactId: string) => void
  onLogout?: () => void // [MODIFICADO]
}

const POLL_INTERVAL_MS = 8000

export function ContactsTab({
  contacts,
  cards,
  userCode,
  profileAvatar,
  onProfileAvatarChange,
  onAddContact,
  onTrade,
  onAcceptIncomingTrade,
  onDeleteContact,
  onLogout, // [MODIFICADO]
}: ContactsTabProps) {
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showTradeDialog, setShowTradeDialog] = useState<Contact | null>(null)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Contact | null>(null)
  const [newName, setNewName] = useState("")
  const [newRemoteCode, setNewRemoteCode] = useState("")
  const [incomingTrades, setIncomingTrades] = useState<Trade[]>([])
  const [loadingIncoming, setLoadingIncoming] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const [acceptingId, setAcceptingId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [contactProfiles, setContactProfiles] = useState<Record<string, { profileImage: string | null }>>({})

  const collectedCards = cards.filter((c) => c.collected)

  const fetchIncomingTrades = useCallback(async () => {
    if (!userCode) return
    setLoadingIncoming(true)
    try {
      const res = await fetch(`/api/trades?toCode=${encodeURIComponent(userCode)}&status=pending`)
      if (res.ok) {
        const data = await res.json()
        setIncomingTrades(data)
      }
    } finally {
      setLoadingIncoming(false)
    }
  }, [userCode])

  useEffect(() => {
    fetchIncomingTrades()
    if (!userCode) return
    const t = setInterval(fetchIncomingTrades, POLL_INTERVAL_MS)
    return () => clearInterval(t)
  }, [userCode, fetchIncomingTrades])

  // Obtener fotos de perfil de contactos con código (para ver la foto que tienen guardada)
  useEffect(() => {
    const codes = contacts.filter((c) => c.remoteCode).map((c) => c.remoteCode!.trim().toUpperCase())
    if (codes.length === 0) return
    const seen = new Set(codes)
    seen.forEach(async (code) => {
      try {
        const res = await fetch(`/api/profile?code=${encodeURIComponent(code)}`)
        if (res.ok) {
          const data = await res.json()
          setContactProfiles((prev) => ({
            ...prev,
            [code]: { profileImage: data.profileImage ?? null },
          }))
        }
      } catch {}
    })
  }, [contacts])

  async function handleCopyCode() {
    if (!userCode) return
    try {
      await navigator.clipboard.writeText(userCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }

  function handleAddContact() {
    if (newName.trim()) {
      onAddContact(newName.trim(), newRemoteCode.trim() || undefined)
      setNewName("")
      setNewRemoteCode("")
      setShowAddDialog(false)
    }
  }

  async function handleSendTrade(contact: Contact, cardId: string) {
    setSendError(null)
    if (contact.remoteCode && userCode) {
      try {
        const res = await fetch("/api/trades", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fromCode: userCode,
            toCode: contact.remoteCode.trim().toUpperCase(),
            cardId,
          }),
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          setSendError(data.error || "No se pudo enviar por internet")
          return
        }
      } catch {
        setSendError("Error de conexión. Comprueba que estés conectado.")
        return
      }
    }
    onTrade(contact.id, cardId)
    setShowTradeDialog(null)
  }

  async function handleAcceptTrade(trade: Trade) {
    if (!userCode) return
    setAcceptingId(trade.id)
    try {
      const res = await fetch(`/api/trades/${trade.id}/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toCode: userCode }),
      })
      if (res.ok) {
        onAcceptIncomingTrade(trade.cardId)
        setIncomingTrades((prev) => prev.filter((t) => t.id !== trade.id))
      }
    } finally {
      setAcceptingId(null)
    }
  }

  return (
    <section className="flex flex-col gap-5">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">Contactos</h1>
          <p className="text-sm text-muted-foreground">
            Intercambia cartas con tus amigos
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => setShowAddDialog(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <UserPlus className="mr-1.5 size-4" />
          Agregar
        </Button>
      </header>

      {/* Mi perfil */}
      <div className="flex items-center gap-3 rounded-xl border-2 border-border bg-card p-4">
        <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-pastel-lavender font-bold text-foreground">
          {profileAvatar ? (
            <Image
              src={profileAvatar}
              alt="Mi foto de perfil"
              fill
              className="object-cover"
              sizes="56px"
            />
          ) : (
            "Yo"
          )}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">Mi perfil</p>
          <p className="text-xs text-muted-foreground">
            {profileAvatar ? "Foto de una carta desbloqueada" : "Elige una carta como foto de perfil"}
          </p>
          {userCode && (
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-foreground">
                {userCode}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 px-1.5 text-muted-foreground hover:text-foreground"
                onClick={handleCopyCode}
              >
                {copied ? (
                  <span className="text-xs">¡Copiado!</span>
                ) : (
                  <Copy className="size-3.5" />
                )}
              </Button>
            </div>
          )}
        </div>
        <div className="flex gap-2"> {/* [MODIFICADO] */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowProfileDialog(true)}
            className="border-pastel-blue text-foreground hover:bg-pastel-blue/30"
          >
            <Settings2 className="mr-1.5 size-3.5" />
            Configurar foto
          </Button>
          {onLogout && ( // [MODIFICADO]
            <Button
              size="sm"
              variant="outline"
              onClick={onLogout}
              className="border-destructive/50 text-destructive hover:bg-destructive/10"
            >
              Salir
            </Button>
          )} {/* [MODIFICADO] */}
        </div> {/* [MODIFICADO] */}
      </div>

      {/* Cartas recibidas por internet */}
      {userCode && (
        <div className="rounded-xl border-2 border-border bg-card p-4">
          <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Inbox className="size-4" />
            Cartas recibidas
          </h2>
          {loadingIncoming && incomingTrades.length === 0 ? (
            <p className="text-xs text-muted-foreground">Cargando...</p>
          ) : incomingTrades.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              Cuando alguien te envíe una carta por internet, aparecerá aquí. Comparte tu código para recibir.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {incomingTrades.map((trade) => {
                const card = cards.find((c) => c.id === trade.cardId)
                return (
                  <li
                    key={trade.id}
                    className="flex items-center justify-between gap-2 rounded-lg border border-border p-2"
                  >
                    <div className="flex items-center gap-2">
                      {card ? (
                        <>
                          <div
                            className="relative size-10 shrink-0 overflow-hidden rounded-lg"
                            style={{ backgroundColor: card.color }}
                          >
                            <Image
                              src={card.image}
                              alt={card.name}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground">{card.name}</span>
                        </>
                      ) : (
                        <span className="text-sm text-muted-foreground">Carta {trade.cardId}</span>
                      )}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleAcceptTrade(trade)}
                      disabled={acceptingId === trade.id}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {acceptingId === trade.id ? "..." : "Aceptar"}
                    </Button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}

      {/* Contacts list */}
      <div className="flex flex-col gap-3">
        {contacts.map((contact) => {
          const code = contact.remoteCode?.trim().toUpperCase()
          const profileImage = code ? contactProfiles[code]?.profileImage : null
          return (
            <div
              key={contact.id}
              className="flex items-center gap-3 rounded-xl border-2 border-border bg-card p-4"
            >
              <div className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-pastel-lavender font-bold text-foreground">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt={contact.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                ) : (
                  contact.avatar
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-foreground">{contact.name}</p>
                <p className="text-xs text-muted-foreground">
                  {contact.cardsOwned} cartas
                  {contact.remoteCode && (
                    <span className="ml-1 text-pastel-blue"> · En línea</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSendError(null)
                    setShowTradeDialog(contact)
                  }}
                  className="border-pastel-blue text-foreground hover:bg-pastel-blue/30"
                >
                  <ArrowLeftRight className="mr-1.5 size-3.5" />
                  Intercambiar
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => setShowDeleteConfirm(contact)}
                  aria-label={`Eliminar a ${contact.name}`}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          )
        })}

        {contacts.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <UserPlus className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No tienes contactos aun
            </p>
          </div>
        )}
      </div>

      {/* Add Contact Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-foreground">Nuevo Contacto</DialogTitle>
            <DialogDescription>
              Agrega un amigo. Si tiene código de intercambio, podrás enviarle cartas por internet.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input
              placeholder="Nombre del contacto"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="bg-background text-foreground"
            />
            <Input
              placeholder="Código del amigo (opcional, para intercambio por internet)"
              value={newRemoteCode}
              onChange={(e) => setNewRemoteCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleAddContact()}
              className="bg-background text-foreground font-mono text-sm"
            />
            <Button
              onClick={handleAddContact}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Agregar contacto
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Trade Dialog */}
      <Dialog open={!!showTradeDialog} onOpenChange={() => setShowTradeDialog(null)}>
        <DialogContent className="max-w-xs">
          {showTradeDialog && (
            <>
              <DialogHeader>
                <DialogTitle className="text-foreground">
                  Intercambiar con {showTradeDialog.name}
                </DialogTitle>
                <DialogDescription>
                  {showTradeDialog.remoteCode
                    ? "Se enviará por internet. Selecciona una carta."
                    : "Selecciona una carta para intercambiar (solo local)."}
                </DialogDescription>
              </DialogHeader>
              {sendError && (
                <p className="rounded-md bg-destructive/10 px-2 py-1.5 text-xs text-destructive">
                  {sendError}
                </p>
              )}
              <div className="flex flex-col gap-2">
                {collectedCards.length > 0 ? (
                  collectedCards.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => handleSendTrade(showTradeDialog, card.id)}
                      className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted"
                    >
                      <div
                        className="relative size-8 overflow-hidden rounded-lg"
                        style={{ backgroundColor: card.color }}
                      >
                        <Image
                          src={card.image}
                          alt={card.name}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">{card.name}</span>
                    </button>
                  ))
                ) : (
                  <p className="py-4 text-center text-sm text-muted-foreground">
                    No tienes cartas para intercambiar
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Confirmar eliminar contacto */}
      <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-foreground">Eliminar contacto</DialogTitle>
            <DialogDescription>
              ¿Eliminar a {showDeleteConfirm?.name} de tu lista? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowDeleteConfirm(null)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => {
                if (showDeleteConfirm) {
                  onDeleteContact(showDeleteConfirm.id)
                  setShowDeleteConfirm(null)
                }
              }}
            >
              Eliminar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Configurar foto de perfil: elegir entre cartas desbloqueadas */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle className="text-foreground">Configurar foto de perfil</DialogTitle>
            <DialogDescription>
              Elige la imagen de una carta que tengas desbloqueada como tu foto de perfil
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            {profileAvatar && (
              <Button
                variant="outline"
                onClick={() => {
                  onProfileAvatarChange(null)
                  setShowProfileDialog(false)
                }}
                className="w-full border-muted-foreground/30 text-muted-foreground hover:bg-muted"
              >
                Quitar foto de perfil
              </Button>
            )}
            {collectedCards.length > 0 ? (
              <div className="grid max-h-64 grid-cols-2 gap-2 overflow-y-auto">
                {collectedCards.map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => {
                      onProfileAvatarChange(card.image)
                      setShowProfileDialog(false)
                    }}
                    className="flex flex-col items-center gap-1.5 rounded-lg border border-border p-2 transition-colors hover:bg-muted"
                  >
                    <div
                      className="relative size-14 overflow-hidden rounded-full"
                      style={{ backgroundColor: card.color }}
                    >
                      <Image
                        src={card.image}
                        alt={card.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground">{card.name}</span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">
                Desbloquea cartas en Colección o Desafíos para usarlas como foto de perfil
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
