import axios from "axios"

export async function getPokemon(name: string) {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  return res.data
}

export async function getPokemonList() {
  const res = await axios.get("https://pokeapi.co/api/v2/pokemon")
  console.log(res.data)
  return res.data
}

export async function getPokemonSpecies(name: string) {
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`
  )
  return res.data
}

export async function getPokemonSpeciesList() {
  const res = await axios.get("https://pokeapi.co/api/v2/pokemon-species")
  return res.data
}
