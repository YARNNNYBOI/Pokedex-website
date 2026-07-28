import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function MyTeamPage(){
    return (
    <Table>
        <TableCaption>Your Teams
            <br/>
            <Link href="/create-team">
                <Button variant={"default"}>Create a Team</Button>
            </Link>
        </TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>sfdsofmd</TableHead>
                <TableHead>sdfdsf</TableHead>
                <TableHead className="text-right">Amount</TableHead>
            </TableRow>
        </TableHeader>
    </Table>
    );
}