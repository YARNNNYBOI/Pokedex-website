// components/pokemon-emulator.tsx
"use client"

import { useEffect, useRef, useState } from "react"

interface Props {
  romPath: string // e.g. "/roms/pokemon-red.gb"
  core: string // "gambatte" for GB/GBC, "mgba" for GBA
}

export default function PokemonEmulator({ romPath, core }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Prevent double-injecting the script on re-renders/hot reload
    if ((window as any).EJS_emulator) return

    ;(window as any).EJS_player = "#game-container"
    ;(window as any).EJS_gameUrl = romPath
    ;(window as any).EJS_core = core
    ;(window as any).EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/"
    ;(window as any).EJS_startOnLoaded = true
    ;(window as any).EJS_disableWakeLock = true

    const script = document.createElement("script")
    script.src = "https://cdn.emulatorjs.org/stable/data/loader.js"
    script.onload = () => setLoaded(true)
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
      delete (window as any).EJS_emulator
    }
  }, [romPath, core])

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div
        id="game-container"
        ref={containerRef}
        className="aspect-[10/9] w-full overflow-hidden rounded-lg bg-black"
      />
      {!loaded && (
        <p className="mt-2 text-sm text-muted-foreground">
          Loading emulator...
        </p>
      )}
    </div>
  )
}
