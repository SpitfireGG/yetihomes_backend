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
import { useGetCompanyContactInfo, useGetCompanyNewsLetters } from "@/hooks/useTankstack-query"
import { AddContactInfoDialog } from "../dialog/company-information/add-contact-info"
import { EditContactInfoDialog } from "../dialog/company-information/edit-contact-info"
import TableSkeleton from "../common/table-skeleton"
import { Badge } from "../ui/badge"


export default function NewsLetters() {

    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("name-asc")
    const { data, isLoading } = useGetCompanyNewsLetters()

    const tripHighlights = data?.data || []

    const filteredCustomers = tripHighlights.filter((highlight) => {
        const matchesSearch =
            highlight.name.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesSearch
    })

    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
        switch (sortBy) {
            case "name-asc":
                return a.name.localeCompare(b.name)
            case "name-desc":
                return b.name.localeCompare(a.name)
            default:
                return a.name.localeCompare(b.name)
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
                    <h1 className="text-2xl font-bold tracking-tight">Newsletters Information</h1>
                    <p className="text-muted-foreground">Manage your informations</p>
                </div>
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
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden md:table-cell">Email</TableHead>
                            <TableHead className="hidden md:table-cell">Phone</TableHead>
                            <TableHead className="hidden md:table-cell">Suscribed</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedCustomers.length > 0 ? (
                            paginatedCustomers.map((highlight, indx) => (
                                <TableRow key={highlight.id}>
                                    <TableCell>{String(indx + 1).padStart(2, '0')}</TableCell>
                                    <TableCell>
                                        {highlight.name}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <span className="text-sm">{highlight.email}</span>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <span className="text-sm">{highlight.country}</span>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Badge>{highlight.subscribed ? 'Yes' : "No"}</Badge>
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
                                                {/* <EditContactInfoDialog infoId={highlight.id} data={{
                                                    name: highlight.name,
                                                    address: highlight.email,
                                                    whatsapp: highlight.whatsapp,
                                                    phone: highlight.phone,
                                                    map: highlight.map,
                                                    email: highlight.email
                                                }} /> */}
                                                <DeleteDialog id={highlight.id} apiUrl={`api/newsletters`} />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No informations found.
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