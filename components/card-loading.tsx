import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function CardLoading() {
  return (
    <Card className="flex justify-center items-center h-screen">
      <CardContent>
        <Loader2 className="animate-spin h-50 w-50" />
      </CardContent>
    </Card>
  );
}