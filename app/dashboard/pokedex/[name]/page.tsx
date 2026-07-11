"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { usePokemonDetail } from "@/hooks/usePokemonDetail";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { typeColors } from "@/lib/pokemon-colors";
import { speciesColors } from "@/lib/pokemon-special-colors"
import { CardLoading } from "@/components/card-loading";
import { CardError } from "@/components/card-error";
import { ArrowLeft } from "lucide-react";


export default function PokemonPage() {
  const { name } = useParams<{ name: string }>();
  const { pokemon, species, description, isLoading, error } = usePokemonDetail(name);
  const colorName = species?.color.name;
  const router = useRouter();

  if (isLoading) return <CardLoading/>;
  if (error) return <CardError/>

  return (
    <>
    <div className="flex">
      <div className="max-w-md flex-1">
          <button onClick={() => router.back()} className="ml-5 mt-5">
            <ArrowLeft/>
          </button>
        <Card style={{backgroundColor: speciesColors[colorName]}} className="mx-5 my-5 max-w-md border-5 border-[var(--foreground)]">
          <CardContent className="flex">
            <img
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt={pokemon?.name}
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 justify-end w-full">
        <Card className="ml-5 my-5">
          <CardHeader className="text-5xl">
            {pokemon?.name}
          </CardHeader>
          <CardDescription className="mx-5">
            {pokemon?.types.map((t: any) => (
              <Badge key={t.type.name} style={{backgroundColor: typeColors[t.type.name]}}>
                {t.type.name}
              </Badge>
            ))}
          </CardDescription>
          <CardContent>
            <CardTitle className="font-normal md:font-bold mt-2">Height</CardTitle>
            {pokemon?.height}
            <CardTitle className="font-normal md:font-bold mt-2">Weight</CardTitle>
            {pokemon?.weight}
            <CardTitle className="font-normal md:font-bold mt-2">Description</CardTitle>
            {description}
            <CardTitle className="font-normal md:font-bold mt-10">Base Stats</CardTitle>
            <ul>
              {pokemon?.stats.map((s: any) => (
                <li key={s.stat.name}>{s.stat.name}: {s.base_stat}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  );
}