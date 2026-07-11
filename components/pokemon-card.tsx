"use client"

import { getPokemon } from "@/lib/routes"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function PokemonCard({name}: { name: string}) {
    const {data, isLoading, error}= useQuery({
    queryKey: ['speciesList', name],
    queryFn: () => getPokemon(name),
  });


  if (isLoading) return <Card><CardContent>Loading...</CardContent></Card>;
  if (error) return <Card><CardContent>Failed to load</CardContent></Card>;

  return (
    <Link href={`pokedex/${name}`}>
    <Card>
        <CardHeader>
          <CardTitle>{data.name}</CardTitle>
          <CardDescription>
            {data.types.map((t: any) => t.type.name).join(", ")}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <img
            src={data.sprites.other["official-artwork"].front_default}
            alt={data.name}
            className="flex size-40 items-center"
          />
        </CardContent>
      </Card>
    </Link>
  )
}
