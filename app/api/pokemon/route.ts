import pool from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  const result = await pool.query(
    "SELECT pokedex_number, name, type_primary, type_secondary FROM pokemon ORDER BY pokedex_number"
  )
  return NextResponse.json(result.rows)
}
