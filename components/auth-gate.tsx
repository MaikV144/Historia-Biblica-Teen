"use client" // [MODIFICADO]
 // [MODIFICADO]
import { useMemo, useState } from "react" // [MODIFICADO]
import { supabase } from "@/lib/supabase-client" // [MODIFICADO]
import { Button } from "@/components/ui/button" // [MODIFICADO]
import { Input } from "@/components/ui/input" // [MODIFICADO]
 // [MODIFICADO]
interface AuthGateProps { // [MODIFICADO]
  onAuthed?: () => void // [MODIFICADO]
} // [MODIFICADO]
 // [MODIFICADO]
export function AuthGate({ onAuthed }: AuthGateProps) { // [MODIFICADO]
  const [usuario, setUsuario] = useState("") // [MODIFICADO]
  const [clave, setClave] = useState("") // [MODIFICADO]
  const [cargando, setCargando] = useState(false) // [MODIFICADO]
  const [error, setError] = useState<string | null>(null) // [MODIFICADO]
  const [modo, setModo] = useState<"entrar" | "crear">("entrar") // [MODIFICADO]
 // [MODIFICADO]
  const emailTecnico = useMemo(() => { // [MODIFICADO]
    const u = usuario.trim().toLowerCase() // [MODIFICADO]
    if (!u) return "" // [MODIFICADO]
    const safe = u.replace(/[^a-z0-9._-]/g, "") // [MODIFICADO]
    return `${safe}@example.com` // [MODIFICADO]
  }, [usuario]) // [MODIFICADO]
 // [MODIFICADO]
  async function handleAuth() { // [MODIFICADO]
    setError(null) // [MODIFICADO]
    const u = usuario.trim() // [MODIFICADO]
    if (!u) { // [MODIFICADO]
      setError("Escribe tu usuario") // [MODIFICADO]
      return // [MODIFICADO]
    } // [MODIFICADO]
    if (!clave) { // [MODIFICADO]
      setError("Escribe tu clave") // [MODIFICADO]
      return // [MODIFICADO]
    } // [MODIFICADO]
    if (!emailTecnico) { // [MODIFICADO]
      setError("Usuario inválido") // [MODIFICADO]
      return // [MODIFICADO]
    } // [MODIFICADO]
 // [MODIFICADO]
    setCargando(true) // [MODIFICADO]
    try { // [MODIFICADO]
      if (modo === "crear") { // [MODIFICADO]
        const { error: signUpError } = await supabase.auth.signUp({ email: emailTecnico, password: clave }) // [MODIFICADO]
        if (signUpError) { // [MODIFICADO]
          setError(signUpError.message) // [MODIFICADO]
          return // [MODIFICADO]
        } // [MODIFICADO]
      } // [MODIFICADO]
 // [MODIFICADO]
      const { error: signInError } = await supabase.auth.signInWithPassword({ email: emailTecnico, password: clave }) // [MODIFICADO]
      if (signInError) { // [MODIFICADO]
        if (modo === "entrar") { // [MODIFICADO]
          const { error: signUpError2 } = await supabase.auth.signUp({ email: emailTecnico, password: clave }) // [MODIFICADO]
          if (signUpError2) { // [MODIFICADO]
            setError(signInError.message) // [MODIFICADO]
            return // [MODIFICADO]
          } // [MODIFICADO]
          const { error: signInError2 } = await supabase.auth.signInWithPassword({ email: emailTecnico, password: clave }) // [MODIFICADO]
          if (signInError2) { // [MODIFICADO]
            setError(signInError2.message) // [MODIFICADO]
            return // [MODIFICADO]
          } // [MODIFICADO]
        } else { // [MODIFICADO]
          setError(signInError.message) // [MODIFICADO]
          return // [MODIFICADO]
        } // [MODIFICADO]
      } // [MODIFICADO]
 // [MODIFICADO]
      onAuthed?.() // [MODIFICADO]
    } catch (e) { // [MODIFICADO]
      setError("No se pudo iniciar sesión") // [MODIFICADO]
    } finally { // [MODIFICADO]
      setCargando(false) // [MODIFICADO]
    } // [MODIFICADO]
  } // [MODIFICADO]
 // [MODIFICADO]
  return ( // [MODIFICADO]
    <section className="flex flex-col gap-5"> {/* [MODIFICADO] */} 
      <header> {/* [MODIFICADO] */} 
        <h1 className="text-xl font-bold text-foreground">Iniciar sesión</h1> {/* [MODIFICADO] */} 
        <p className="text-sm text-muted-foreground">Usa un usuario y una clave para guardar tu progreso.</p> {/* [MODIFICADO] */} 
      </header> {/* [MODIFICADO] */} 
 {/* [MODIFICADO] */} 
      <div className="flex flex-col gap-3 rounded-2xl border-2 border-border bg-card p-5"> {/* [MODIFICADO] */} 
        <div className="flex gap-2"> {/* [MODIFICADO] */} 
          <Button type="button" variant={modo === "entrar" ? "default" : "outline"} className="flex-1" onClick={() => setModo("entrar")} disabled={cargando}> {/* [MODIFICADO] */} 
            Entrar {/* [MODIFICADO] */} 
          </Button> {/* [MODIFICADO] */} 
          <Button type="button" variant={modo === "crear" ? "default" : "outline"} className="flex-1" onClick={() => setModo("crear")} disabled={cargando}> {/* [MODIFICADO] */} 
            Crear cuenta {/* [MODIFICADO] */} 
          </Button> {/* [MODIFICADO] */} 
        </div> {/* [MODIFICADO] */} 
 {/* [MODIFICADO] */} 
        <Input placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} className="bg-background text-foreground" autoComplete="username" /> {/* [MODIFICADO] */} 
        <Input placeholder="Clave" value={clave} onChange={(e) => setClave(e.target.value)} className="bg-background text-foreground" type="password" autoComplete={modo === "crear" ? "new-password" : "current-password"} onKeyDown={(e) => e.key === "Enter" && handleAuth()} /> {/* [MODIFICADO] */} 
 {/* [MODIFICADO] */} 
        {error && ( // [MODIFICADO]
          <p className="rounded-md bg-destructive/10 px-2 py-1.5 text-xs text-destructive">{error}</p> // [MODIFICADO]
        )} // [MODIFICADO]
 {/* [MODIFICADO] */} 
        <Button onClick={handleAuth} className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={cargando}> {/* [MODIFICADO] */} 
          {cargando ? "..." : modo === "crear" ? "Crear y entrar" : "Entrar"} {/* [MODIFICADO] */} 
        </Button> {/* [MODIFICADO] */} 
 {/* [MODIFICADO] */} 
        <p className="text-xs text-muted-foreground"> {/* [MODIFICADO] */} 
          Nota: no necesitas correo real. Internamente se genera un email técnico a partir de tu usuario. {/* [MODIFICADO] */} 
        </p> {/* [MODIFICADO] */} 
      </div> {/* [MODIFICADO] */} 
    </section> // [MODIFICADO]
  ) // [MODIFICADO]
} // [MODIFICADO]

