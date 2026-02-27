/**
 * Código único del usuario para intercambios por internet.
 * Se guarda en localStorage; si no existe, se genera uno nuevo.
 */

const USER_CODE_KEY = "card-app-user-code"

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
const CODE_LENGTH = 8

function generateCode(): string {
  let code = ""
  const randomValues = new Uint8Array(CODE_LENGTH)
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(randomValues)
  }
  for (let i = 0; i < CODE_LENGTH; i++) {
    code += CHARS[randomValues[i]! % CHARS.length]
  }
  return code
}

export function getUserCode(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(USER_CODE_KEY)
}

export function getOrCreateUserCode(): string {
  if (typeof window === "undefined") return ""
  let code = localStorage.getItem(USER_CODE_KEY)
  if (!code) {
    code = generateCode()
    localStorage.setItem(USER_CODE_KEY, code)
  }
  return code
}

export function setUserCode(code: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem(USER_CODE_KEY, code)
}
