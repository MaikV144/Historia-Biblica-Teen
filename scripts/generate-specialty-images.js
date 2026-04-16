const fs = require("fs")
const path = require("path")

const root = "c:/Apps/App Especialidades/Especialidades"
const dataPath = path.join(root, "lib", "conquistadores-data.ts")
const outputDir = path.join(root, "public", "specialties", "items")

function toId(input) {
  return input
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " y ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function hueFromText(text) {
  let hash = 0
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) % 360
  }
  return Math.abs(hash) % 360
}

function initials(text) {
  const parts = text.split(/\s+/).filter(Boolean)
  const a = (parts[0] || "?").slice(0, 1)
  const b = (parts[1] || "").slice(0, 1)
  return (a + b).toUpperCase()
}

function makeSvg(name, id) {
  const hue = hueFromText(id)
  const hue2 = (hue + 36) % 360
  const label = initials(name)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${hue} 72% 58%)" />
      <stop offset="100%" stop-color="hsl(${hue2} 72% 42%)" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="180" ry="150" fill="url(#g)" />
  <circle cx="90" cy="100" r="58" fill="rgba(255,255,255,0.2)" />
  <circle cx="430" cy="418" r="72" fill="rgba(255,255,255,0.14)" />
  <text x="256" y="292" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="128" font-weight="700" fill="rgba(255,255,255,0.95)">${label}</text>
</svg>`
}

function extractSpecialtyNames(source) {
  const blocks = [...source.matchAll(/makeSpecialties\(\"[^\"]+\",\s*\[(.*?)\]\s*\)/gs)].map(
    (m) => m[1]
  )

  const names = []
  for (const block of blocks) {
    const entries = new Function(`return [${block}]`)()
    for (const entry of entries) {
      if (typeof entry === "string") {
        names.push(entry)
      } else if (entry && typeof entry === "object" && typeof entry.name === "string") {
        names.push(entry.name)
      }
    }
  }
  return names
}

const source = fs.readFileSync(dataPath, "utf8")
const allNames = extractSpecialtyNames(source)
const uniqueById = new Map()
for (const name of allNames) {
  uniqueById.set(toId(name), name)
}

for (const [id, name] of uniqueById.entries()) {
  const svg = makeSvg(name, id)
  fs.writeFileSync(path.join(outputDir, `${id}.svg`), svg, "utf8")
}

console.log(`Generated ${uniqueById.size} specialty images in ${outputDir}`)
