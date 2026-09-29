import pool from "@/lib/db"
import PokemonCard from "@/components/pokemon-card"
import AddPokemonDialog from "@/components/modal/CreateModal"

export default async function PokemonPage() {
  const result = await pool.query(
    "SELECT pokedex_number, name, type_primary, type_secondary FROM pokemon ORDER BY pokedex_number"
  )
  const pokemonList = result.rows

  return (
    <div>
      <AddPokemonDialog />
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
    </div>
  )
}
