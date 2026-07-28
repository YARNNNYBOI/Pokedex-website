"use client"

import { getPokemon } from "@/lib/routes"
import { useQuery } from "@tanstack/react-query"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import { Button } from "./ui/button"

export default function PokemonCard({ name }: { name: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['speciesList', name],
    queryFn: () => getPokemon(name),
  });

  if (isLoading) return <Card><CardContent></CardContent></Card>;
  if (error) return <Card><CardContent></CardContent></Card>;

  return (
    <Dialog>
      <DialogTrigger
        nativeButton={false}
        render={
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
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
        }
      />
      <DialogContent showCloseButton={false}>
        <DialogHeader className="flex flex-row items-center justify-between">{data.name}
          <Link href={`/dashboard/pokedex/${name}`}>
            <Button variant={"outline"}>View Details</Button>
          </Link>
        </DialogHeader>
        <DialogTitle>
          {data.types.map((t: any) => t.type.name).join(", ")}
        </DialogTitle>
        <DialogDescription className="flex justify-center items-center">
          <img
            src={data.sprites.other["official-artwork"].front_default}
            alt={data.name}
            className="flex size-40 items-center"
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>

  )
}