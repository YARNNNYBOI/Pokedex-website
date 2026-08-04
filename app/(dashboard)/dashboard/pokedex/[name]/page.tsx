// app/dashboard/pokedex/[name]/page.tsx (Server Component)
import pool from "@/lib/db"
import PokemonDetailClient from "./PokemonDetailClient"

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = await params

  const result = await pool.query(
    "SELECT * FROM pokemon WHERE LOWER(name) = LOWER($1)",
    [name]
  )
  const pokemon = result.rows[0]

  if (!pokemon) {
    return <p className="p-8">Pokemon not found.</p>
  }

  return <PokemonDetailClient pokemon={pokemon} />
}
