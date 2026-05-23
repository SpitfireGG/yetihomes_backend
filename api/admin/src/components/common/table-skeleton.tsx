import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ArrowUpDown } from "lucide-react"

export default function TableSkeleton() {
  return (
    <div className="space-y-6 p-4 border rounded-md mt-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64 mt-2" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
            <Skeleton className="h-10 w-45" />
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead><Skeleton className="h-4 w-8" /></TableHead>
              <TableHead><Skeleton className="h-4 w-8" /></TableHead>
              <TableHead><Skeleton className="h-4 w-8" /></TableHead>
              <TableHead className="text-right flex items-center justify-end w-full"><Skeleton className="h-4 w-8" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-8" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-8 w-8 ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-24" />
          {Array.from({ length: 2 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-10" />
          ))}
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  )
}
