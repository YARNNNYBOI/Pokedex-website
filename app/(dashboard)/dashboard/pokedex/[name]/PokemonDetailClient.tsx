// app/dashboard/pokedex/[name]/PokemonDetailClient.tsx (Client Component)
"use client"

import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { getPokemon } from "@/lib/routes"
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { typeColors } from "@/lib/pokemon-colors"
import { ArrowLeft } from "lucide-react"

type Pokemon = {
  pokedex_number: number
  name: string
  type_primary: string
  type_secondary: string | null
  description: string
  hp: number
  attack: number
  defense: number
  speed: number
  height_m: number
  weight_kg: number
}

export default function PokemonDetailClient({ pokemon }: { pokemon: Pokemon }) {
  const router = useRouter()

  const { data: apiData, isLoading: imageLoading } = useQuery({
    queryKey: ["pokemonImage", pokemon.name],
    queryFn: () => getPokemon(pokemon.name.toLowerCase()),
  })

  const imageUrl = apiData?.sprites?.other?.["official-artwork"]?.front_default
  const types = [pokemon.type_primary, pokemon.type_secondary].filter(
    Boolean
  ) as string[]

  return (
    <div className="flex">
      <div className="max-w-md flex-1">
        <button onClick={() => router.back()} className="mt-5 ml-5">
          <ArrowLeft />
        </button>
        <Card className="mx-5 my-5 max-w-md border-5 border-[var(--foreground)]">
          <CardContent className="flex items-center justify-center">
            {imageLoading && <span>Loading image...</span>}
            {imageUrl && <img src={imageUrl} alt={pokemon.name} />}
          </CardContent>
        </Card>
      </div>

      <div className="w-full flex-1 justify-end">
        <Card className="my-5 ml-5">
          <CardHeader className="text-5xl">{pokemon.name}</CardHeader>
          <CardDescription className="mx-5">
            {types.map((t) => (
              <Badge
                key={t}
                style={{ backgroundColor: typeColors[t.toLowerCase()] }}
              >
                {t}
              </Badge>
            ))}
          </CardDescription>
          <CardContent>
            <CardTitle className="mt-2 font-normal md:font-bold">
              Height
            </CardTitle>
            {pokemon.height_m}m
            <CardTitle className="mt-2 font-normal md:font-bold">
              Weight
            </CardTitle>
            {pokemon.weight_kg}kg
            <CardTitle className="mt-2 font-normal md:font-bold">
              Description
            </CardTitle>
            {pokemon.description}
            <CardTitle className="mt-10 font-normal md:font-bold">
              Base Stats
            </CardTitle>
            <ul>
              <li>hp: {pokemon.hp}</li>
              <li>attack: {pokemon.attack}</li>
              <li>defense: {pokemon.defense}</li>
              <li>speed: {pokemon.speed}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
