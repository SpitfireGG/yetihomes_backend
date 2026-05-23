"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Search, ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DeleteDialog from "../dialog/_common/delete"
import { useGetCompanyAchievementsData } from "@/hooks/useTankstack-query"
import TableSkeleton from "../common/table-skeleton"
import { AddCompanyAchievementsDialog } from "../dialog/company-achievements/add-achivements"
import { Badge } from "../ui/badge"
import { EditCompanyAchievementsDialog } from "../dialog/company-achievements/edit-achievements"
import Link from "next/link"


export default function CompanyAchivementsTable() {

    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("name-asc")
    const { data, isLoading } = useGetCompanyAchievementsData()

    const tripHighlights = data?.data || []

    const filteredCustomers = tripHighlights.filter((highlight) => {
        const matchesSearch =
            highlight.translations[0].title.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesSearch
    })

    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
        switch (sortBy) {
            case "name-asc":
                return a.translations[0].title.localeCompare(b.translations[0].title)
            case "name-desc":
                return b.translations[0].title.localeCompare(a.translations[0].title)
            default:
                return a.translations[0].title.localeCompare(b.translations[0].title)
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
                    <h1 className="text-2xl font-bold tracking-tight">Company Achivements List</h1>
                    <p className="text-muted-foreground">Manage your csi</p>
                </div>
                <AddCompanyAchievementsDialog />
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
                            <TableHead>description</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedCustomers.length > 0 ? (
                            paginatedCustomers.map((highlight, indx) => (
                                <TableRow key={highlight.id}>
                                    <TableCell>{String(indx + 1).padStart(2, '0')}</TableCell>
                                    <TableCell>
                                        {highlight.translations[0].title}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <span className="text-sm line-clamp-2">{highlight.translations[0].description}</span>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Badge className="text-sm">{highlight.year}</Badge>
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
                                                <DropdownMenuItem>
                                                    <Link href={`/company/achievements/content/${highlight.id}/`} className="flex w-full">
                                                        Add languages
                                                    </Link>
                                                </DropdownMenuItem>
                                                <EditCompanyAchievementsDialog

                                                    achievementId={highlight.id}
                                                    data={
                                                        {
                                                            year: highlight.year,
                                                            description: highlight.translations[0].description || '',
                                                            languageId: highlight.translations[0].language_id,
                                                            title: highlight.translations[0].title,
                                                            image: highlight.image_path || "",
                                                        }
                                                    }
                                                />
                                                <DeleteDialog id={highlight.id} apiUrl={`api/company/achievements`} />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No Teams found.
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