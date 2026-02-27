"use client"

import { useState, useCallback, useEffect } from "react"
import { BottomTabs, type TabId } from "@/components/bottom-tabs"
import { CollectionTab } from "@/components/collection-tab"
import { BoardsTab } from "@/components/boards-tab"
import { ContactsTab } from "@/components/contacts-tab"
import { ChallengesTab } from "@/components/challenges-tab"
import { AuthGate } from "@/components/auth-gate" // [MODIFICADO]
import {
  type Card,
  type Contact,
  type Challenge,
  INITIAL_CARDS,
  INITIAL_BOARDS,
  INITIAL_CONTACTS,
  INITIAL_CHALLENGES,
} from "@/lib/card-data"
import { getOrCreateUsuarioByAuthUserId } from "@/lib/user-repository" // [MODIFICADO]
import { supabase } from "@/lib/supabase-client"

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("collection")
  const [collectionCards, setCollectionCards] = useState<Card[]>(INITIAL_CARDS)
  const [boardCards, setBoardCards] = useState<Card[]>(INITIAL_CARDS)
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS)
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES)
  const [profileAvatar, setProfileAvatar] = useState<string | null>(null)
  const [authUserId, setAuthUserId] = useState<string | null>(null) // [MODIFICADO]
  const [userId, setUserId] = useState<number | null>(null)
  const [cargando, setCargando] = useState(true) // [MODIFICADO]
  const [userCode, setUserCode] = useState<string | null>(null) // [MODIFICADO]

  // [MODIFICADO] Verificar sesión existente al cargar
  useEffect(() => {
    let mounted = true
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return
      if (session?.user) {
        setAuthUserId(session.user.id)
      }
      setCargando(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      if (session?.user) {
        setAuthUserId(session.user.id)
      } else {
        setAuthUserId(null)
        setUserId(null)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // [MODIFICADO] Cuando hay authUserId, buscar o crear usuario en tabla usuarios
  useEffect(() => {
    if (!authUserId) {
      setUserId(null)
      setUserCode(null)
      return
    }
    ;(async () => {
      const usuario = await getOrCreateUsuarioByAuthUserId(authUserId)
      if (usuario) {
        setUserId(usuario.id)
        setUserCode(usuario.codigo_amigo ?? `USER${usuario.id}`)
      }
    })()
  }, [authUserId])

  // Sincronizar foto de perfil al servidor para que otros la vean
  useEffect(() => {
    if (!userCode) return
    fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: userCode, profileImage: profileAvatar }),
    }).catch(() => {})
  }, [userCode, profileAvatar])

  const handleCollectCard = useCallback((cardId: string) => {
    setCollectionCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, collected: true } : c))
    )
    setBoardCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, collected: true } : c))
    )

    if (!userId) return
    const numericId = parseInt(cardId.replace("card-", ""), 10)
    if (Number.isNaN(numericId)) return

    ;(async () => {
      try {
        const { data: existing, error: selectError } = await supabase
          .from("coleccion")
          .select("id,desbloqueada")
          .eq("usuario_id", userId)
          .eq("carta_id", numericId)
          .maybeSingle()

        if (selectError) {
          console.error("Error leyendo coleccion:", selectError)
          return
        }

        if (existing) {
          if (existing.desbloqueada) return
          const { error: updateError } = await supabase
            .from("coleccion")
            .update({ desbloqueada: true })
            .eq("id", existing.id)
          if (updateError) {
            console.error("Error actualizando coleccion:", updateError)
          }
          return
        }

        const { error: insertError } = await supabase
          .from("coleccion")
          .insert({ usuario_id: userId, carta_id: numericId, desbloqueada: true })
        if (insertError) {
          console.error("Error insertando coleccion:", insertError)
        }
      } catch (error) {
        console.error("Error inesperado guardando coleccion:", error)
      }
    })()
  }, [userId])

  const handleDeleteContact = useCallback((contactId: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== contactId))
  }, [])

  const handleAddContact = useCallback((name: string, remoteCode?: string) => {
    const newContact: Contact = {
      id: `contact-${Date.now()}`,
      name,
      avatar: name.charAt(0).toUpperCase(),
      cardsOwned: 0,
      ...(remoteCode && { remoteCode: remoteCode.trim().toUpperCase() }),
    }
    setContacts((prev) => [...prev, newContact])
  }, [])

  const handleTrade = useCallback((contactId: string, cardId: string) => {
    setBoardCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, collected: false } : c))
    )
    setContacts((prev) =>
      prev.map((c) =>
        c.id === contactId ? { ...c, cardsOwned: c.cardsOwned + 1 } : c
      )
    )
  }, [])

  const handleAcceptIncomingTrade = useCallback((cardId: string) => {
    setBoardCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, collected: true } : c))
    )
    setCollectionCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, collected: true } : c))
    )
  }, [])

  const handleCompleteChallenge = useCallback((challengeId: string) => {
    setChallenges((prev) => {
      const updated = prev.map((c) =>
        c.id === challengeId ? { ...c, completed: true } : c
      )
      const challenge = updated.find((c) => c.id === challengeId)
      if (challenge) {
        const cardId = challenge.cardReward
        setBoardCards((prevCards) =>
          prevCards.map((card) =>
            card.id === cardId ? { ...card, collected: true } : card
          )
        )
        setCollectionCards((prev) =>
          prev.map((c) => (c.id === cardId ? { ...c, collected: true } : c))
        )
      }
      return updated
    })

    if (!userId) return
    const numericId = parseInt(challengeId.replace("challenge-", ""), 10)
    if (Number.isNaN(numericId)) return

    ;(async () => {
      try {
        const { data: existing, error: selectError } = await supabase
          .from("desafios_usuario")
          .select("id,completado")
          .eq("usuario_id", userId)
          .eq("desafio_id", numericId)
          .maybeSingle()

        if (selectError) {
          console.error("Error leyendo desafios_usuario:", selectError)
          return
        }

        if (existing) {
          if (existing.completado) return
          const { error: updateError } = await supabase
            .from("desafios_usuario")
            .update({ completado: true })
            .eq("id", existing.id)
          if (updateError) {
            console.error("Error actualizando desafios_usuario:", updateError)
          }
          return
        }

        const { error: insertError } = await supabase
          .from("desafios_usuario")
          .insert({ usuario_id: userId, desafio_id: numericId, completado: true })
        if (insertError) {
          console.error("Error insertando desafios_usuario:", insertError)
        }
      } catch (error) {
        console.error("Error inesperado guardando desafios_usuario:", error)
      }
    })()
  }, [userId])

  const handleResetChallenges = useCallback(() => {
    setChallenges((prev) => prev.map((c) => ({ ...c, completed: false })))

    if (!userId) return

    ;(async () => {
      try {
        const { error } = await supabase
          .from("desafios_usuario")
          .update({ completado: false })
          .eq("usuario_id", userId)
        if (error) {
          console.error("Error reseteando desafios_usuario:", error)
        }
      } catch (error) {
        console.error("Error inesperado reseteando desafios_usuario:", error)
      }
    })()
  }, [userId])

  const handleResetCollection = useCallback(() => {
    setCollectionCards((prev) => prev.map((c) => ({ ...c, collected: false })))
    setBoardCards((prev) => prev.map((c) => ({ ...c, collected: false })))

    if (!userId) return

    ;(async () => {
      try {
        const { error } = await supabase
          .from("coleccion")
          .update({ desbloqueada: false })
          .eq("usuario_id", userId)
        if (error) {
          console.error("Error reseteando coleccion:", error)
        }
      } catch (error) {
        console.error("Error inesperado reseteando coleccion:", error)
      }
    })()
  }, [userId])

  // [MODIFICADO] Cargar progreso cuando userId cambia
  useEffect(() => {
    if (!userId) return

    ;(async () => {
      try {
        const { data: coleccionRows, error: coleccionError } = await supabase
          .from("coleccion")
          .select("carta_id,desbloqueada")
          .eq("usuario_id", userId)
          .eq("desbloqueada", true)

        if (coleccionError) {
          console.error("Error cargando coleccion:", coleccionError)
        } else if (coleccionRows) {
          const collectedIds = new Set(
            coleccionRows.map((row: { carta_id: number }) => `card-${row.carta_id}`)
          )
          setCollectionCards((prev) =>
            prev.map((c) => (collectedIds.has(c.id) ? { ...c, collected: true } : c))
          )
          setBoardCards((prev) =>
            prev.map((c) => (collectedIds.has(c.id) ? { ...c, collected: true } : c))
          )
        }

        const { data: desafiosRows, error: desafiosError } = await supabase
          .from("desafios_usuario")
          .select("desafio_id,completado")
          .eq("usuario_id", userId)
          .eq("completado", true)

        if (desafiosError) {
          console.error("Error cargando desafios_usuario:", desafiosError)
        } else if (desafiosRows) {
          const completedIds = new Set(
            desafiosRows.map((row: { desafio_id: number }) => `challenge-${row.desafio_id}`)
          )
          setChallenges((prev) =>
            prev.map((c) => (completedIds.has(c.id) ? { ...c, completed: true } : c))
          )
        }
      } catch (error) {
        console.error("Error inesperado cargando progreso desde Supabase:", error)
      }
    })()
  }, [userId])

  // [MODIFICADO] Callback cuando el usuario se autentica desde AuthGate
  function handleAuthReady(id: string) {
    setAuthUserId(id)
  }

  // [MODIFICADO] Cerrar sesión
  async function handleLogout() {
    await supabase.auth.signOut()
    setAuthUserId(null)
    setUserId(null)
    setUserCode(null)
    setCollectionCards(INITIAL_CARDS)
    setBoardCards(INITIAL_CARDS)
    setChallenges(INITIAL_CHALLENGES)
  }

  if (cargando) {
    return (
      <div className="flex min-h-dvh flex-col bg-background">
        <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-24 pt-6 flex items-center justify-center">
          <p className="text-muted-foreground">Cargando...</p>
        </main>
      </div>
    )
  }

  if (!authUserId) {
    return (
      <div className="flex min-h-dvh flex-col bg-background">
        <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-24 pt-6">
          <AuthGate onAuthReady={handleAuthReady} />
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <main className="mx-auto w-full max-w-lg flex-1 px-4 pb-24 pt-6">
        {activeTab === "collection" && (
          <CollectionTab
            cards={collectionCards}
            onCollectCard={handleCollectCard}
            onResetCollection={handleResetCollection}
          />
        )}
        {activeTab === "boards" && (
          <BoardsTab boards={INITIAL_BOARDS} cards={boardCards} />
        )}
        {activeTab === "contacts" && (
          <ContactsTab
            contacts={contacts}
            cards={boardCards}
            userCode={userCode ?? ""}
            profileAvatar={profileAvatar}
            onProfileAvatarChange={setProfileAvatar}
            onAddContact={handleAddContact}
            onTrade={handleTrade}
            onAcceptIncomingTrade={handleAcceptIncomingTrade}
            onDeleteContact={handleDeleteContact}
            onLogout={handleLogout}
          />
        )}
        {activeTab === "challenges" && (
          <ChallengesTab
            challenges={challenges}
            cards={boardCards}
            onCompleteChallenge={handleCompleteChallenge}
            onResetChallenges={handleResetChallenges}
          />
        )}
      </main>
      <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
