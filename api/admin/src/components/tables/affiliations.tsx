"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Search, ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DeleteDialog from "../dialog/_common/delete"
import { useAffiliations } from "@/hooks/useTankstack-query"
import { AddAffiliationDialog } from "../dialog/affiliations/add-affiliation"
import { EditAffiliationDialog } from "../dialog/affiliations/edit-affiliation"
import TableSkeleton from "../common/table-skeleton"
import { getImageUrl } from "@/components/common/optimized-image";

export default function AffiliationsTable() {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("order-asc")
    const { data, isLoading } = useAffiliations()

    const affiliations = data?.data || []

    const filtered = affiliations.filter((a: any) => {
        const q = searchQuery.toLowerCase()
        return (
            a.name?.toLowerCase().includes(q) ||
            a.logoUrl?.toLowerCase().includes(q)
        )
    })

    const sorted = [...filtered].sort((a: any, b: any) => {
        switch (sortBy) {
            case "order-asc":
                return (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
            case "order-desc":
                return (b.displayOrder ?? 0) - (a.displayOrder ?? 0)
            case "name-asc":
                return a.name?.localeCompare(b.name)
            case "name-desc":
                return b.name?.localeCompare(a.name)
            default:
                return 0
        }
    })

    const ITEMS_PER_PAGE = 5;
    const [page, setPage] = useState<number>(1);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const paginated = sorted.slice(startIndex, endIndex);
    const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);

    if (isLoading) {
        return <TableSkeleton />
    }

    return (
        <div className="space-y-6 p-4 border rounded-md mt-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Affiliations</h1>
                    <p className="text-muted-foreground">Manage partner affiliations and logos</p>
                </div>
                <AddAffiliationDialog />
            </div>

            <div className="grid md:grid-cols-3 flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-2 md:col-start-4">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-45">
                            <div className="flex items-center gap-2">
                                <ArrowUpDown className="h-4 w-4" />
                                <SelectValue placeholder="Sort by" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="order-asc">Order (Low-High)</SelectItem>
                            <SelectItem value="order-desc">Order (High-Low)</SelectItem>
                            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="w-10">#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden md:table-cell">Logo URL</TableHead>
                            <TableHead>Order</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginated.length > 0 ? (
                            paginated.map((affiliation: any, indx: number) => (
                                <TableRow key={affiliation.id}>
                                    <TableCell className="text-muted-foreground text-xs">
                                        {String(startIndex + indx + 1).padStart(2, '0')}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            {affiliation.logoUrl && (
                                                <img
                                                    src={getImageUrl(affiliation.logoUrl)}
                                                    alt={affiliation.name || "Affiliation logo"}
                                                    className="h-8 w-8 rounded object-contain bg-muted"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = "none"
                                                    }}
                                                />
                                            )}
                                            <span>{affiliation.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm max-w-[200px] truncate">
                                        {affiliation.logoUrl}
                                    </TableCell>
                                    <TableCell>{affiliation.displayOrder}</TableCell>
                                    <TableCell>
                                        {affiliation.isActive ? (
                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                Active
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                                Inactive
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Actions</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <EditAffiliationDialog affiliationId={affiliation.id} data={affiliation} />
                                                <DeleteDialog id={affiliation.id} name={affiliation.name} apiUrl="api/affiliations" />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No affiliations found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-4">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem aria-disabled>
                            <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <PaginationItem key={p}>
                                <PaginationLink isActive={page === p} onClick={() => setPage(p)}>{p}</PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem >
                            <PaginationNext onClick={() => setPage(p => Math.min(totalPages, p + 1))} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}
