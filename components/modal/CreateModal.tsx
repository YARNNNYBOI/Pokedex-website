"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"

const addPokemonSchema = z.object({
  pokedex_number: z.coerce.number().int().positive(),
  name: z.string().min(1, "Name is required"),
  type_primary: z.string().min(1, "Primary type is required"),
  type_secondary: z.string().optional(),
})

// Before coercion — what the raw form fields hold (e.g. pokedex_number could be a string from an <input>)
type AddPokemonFormInput = z.input<typeof addPokemonSchema>

// After coercion/validation — what you actually get in onSubmit
type AddPokemonOutput = z.output<typeof addPokemonSchema>

async function addPokemon(data: AddPokemonOutput) {
  const res = await fetch("/api/pokemon", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Failed to add pokemon")
  return res.json()
}

export default function AddPokemonDialog() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const form = useForm<AddPokemonFormInput, any, AddPokemonOutput>({
    resolver: zodResolver(addPokemonSchema),
    defaultValues: {
      pokedex_number: undefined,
      name: "",
      type_primary: "",
      type_secondary: "",
    },
  })

  async function onSubmit(values: AddPokemonOutput) {
    try {
      await addPokemon(values)
      form.reset()
      setOpen(false)
      router.refresh()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="default"
            className="fixed right-6 bottom-6 z-50 rounded-full shadow-lg"
          >
            Add Pokemon
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Pokemon</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="pokedex_number"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Pokedex Number</FieldLabel>
                <Input
                  {...field}
                  value={field.value as string | number | undefined}
                  id={field.name}
                  type="number"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldDescription>
                    {fieldState.error?.message}
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldDescription>
                    {fieldState.error?.message}
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name="type_primary"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Primary Type</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldDescription>
                    {fieldState.error?.message}
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          <Controller
            name="type_secondary"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>
                  Secondary Type (optional)
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldDescription>
                    {fieldState.error?.message}
                  </FieldDescription>
                )}
              </Field>
            )}
          />

          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
