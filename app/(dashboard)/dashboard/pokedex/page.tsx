// "use client"

// import PokemonCard from "@/components/pokemon-card"
// import { getPokemonList, getPokemonSpeciesList } from "@/lib/routes"
// import { useQuery } from "@tanstack/react-query"
// import { CardLoading } from "@/components/card-loading"
// import { CardError } from "@/components/card-error"

// export default function Page() {
//   const pokemonList = useQuery({
//     queryKey: ["pokemonList"],
//     queryFn: () =>
//       // {throw new Error()}
//       getPokemonList(),
//   })

//   if (pokemonList.isLoading) return <CardLoading />
//   if (pokemonList.error) return <CardError />

//   return (
//     <div className="mx-2 grid grid-cols-4 gap-4">
//       {pokemonList.data.results.map((poke: any) => (
//         <PokemonCard key={poke.name} name={poke.name} />
//       ))}
//     </div>
//   )
// }

// app/pokemon/page.tsx (Server Component — no "use client", no useQuery)
import pool from "@/lib/db"
import PokemonCard from "@/components/pokemon-card"

export default async function PokemonPage() {
  const result = await pool.query(
    "SELECT pokedex_number, name, type_primary, type_secondary FROM pokemon ORDER BY pokedex_number"
  )
  const pokemonList = result.rows

  return (
    <div className="grid grid-cols-2 gap-4 p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
      {pokemonList.map((p) => (
        <PokemonCard
          key={p.pokedex_number}
          name={p.name}
          typePrimary={p.type_primary}
          typeSecondary={p.type_secondary}
          pokedex_number={p.pokedex_number}
        />
      ))}
    </div>
  )
}
