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
import { useGetCompanySocialMedia } from "@/hooks/useTankstack-query"
import { AddSocialMediaDialog } from "../dialog/company-social-media/add-social-media"
import { EditSocialMediaDialog } from "../dialog/company-social-media/edit-social-media"
import TableSkeleton from "../common/table-skeleton"

type Props = {
    tripId: string
}

export default function SocialMediaTable() {

    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("name-asc")
    const { data, isLoading } = useGetCompanySocialMedia()

    const tripHighlights = data?.data || []

    const filteredCustomers = tripHighlights.filter((highlight) => {
        const matchesSearch =
            highlight.platform.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesSearch
    })

    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
        switch (sortBy) {
            case "name-asc":
                return a.platform.localeCompare(b.platform)
            case "name-desc":
                return b.platform.localeCompare(a.platform)
            default:
                return a.platform.localeCompare(b.platform)
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
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Social Media List</h1>
                    <p className="text-muted-foreground">Manage your teams</p>
                </div>
                <AddSocialMediaDialog />
            </div>

            <div className="grid md:grid-cols-3 flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by title...."
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
                            <TableHead>Order</TableHead>
                            <TableHead>Platform</TableHead>
                            <TableHead className="hidden md:table-cell">Url</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedCustomers.length > 0 ? (
                            paginatedCustomers.map((highlight, indx) => (
                                <TableRow key={highlight.id}>
                                    <TableCell>{String(indx + 1).padStart(2, '0')}</TableCell>
                                    <TableCell>
                                        {highlight.platform}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <a href={highlight.url} target="_blank" className="text-sm hover:underline">{highlight.url}</a>
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
                                                <EditSocialMediaDialog mediaId={highlight.id} data={{
                                                    platfrom: highlight.platform,
                                                    url: highlight.url
                                                }} />
                                                <DeleteDialog id={highlight.id} apiUrl={`api/company/contact-info/social-media`} />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No Media found.
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