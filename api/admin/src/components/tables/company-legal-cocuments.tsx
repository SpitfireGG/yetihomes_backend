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
import { useCompanyGetGuide, useCompanyLegalDocuments } from "@/hooks/useTankstack-query"
import { AddTeamDialog } from "../dialog/company-team/add-team"
import { AddTrekGuideDialog } from "../dialog/company-guide/add-guide"
import TableSkeleton from "../common/table-skeleton"
import { EditTrekGuideDialog } from "../dialog/company-guide/edit-guide"
import { AddCompanyLegalDocsDialog } from "../dialog/company-legal-docs/add-company-docs"
import { PreviewImage } from "../common/image"
import { EditCompanyLegalDocDialog } from "../dialog/company-legal-docs/edit-company-docs"


export default function CompanyLegalDocumentsTable() {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("name-asc")
    const { data, isLoading } = useCompanyLegalDocuments()

    const tripHighlights = data?.data || []

    const filteredCustomers = tripHighlights.filter((highlight) => {
        const matchesSearch =
            highlight.title.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesSearch
    })

    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
        switch (sortBy) {
            case "name-asc":
                return a.title.localeCompare(b.title)
            case "name-desc":
                return b.title.localeCompare(a.title)
            default:
                return a.title.localeCompare(b.title)
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
                    <h1 className="text-2xl font-bold tracking-tight">Legal Documents</h1>
                    <p className="text-muted-foreground">Manage your teams</p>
                </div>
                <AddCompanyLegalDocsDialog />
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
                            <TableHead>title</TableHead>
                            <TableHead className="hidden md:table-cell">Image</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedCustomers.length > 0 ? (
                            paginatedCustomers.map((highlight, indx) => (
                                <TableRow key={highlight.id}>
                                    <TableCell>{String(indx + 1).padStart(2, '0')}</TableCell>
                                    <TableCell>
                                        {highlight.title}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {highlight.image_path && <PreviewImage url={highlight.image_path} />}
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
                                                <EditCompanyLegalDocDialog
                                                    guideId={highlight.id}
                                                    data={
                                                        {
                                                            title: highlight.title,
                                                            image: highlight.image_path
                                                        }
                                                    }
                                                />
                                                <DeleteDialog id={highlight.id} apiUrl={`api/company/legal-docs`} />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No Guides found.
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