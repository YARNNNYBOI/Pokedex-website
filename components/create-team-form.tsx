"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

type TeamSlot = {
  id: string
  species: string
}

function createEmptySlot(): TeamSlot {
  return { id: crypto.randomUUID(), species: "" }
}

export default function CreateTeamForm() {
  const router = useRouter()
  const [teamName, setTeamName] = useState("")
  const [slots, setSlots] = useState<TeamSlot[]>([createEmptySlot()])
  const [submitting, setSubmitting] = useState(false)

  function updateSlot(id: string, species: string) {
    setSlots((prev) =>
      prev.map((slot) => (slot.id === id ? { ...slot, species } : slot))
    )
  }

  function addSlot() {
    if (slots.length >= 6) return
    setSlots((prev) => [...prev, createEmptySlot()])
  }

  function removeSlot(id: string) {
    setSlots((prev) => prev.filter((slot) => slot.id !== id))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)

    const payload = {
      name: teamName,
      pokemon: slots
        .map((slot) => slot.species.trim())
        .filter((species) => species.length > 0),
    }

    try {
      // Replace this with your actual API call, e.g.:
      // await fetch("/api/teams", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // })
      console.log("Submitting team:", payload)

      router.back() // closes modal if intercepted, or navigates back on the full page
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="team-name">Team Name</Label>
        <Input
          id="team-name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="e.g. Kanto Champions"
          required
        />
      </div>

      <div className="space-y-3">
        <Label>Pokémon ({slots.length}/6)</Label>
        {slots.map((slot, index) => (
          <div key={slot.id} className="flex items-center gap-2">
            <Input
              value={slot.species}
              onChange={(e) => updateSlot(slot.id, e.target.value)}
              placeholder={`Pokémon #${index + 1}`}
            />
            {slots.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeSlot(slot.id)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}

        {slots.length < 6 && (
          <Button type="button" variant="outline" size="sm" onClick={addSlot}>
            + Add Pokémon
          </Button>
        )}
      </div>

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Creating..." : "Create Team"}
      </Button>
    </form>
  )
}