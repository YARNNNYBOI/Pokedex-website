import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, PartyPopper } from "lucide-react";

export function CardError({ message = "Failed to load" }: { message?: string }) {
  return (
<Card className="flex flex-col justify-center items-center h-screen border-destructive/50 bg-destructive/5">
  <CardContent className="flex flex-col items-center gap-3 text-center">
    <PartyPopper className="size-10 text-destructive" />
    <p className="text-lg font-semibold text-destructive">Something went wrong</p>
    <p className="text-sm text-muted-foreground">{message}</p>
  </CardContent>
</Card>
  );
}