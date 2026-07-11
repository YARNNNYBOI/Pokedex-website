"use client"

import PokemonCard from "@/components/pokemon-card"
import { getPokemonList, getPokemonSpeciesList} from "@/lib/routes"
import { useQuery } from "@tanstack/react-query"
import { CardLoading } from "@/components/card-loading"
import { CardError } from "@/components/card-error"

export default function Page() {
  const pokemonList = useQuery({
    queryKey: ['pokemonList'],
    queryFn: () => 
    // {throw new Error()}
      getPokemonList(),
  });

  if (pokemonList.isLoading) return <CardLoading/>;
  if (pokemonList.error) return <CardError/>;

  return (
    <div className="grid grid-cols-4 gap-4 mx-2">
      {pokemonList.data.results.map((poke: any) => (
        <PokemonCard key={poke.name} name={poke.name} />
      ))}
    </div>
  )
}
