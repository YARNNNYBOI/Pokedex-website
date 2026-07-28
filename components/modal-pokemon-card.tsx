"use client"

import { getPokemon } from "@/lib/routes"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function ModalPokemonCard({name}: { name: string}) {
    const {data, isLoading, error}= useQuery({
    queryKey: ['speciesList', name],
    queryFn: () => getPokemon(name),
  });


return (
    <Card>
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
    );
}
