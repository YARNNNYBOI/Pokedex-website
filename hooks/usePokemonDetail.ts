import { useQuery } from "@tanstack/react-query";
import { getPokemon, getPokemonSpecies } from "@/lib/routes";

export function usePokemonDetail(name: string) {
  const pokemon = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => getPokemon(name),
    enabled: !!name,
  });

  const species = useQuery({
    queryKey: ["species", name],
    queryFn: () => getPokemonSpecies(name),
    enabled: !!name,
  });

  const description = species.data?.flavor_text_entries
    .find((entry: any) => entry.language.name === "en")
    ?.flavor_text.replace(/\f/g, " ");

  return {
    pokemon: pokemon.data,
    species: species.data,
    description,
    isLoading: pokemon.isLoading || species.isLoading,
    error: pokemon.error || species.error,
  };
}