"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Search, Filter, ArrowUpDown, MoreHorizontal, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useGetContents } from "@/hooks/useTankstack-query"
import DeleteDialog from "../dialog/_common/delete"
import TableSkeleton from "../common/table-skeleton"
import { ContentStatus } from "@/@types/contents/contents"


const getHighlightBadge = (status: boolean) => {
    switch (status) {
        case true:
            return (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Yes</Badge>
            )
        case false:
            return (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">No</Badge>
            )
        default:
            return <Badge variant="outline">{status}</Badge>
    }
}

const getStatusBadge = (status: ContentStatus) => {
    switch (status) {
        case ContentStatus.PUBLISHED:
            return (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">PUBLISHED</Badge>
            )
        case ContentStatus.ARCHIVED:
            return (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">ARCHIVED</Badge>
            )
        case ContentStatus.DRAFT:
            return (
                <Badge variant="outline" className="bg-red-50 text-yellow-700 border-red-200">DRAFT</Badge>
            )
        default:
            return <Badge variant="outline">{status}</Badge>
    }
}

export default function ContentTable() {
    const { data, isLoading } = useGetContents();
    const trips = data?.data || []
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [sortBy, setSortBy] = useState("name-asc")

    const filteredTrips = trips.filter((trip) => {
        const matchesSearch =
            trip.slug?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false

        const matchesStatus = statusFilter === "all" || ((trip.highlight ? 'yes' : 'no') === statusFilter)
        return matchesSearch && matchesStatus
    })

    const sortedCustomers = [...filteredTrips].sort((a, b) => {
        switch (sortBy) {
            case "name-asc":
                return a.slug.localeCompare(b.slug)
            case "name-desc":
                return b.slug.localeCompare(a.slug)
            default:
                return a.slug.localeCompare(b.slug)
        }
    })

    const ITEMS_PER_PAGE = 5;
    const [page, setPage] = useState<number>(1);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const paginatedCustomers = sortedCustomers.slice(startIndex, endIndex);
    const totalPages = Math.ceil(sortedCustomers.length / ITEMS_PER_PAGE);

    if (isLoading) {
        return <TableSkeleton />
    }

    return (
        <div className="space-y-6 p-4 border rounded-md mt-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Content List</h1>
                    <p className="text-muted-foreground">Manage your content database</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Link href="/content/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Content
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by title..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                <SelectValue placeholder="Filter by status" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Highlight All Statuses</SelectItem>
                            <SelectItem value="yes">Active</SelectItem>
                            <SelectItem value="no">Inactive</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-45">
                            <div className="flex items-center gap-2">
                                <ArrowUpDown className="h-4 w-4" />
                                <SelectValue placeholder="Sort by" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
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
                            <TableHead>ID</TableHead>
                            <TableHead>title</TableHead>
                            <TableHead className="hidden md:table-cell">Slug</TableHead>
                            <TableHead className="hidden md:table-cell">Type</TableHead>
                            <TableHead className="hidden md:table-cell">Status</TableHead>
                            <TableHead>Highlight</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedCustomers.length > 0 ? (
                            paginatedCustomers.map((trip, indx) => (
                                <TableRow key={trip.id}>
                                    <TableCell>
                                        {(indx + 1).toString().padStart(2, '0')}
                                    </TableCell>
                                    <TableCell>
                                        {trip.translations[0].title}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {trip.slug}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell"><Badge variant={'outline'}>{trip.type}</Badge></TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {getStatusBadge(trip.status)}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{getHighlightBadge(trip.highlight)}</TableCell>
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
                                                <DropdownMenuItem>
                                                    <Link href={`/content/translation/${trip.id}/`} className="flex w-full">
                                                        Add Translations
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href={`/content/edit/${trip.id}/`} className="flex w-full">
                                                        Edit
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DeleteDialog id={trip.id} apiUrl="api/contents" />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No Content found.
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
                            <PaginationPrevious
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <PaginationItem key={p}>
                                <PaginationLink
                                    isActive={page === p}
                                    onClick={() => setPage(p)}
                                >
                                    {p}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem >
                            <PaginationNext
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            />
                        </PaginationItem>

                    </PaginationContent>
                </Pagination>

            </div>

        </div>
    )
}