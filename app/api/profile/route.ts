import { NextRequest, NextResponse } from "next/server"
import { getProfile, setProfile } from "@/lib/profiles-store"

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")
  if (!code) {
    return NextResponse.json({ error: "Falta code" }, { status: 400 })
  }
  const profile = getProfile(code)
  if (!profile) {
    return NextResponse.json({ profileImage: null, displayName: null })
  }
  return NextResponse.json(profile)
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, profileImage, displayName } = body
    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Falta code" }, { status: 400 })
    }
    const profile = setProfile(code, {
      profileImage: profileImage ?? null,
      displayName: displayName ?? null,
    })
    return NextResponse.json(profile)
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 })
  }
}
