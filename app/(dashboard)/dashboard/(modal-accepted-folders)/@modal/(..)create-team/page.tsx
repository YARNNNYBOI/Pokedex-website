"use client"

import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import CreateTeamForm from "@/components/create-team-form"

export default function CreateTeamModal() {
  const router = useRouter()

  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Team</DialogTitle>
          <DialogDescription>
            Build your Pokémon team below.
          </DialogDescription>
        </DialogHeader>
        <CreateTeamForm />
      </DialogContent>
    </Dialog>
  )
}