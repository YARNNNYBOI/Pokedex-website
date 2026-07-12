import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Skeleton

 } from "../ui/skeleton";
export default function SkeletonPokedex() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <Skeleton className="h-32 w-full rounded-md" /> {/* image */}
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-2/3" />  {/* name */}
        <Skeleton className="h-4 w-1/3" />  {/* type/id */}
      </CardContent>
    </Card>
  )
}