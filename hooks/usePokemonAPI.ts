import pool from "@/lib/db"
import { useQuery } from "@tanstack/react-query"
import { NextResponse } from "next/server"

export async function getPokemonList() {
  const pokemonList = useQuery({
    queryKey: ["pokemonList"],
    queryFn: () =>
      pool.query(
        "SELECT pokedex_number, name, type_primary, type_secondary FROM pokemon ORDER BY pokedex_number"
      ),
  })
  return pokemonList.data
}
