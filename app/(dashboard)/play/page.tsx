// app/play/page.tsx
import PokemonEmulator from "@/components/pokemon-emulator"

export default function PlayPage() {
  return (
    <main className="p-8">
      <PokemonEmulator
        romPath="rom/Pokemon Red Version (Colorization).gb"
        core="gambatte"
      />
    </main>
  )
}
