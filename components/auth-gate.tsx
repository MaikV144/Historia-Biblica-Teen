"use client" // [MODIFICADO]

import { useState } from "react" // [MODIFICADO]
import { Button } from "@/components/ui/button" // [MODIFICADO]
import { Input } from "@/components/ui/input" // [MODIFICADO]
import { getOrCreateUserCode, setUserCode, getUserCode } from "@/lib/user-code" // [MODIFICADO]

interface AuthGateProps { // [MODIFICADO]
  onCodeReady: (code: string) => void // [MODIFICADO]
} // [MODIFICADO]

export function AuthGate({ onCodeReady }: AuthGateProps) { // [MODIFICADO]
  const [codigoManual, setCodigoManual] = useState("") // [MODIFICADO]
  const [error, setError] = useState<string | null>(null) // [MODIFICADO]
  const [modo, setModo] = useState<"nuevo" | "existente">("nuevo") // [MODIFICADO]

  function handleNuevo() { // [MODIFICADO]
    const code = getOrCreateUserCode() // [MODIFICADO]
    onCodeReady(code) // [MODIFICADO]
  } // [MODIFICADO]

  function handleExistente() { // [MODIFICADO]
    setError(null) // [MODIFICADO]
    const c = codigoManual.trim().toUpperCase() // [MODIFICADO]
    if (!c || c.length < 4) { // [MODIFICADO]
      setError("El código debe tener al menos 4 caracteres") // [MODIFICADO]
      return // [MODIFICADO]
    } // [MODIFICADO]
    setUserCode(c) // [MODIFICADO]
    onCodeReady(c) // [MODIFICADO]
  } // [MODIFICADO]

  return ( // [MODIFICADO]
    <section className="flex flex-col gap-5"> {/* [MODIFICADO] */}
      <header> {/* [MODIFICADO] */}
        <h1 className="text-xl font-bold text-foreground">Bienvenido</h1> {/* [MODIFICADO] */}
        <p className="text-sm text-muted-foreground">Usa un código único para guardar tu progreso.</p> {/* [MODIFICADO] */}
      </header> {/* [MODIFICADO] */}

      <div className="flex flex-col gap-3 rounded-2xl border-2 border-border bg-card p-5"> {/* [MODIFICADO] */}
        <div className="flex gap-2"> {/* [MODIFICADO] */}
          <Button type="button" variant={modo === "nuevo" ? "default" : "outline"} className="flex-1" onClick={() => setModo("nuevo")}> {/* [MODIFICADO] */}
            Nuevo jugador {/* [MODIFICADO] */}
          </Button> {/* [MODIFICADO] */}
          <Button type="button" variant={modo === "existente" ? "default" : "outline"} className="flex-1" onClick={() => setModo("existente")}> {/* [MODIFICADO] */}
            Tengo un código {/* [MODIFICADO] */}
          </Button> {/* [MODIFICADO] */}
        </div> {/* [MODIFICADO] */}

        {modo === "nuevo" && ( // [MODIFICADO]
          <> {/* [MODIFICADO] */}
            <p className="text-sm text-muted-foreground">Se generará un código único para ti. Guárdalo para continuar en otro dispositivo.</p> {/* [MODIFICADO] */}
            <Button onClick={handleNuevo} className="w-full bg-primary text-primary-foreground hover:bg-primary/90"> {/* [MODIFICADO] */}
              Empezar {/* [MODIFICADO] */}
            </Button> {/* [MODIFICADO] */}
          </> // [MODIFICADO]
        )} // [MODIFICADO]

        {modo === "existente" && ( // [MODIFICADO]
          <> {/* [MODIFICADO] */}
            <p className="text-sm text-muted-foreground">Introduce tu código para recuperar tu progreso.</p> {/* [MODIFICADO] */}
            <Input placeholder="Tu código (ej: ABC12345)" value={codigoManual} onChange={(e) => setCodigoManual(e.target.value.toUpperCase())} className="bg-background text-foreground font-mono" onKeyDown={(e) => e.key === "Enter" && handleExistente()} /> {/* [MODIFICADO] */}
            {error && ( // [MODIFICADO]
              <p className="rounded-md bg-destructive/10 px-2 py-1.5 text-xs text-destructive">{error}</p> // [MODIFICADO]
            )} // [MODIFICADO]
            <Button onClick={handleExistente} className="w-full bg-primary text-primary-foreground hover:bg-primary/90"> {/* [MODIFICADO] */}
              Continuar {/* [MODIFICADO] */}
            </Button> {/* [MODIFICADO] */}
          </> // [MODIFICADO]
        )} // [MODIFICADO]
      </div> {/* [MODIFICADO] */}
    </section> // [MODIFICADO]
  ) // [MODIFICADO]
} // [MODIFICADO]
