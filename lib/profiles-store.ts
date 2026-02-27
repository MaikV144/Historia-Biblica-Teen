/**
 * Perfiles por código de usuario (foto y nombre para mostrar a otros).
 * Misma consideración que trades-store: en producción usar KV/DB.
 */

export interface UserProfile {
  profileImage: string | null
  displayName: string | null
}

const profiles = new Map<string, UserProfile>()

export function getProfile(code: string): UserProfile | undefined {
  const normalized = code.trim().toUpperCase()
  return profiles.get(normalized)
}

export function setProfile(
  code: string,
  data: { profileImage?: string | null; displayName?: string | null }
): UserProfile {
  const normalized = code.trim().toUpperCase()
  const current = profiles.get(normalized) ?? {
    profileImage: null,
    displayName: null,
  }
  const updated: UserProfile = {
    profileImage: data.profileImage !== undefined ? data.profileImage : current.profileImage,
    displayName: data.displayName !== undefined ? data.displayName : current.displayName,
  }
  profiles.set(normalized, updated)
  return updated
}
