"use client" // [MODIFICADO]

import { useState } from "react" // [MODIFICADO]
import { Button } from "@/components/ui/button" // [MODIFICADO]
import { Input } from "@/components/ui/input" // [MODIFICADO]
import { supabase } from "@/lib/supabase-client" // [MODIFICADO]

interface AuthGateProps { // [MODIFICADO]
  onAuthReady: (authUserId: string) => void // [MODIFICADO]
} // [MODIFICADO]

export function AuthGate({ onAuthReady }: AuthGateProps) { // [MODIFICADO]
  const [email, setEmail] = useState("") // [MODIFICADO]
  const [password, setPassword] = useState("") // [MODIFICADO]
  const [error, setError] = useState<string | null>(null) // [MODIFICADO]
  const [loading, setLoading] = useState(false) // [MODIFICADO]
  const [modo, setModo] = useState<"login" | "registro">("login") // [MODIFICADO]

  async function handleLogin() { // [MODIFICADO]
    setError(null) // [MODIFICADO]
    const emailTrim = email.trim().toLowerCase() // [MODIFICADO]
    const passTrim = password.trim() // [MODIFICADO]

    if (!emailTrim || !passTrim) { // [MODIFICADO]
      setError("Ingresa tu email y contraseña") // [MODIFICADO]
      return // [MODIFICADO]
    } // [MODIFICADO]

    setLoading(true) // [MODIFICADO]
    try { // [MODIFICADO]
      const { data, error: authError } = await supabase.auth.signInWithPassword({ // [MODIFICADO]
        email: emailTrim, // [MODIFICADO]
        password: passTrim, // [MODIFICADO]
      }) // [MODIFICADO]

      if (authError) { // [MODIFICADO]
        if (authError.message.includes("Invalid login credentials")) { // [MODIFICADO]
          setError("Email o contraseña incorrectos") // [MODIFICADO]
        } else { // [MODIFICADO]
          setError(authError.message) // [MODIFICADO]
        } // [MODIFICADO]
        setLoading(false) // [MODIFICADO]
        return // [MODIFICADO]
      } // [MODIFICADO]

      if (data.user) { // [MODIFICADO]
        onAuthReady(data.user.id) // [MODIFICADO]
      } // [MODIFICADO]
    } catch (err) { // [MODIFICADO]
      setError("Error de conexión") // [MODIFICADO]
    } finally { // [MODIFICADO]
      setLoading(false) // [MODIFICADO]
    } // [MODIFICADO]
  } // [MODIFICADO]

  async function handleRegistro() { // [MODIFICADO]
    setError(null) // [MODIFICADO]
    const emailTrim = email.trim().toLowerCase() // [MODIFICADO]
    const passTrim = password.trim() // [MODIFICADO]

    if (!emailTrim || !passTrim) { // [MODIFICADO]
      setError("Ingresa tu email y contraseña") // [MODIFICADO]
      return // [MODIFICADO]
    } // [MODIFICADO]

    if (passTrim.length < 6) { // [MODIFICADO]
      setError("La contraseña debe tener al menos 6 caracteres") // [MODIFICADO]
      return // [MODIFICADO]
    } // [MODIFICADO]

    setLoading(true) // [MODIFICADO]
    try { // [MODIFICADO]
      const { data, error: authError } = await supabase.auth.signUp({ // [MODIFICADO]
        email: emailTrim, // [MODIFICADO]
        password: passTrim, // [MODIFICADO]
        options: { // [MODIFICADO]
          emailRedirectTo: undefined, // [MODIFICADO]
        }, // [MODIFICADO]
      }) // [MODIFICADO]

      if (authError) { // [MODIFICADO]
        if (authError.message.includes("already registered")) { // [MODIFICADO]
          setError("Este email ya está registrado. Usa iniciar sesión.") // [MODIFICADO]
        } else if (authError.message.includes("rate limit")) { // [MODIFICADO]
          setError("Demasiados intentos. Espera un momento.") // [MODIFICADO]
        } else { // [MODIFICADO]
          setError(authError.message) // [MODIFICADO]
        } // [MODIFICADO]
        setLoading(false) // [MODIFICADO]
        return // [MODIFICADO]
      } // [MODIFICADO]

      if (data.user) { // [MODIFICADO]
        onAuthReady(data.user.id) // [MODIFICADO]
      } // [MODIFICADO]
    } catch (err) { // [MODIFICADO]
      setError("Error de conexión") // [MODIFICADO]
    } finally { // [MODIFICADO]
      setLoading(false) // [MODIFICADO]
    } // [MODIFICADO]
  } // [MODIFICADO]

  function handleSubmit() { // [MODIFICADO]
    if (modo === "login") { // [MODIFICADO]
      handleLogin() // [MODIFICADO]
    } else { // [MODIFICADO]
      handleRegistro() // [MODIFICADO]
    } // [MODIFICADO]
  } // [MODIFICADO]

  return ( // [MODIFICADO]
    <section className="flex flex-col gap-5"> {/* [MODIFICADO] */}
      <header> {/* [MODIFICADO] */}
        <h1 className="text-xl font-bold text-foreground">Bienvenido</h1> {/* [MODIFICADO] */}
        <p className="text-sm text-muted-foreground">Inicia sesión o crea una cuenta para guardar tu progreso.</p> {/* [MODIFICADO] */}
      </header> {/* [MODIFICADO] */}

      <div className="flex flex-col gap-3 rounded-2xl border-2 border-border bg-card p-5"> {/* [MODIFICADO] */}
        <div className="flex gap-2"> {/* [MODIFICADO] */}
          <Button type="button" variant={modo === "login" ? "default" : "outline"} className="flex-1" onClick={() => setModo("login")} disabled={loading}> {/* [MODIFICADO] */}
            Iniciar sesión {/* [MODIFICADO] */}
          </Button> {/* [MODIFICADO] */}
          <Button type="button" variant={modo === "registro" ? "default" : "outline"} className="flex-1" onClick={() => setModo("registro")} disabled={loading}> {/* [MODIFICADO] */}
            Crear cuenta {/* [MODIFICADO] */}
          </Button> {/* [MODIFICADO] */}
        </div> {/* [MODIFICADO] */}

        <Input // [MODIFICADO]
          type="email" // [MODIFICADO]
          placeholder="tu@email.com" // [MODIFICADO]
          value={email} // [MODIFICADO]
          onChange={(e) => setEmail(e.target.value)} // [MODIFICADO]
          className="bg-background text-foreground" // [MODIFICADO]
          disabled={loading} // [MODIFICADO]
          autoComplete="email" // [MODIFICADO]
        /> {/* [MODIFICADO] */}

        <Input // [MODIFICADO]
          type="password" // [MODIFICADO]
          placeholder="Contraseña (mínimo 6 caracteres)" // [MODIFICADO]
          value={password} // [MODIFICADO]
          onChange={(e) => setPassword(e.target.value)} // [MODIFICADO]
          className="bg-background text-foreground" // [MODIFICADO]
          disabled={loading} // [MODIFICADO]
          autoComplete={modo === "login" ? "current-password" : "new-password"} // [MODIFICADO]
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()} // [MODIFICADO]
        /> {/* [MODIFICADO] */}

        {error && ( // [MODIFICADO]
          <p className="rounded-md bg-destructive/10 px-2 py-1.5 text-xs text-destructive">{error}</p> // [MODIFICADO]
        )} // [MODIFICADO]

        <Button // [MODIFICADO]
          onClick={handleSubmit} // [MODIFICADO]
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90" // [MODIFICADO]
          disabled={loading} // [MODIFICADO]
        > {/* [MODIFICADO] */}
          {loading ? "Cargando..." : modo === "login" ? "Entrar" : "Registrarse"} {/* [MODIFICADO] */}
        </Button> {/* [MODIFICADO] */}
      </div> {/* [MODIFICADO] */}
    </section> // [MODIFICADO]
  ) // [MODIFICADO]
} // [MODIFICADO]
