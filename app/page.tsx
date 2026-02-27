 "use client"

import { useState, useCallback, useEffect } from "react"
import { BottomTabs, type TabId } from "@/components/bottom-tabs"
import { CollectionTab } from "@/components/collection-tab"
import { BoardsTab } from "@/components/boards-tab"
import { ContactsTab } from "@/components/contacts-tab"
import { ChallengesTab } from "@/components/challenges-tab"
import { getOrCreateUserCode } from "@/lib/user-code" // [MODIFICADO]
import {
  type Card,
  type Contact,
  type Challenge,
  INITIAL_CARDS,
  INITIAL_BOARDS,
  INITIAL_CONTACTS,
  INITIAL_CHALLENGES,
} from "@/lib/card-data" // [MODIFICADO]
import { getOrCreateUsuarioByDeviceId, getUsuarioByAuthUserId } from "@/lib/user-repository" // [MODIFICADO]
import { supabase } from "@/lib/supabase-client" // [MODIFICADO]

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("collection")
  const [collectionCards, setCollectionCards] = useState<Card[]>(INITIAL_CARDS)
  const [boardCards, setBoardCards] = useState<Card[]>(INITIAL_CARDS)
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS)
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES)
  const [profileAvatar, setProfileAvatar] = useState<string | null>(null)
  const [userCode, setUserCode] = useState<string | null>(null)
  const [userId, setUserId] = useState<number | null>(null) // [MODIFICADO]

  useEffect(() => {
    setUserCode(getOrCreateUserCode()) // [MODIFICADO]
  }, []) // [MODIFICADO]

  // Sincronizar foto de perfil al servidor para que otros la vean
  useEffect(() => {
    if (!userCode) return
    fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: userCode, profileImage: profileAvatar }),
    }).catch(() => {})
  }, [userCode, profileAvatar])

  useEffect(() => { // [MODIFICADO]
    ;(async () => { // [MODIFICADO]
      const { data, error } = await supabase.auth.getUser() // [MODIFICADO]
      if (error) { // [MODIFICADO]
        console.error("Error obteniendo usuario de Auth:", error) // [MODIFICADO]
      } // [MODIFICADO]

      if (data?.user) { // [MODIFICADO]
        const usuarioByAuth = await getUsuarioByAuthUserId(data.user.id) // [MODIFICADO]
        if (usuarioByAuth) { // [MODIFICADO]
          setUserId(usuarioByAuth.id) // [MODIFICADO]
          return // [MODIFICADO]
        } // [MODIFICADO]
      } // [MODIFICADO]

      if (!userCode) return // [MODIFICADO]
      const usuarioByDevice = await getOrCreateUsuarioByDeviceId(userCode) // [MODIFICADO]
      setUserId(usuarioByDevice ? usuarioByDevice.id : null) // [MODIFICADO]
    })() // [MODIFICADO]
  }, [userCode]) // [MODIFICADO]

  const handleCollectCard = useCallback((cardId: string) => {
    setCollectionCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, collected: true } : c))
    )
    // [MODIFICADO] Vincular colección a tablero: misma carta desbloqueada en Tableros
    setBoardCards((prev) =>
      prev.map((c) => (c.id === cardId ? { ...c, collected: true } : c))
    )

    if (!userId) return // [MODIFICADO]
    const numericId = parseInt(cardId.replace("card-", ""), 10) // [MODIFICADO]
    if (Number.isNaN(numericId)) return // [MODIFICADO]

    ;(async () => { // [MODIFICADO]
      try { // [MODIFICADO]
        const { data: existing, error: selectError } = await supabase // [MODIFICADO]
          .from("coleccion") // [MODIFICADO]
          .select("id,desbloqueada") // [MODIFICADO]
          .eq("usuario_id", userId) // [MODIFICADO]
          .eq("carta_id", numericId) // [MODIFICADO]
          .maybeSingle() // [MODIFICADO]

        if (selectError) { // [MODIFICADO]
          console.error("Error leyendo coleccion:", selectError) // [MODIFICADO]
          return // [MODIFICADO]
        } // [MODIFICADO]

        if (existing) { // [MODIFICADO]
          if (existing.desbloqueada) return // [MODIFICADO]
          const { error: updateError } = await supabase // [MODIFICADO]
            .from("coleccion") // [MODIFICADO]
            .update({ desbloqueada: true }) // [MODIFICADO]
            .eq("id", existing.id) // [MODIFICADO]
          if (updateError) { // [MODIFICADO]
            console.error("Error actualizando coleccion:", updateError) // [MODIFICADO]
          } // [MODIFICADO]
          return // [MODIFICADO]
        } // [MODIFICADO]

        const { error: insertError } = await supabase // [MODIFICADO]
          .from("coleccion") // [MODIFICADO]
          .insert({ usuario_id: userId, carta_id: numericId, desbloqueada: true }) // [MODIFICADO]
        if (insertError) { // [MODIFICADO]
          console.error("Error insertando coleccion:", insertError) // [MODIFICADO]
        } // [MODIFICADO]
      } catch (error) { // [MODIFICADO]
        console.error("Error inesperado guardando coleccion:", error) // [MODIFICADO]
      } // [MODIFICADO]
    })() // [MODIFICADO]
  }, [userId]) // [MODIFICADO]

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
        // [MODIFICADO] Vincular desafíos a colección: carta desbloqueada por desafío también en Mi colección
        setCollectionCards((prev) =>
          prev.map((c) => (c.id === cardId ? { ...c, collected: true } : c))
        )
      }
      return updated
    })

    if (!userId) return // [MODIFICADO]
    const numericId = parseInt(challengeId.replace("challenge-", ""), 10) // [MODIFICADO]
    if (Number.isNaN(numericId)) return // [MODIFICADO]

    ;(async () => { // [MODIFICADO]
      try { // [MODIFICADO]
        const { data: existing, error: selectError } = await supabase // [MODIFICADO]
          .from("desafios_usuario") // [MODIFICADO]
          .select("id,completado") // [MODIFICADO]
          .eq("usuario_id", userId) // [MODIFICADO]
          .eq("desafio_id", numericId) // [MODIFICADO]
          .maybeSingle() // [MODIFICADO]

        if (selectError) { // [MODIFICADO]
          console.error("Error leyendo desafios_usuario:", selectError) // [MODIFICADO]
          return // [MODIFICADO]
        } // [MODIFICADO]

        if (existing) { // [MODIFICADO]
          if (existing.completado) return // [MODIFICADO]
          const { error: updateError } = await supabase // [MODIFICADO]
            .from("desafios_usuario") // [MODIFICADO]
            .update({ completado: true }) // [MODIFICADO]
            .eq("id", existing.id) // [MODIFICADO]
          if (updateError) { // [MODIFICADO]
            console.error("Error actualizando desafios_usuario:", updateError) // [MODIFICADO]
          } // [MODIFICADO]
          return // [MODIFICADO]
        } // [MODIFICADO]

        const { error: insertError } = await supabase // [MODIFICADO]
          .from("desafios_usuario") // [MODIFICADO]
          .insert({ usuario_id: userId, desafio_id: numericId, completado: true }) // [MODIFICADO]
        if (insertError) { // [MODIFICADO]
          console.error("Error insertando desafios_usuario:", insertError) // [MODIFICADO]
        } // [MODIFICADO]
      } catch (error) { // [MODIFICADO]
        console.error("Error inesperado guardando desafios_usuario:", error) // [MODIFICADO]
      } // [MODIFICADO]
    })() // [MODIFICADO]
  }, [userId]) // [MODIFICADO]

  // [MODIFICADO] Reiniciar desafíos a incompletos y cartas a no coleccionadas
  const handleResetChallenges = useCallback(() => {
    setChallenges((prev) => prev.map((c) => ({ ...c, completed: false })))

    if (!userId) return // [MODIFICADO]

    ;(async () => { // [MODIFICADO]
      try { // [MODIFICADO]
        const { error } = await supabase // [MODIFICADO]
          .from("desafios_usuario") // [MODIFICADO]
          .update({ completado: false }) // [MODIFICADO]
          .eq("usuario_id", userId) // [MODIFICADO]
        if (error) { // [MODIFICADO]
          console.error("Error reseteando desafios_usuario:", error) // [MODIFICADO]
        } // [MODIFICADO]
      } catch (error) { // [MODIFICADO]
        console.error("Error inesperado reseteando desafios_usuario:", error) // [MODIFICADO]
      } // [MODIFICADO]
    })() // [MODIFICADO]
  }, [userId]) // [MODIFICADO]

  const handleResetCollection = useCallback(() => {
    setCollectionCards((prev) => prev.map((c) => ({ ...c, collected: false })))
    setBoardCards((prev) => prev.map((c) => ({ ...c, collected: false })))

    if (!userId) return // [MODIFICADO]

    ;(async () => { // [MODIFICADO]
      try { // [MODIFICADO]
        const { error } = await supabase // [MODIFICADO]
          .from("coleccion") // [MODIFICADO]
          .update({ desbloqueada: false }) // [MODIFICADO]
          .eq("usuario_id", userId) // [MODIFICADO]
        if (error) { // [MODIFICADO]
          console.error("Error reseteando coleccion:", error) // [MODIFICADO]
        } // [MODIFICADO]
      } catch (error) { // [MODIFICADO]
        console.error("Error inesperado reseteando coleccion:", error) // [MODIFICADO]
      } // [MODIFICADO]
    })() // [MODIFICADO]
  }, [userId]) // [MODIFICADO]

  useEffect(() => { // [MODIFICADO]
    if (!userId) return // [MODIFICADO]

    ;(async () => { // [MODIFICADO]
      try { // [MODIFICADO]
        const { data: coleccionRows, error: coleccionError } = await supabase // [MODIFICADO]
          .from("coleccion") // [MODIFICADO]
          .select("carta_id,desbloqueada") // [MODIFICADO]
          .eq("usuario_id", userId) // [MODIFICADO]
          .eq("desbloqueada", true) // [MODIFICADO]

        if (coleccionError) { // [MODIFICADO]
          console.error("Error cargando coleccion:", coleccionError) // [MODIFICADO]
        } else if (coleccionRows) { // [MODIFICADO]
          const collectedIds = new Set( // [MODIFICADO]
            coleccionRows.map((row: { carta_id: number }) => `card-${row.carta_id}`) // [MODIFICADO]
          ) // [MODIFICADO]
          setCollectionCards((prev) => // [MODIFICADO]
            prev.map((c) => (collectedIds.has(c.id) ? { ...c, collected: true } : c)) // [MODIFICADO]
          ) // [MODIFICADO]
          setBoardCards((prev) => // [MODIFICADO]
            prev.map((c) => (collectedIds.has(c.id) ? { ...c, collected: true } : c)) // [MODIFICADO]
          ) // [MODIFICADO]
        } // [MODIFICADO]

        const { data: desafiosRows, error: desafiosError } = await supabase // [MODIFICADO]
          .from("desafios_usuario") // [MODIFICADO]
          .select("desafio_id,completado") // [MODIFICADO]
          .eq("usuario_id", userId) // [MODIFICADO]
          .eq("completado", true) // [MODIFICADO]

        if (desafiosError) { // [MODIFICADO]
          console.error("Error cargando desafios_usuario:", desafiosError) // [MODIFICADO]
        } else if (desafiosRows) { // [MODIFICADO]
          const completedIds = new Set( // [MODIFICADO]
            desafiosRows.map((row: { desafio_id: number }) => `challenge-${row.desafio_id}`) // [MODIFICADO]
          ) // [MODIFICADO]
          setChallenges((prev) => // [MODIFICADO]
            prev.map((c) => (completedIds.has(c.id) ? { ...c, completed: true } : c)) // [MODIFICADO]
          ) // [MODIFICADO]
        } // [MODIFICADO]
      } catch (error) { // [MODIFICADO]
        console.error("Error inesperado cargando progreso desde Supabase:", error) // [MODIFICADO]
      } // [MODIFICADO]
    })() // [MODIFICADO]
  }, [userId]) // [MODIFICADO]

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
            userCode={userCode}
            profileAvatar={profileAvatar}
            onProfileAvatarChange={setProfileAvatar}
            onAddContact={handleAddContact}
            onTrade={handleTrade}
            onAcceptIncomingTrade={handleAcceptIncomingTrade}
            onDeleteContact={handleDeleteContact}
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
