"use client"

import { getPokemon } from "@/lib/routes"
import { useQuery } from "@tanstack/react-query"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { typeColors } from "@/lib/pokemon-colors"
import { id } from "zod/v4/locales"

type PokemonCardProps = {
  name: string
  typePrimary: string
  typeSecondary: string | null
  pokedex_number: number
}

export default function PokemonCard({
  name,
  typePrimary,
  typeSecondary,
  pokedex_number,
}: PokemonCardProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemonImage", name],
    queryFn: () => getPokemon(name.toLowerCase()),
  })

  const types = [typePrimary, typeSecondary].filter(Boolean) as string[]
  const imageUrl = data?.sprites?.other?.["official-artwork"]?.front_default

  const typeBadges = (
    <div className="flex gap-1">
      {types.map((t) => (
        <Badge key={t} style={{ backgroundColor: typeColors[t.toLowerCase()] }}>
          {t}
        </Badge>
      ))}
    </div>
  )

  return (
    <Dialog>
      <DialogTrigger
        nativeButton={false}
        render={
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle>
                {name} <br /> #{pokedex_number}
              </CardTitle>
              <CardDescription>{typeBadges}</CardDescription>
            </CardHeader>
            <CardContent className="flex size-60 items-center justify-center">
              {isLoading && <span>Loading...</span>}
              {error && <span>No image</span>}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={name}
                  className="max-h-full max-w-full object-contain"
                />
              )}
            </CardContent>
          </Card>
        }
      />
      <DialogContent showCloseButton={false}>
        <DialogHeader className="flex flex-row items-center justify-between">
          {name}
          <Link href={`/dashboard/pokedex/${name.toLowerCase()}`}>
            <Button variant={"outline"}>View Details</Button>
          </Link>
        </DialogHeader>
        <DialogTitle>{typeBadges}</DialogTitle>
        <DialogDescription className="flex items-center justify-center">
          {imageUrl && (
            <img src={imageUrl} alt={name} className="size-40 object-contain" />
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
