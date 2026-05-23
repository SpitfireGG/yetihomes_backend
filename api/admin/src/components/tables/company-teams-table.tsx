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
import { useTeams } from "@/hooks/useTankstack-query"
import TableSkeleton from "../common/table-skeleton"
import { AddTeamDialog } from "../dialog/company-team/add-team"
import { Badge } from "../ui/badge"
import { EditTeamDialog } from "../dialog/company-team/edit-team"
import Image from "next/image"

const ITEMS_PER_PAGE = 10;

export default function CompanyTeamTable() {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortBy, setSortBy] = useState("name-asc")
    const { data, isLoading } = useTeams()

    const teams = data?.data || []

    const filteredTeams = teams.filter((team) => {
        const matchesSearch = 
            team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            team.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            team.email.toLowerCase().includes(searchQuery.toLowerCase())

        return matchesSearch
    })

    const sortedTeams = [...filteredTeams].sort((a, b) => {
        switch (sortBy) {
            case "name-asc":
                return a.name.localeCompare(b.name)
            case "name-desc":
                return b.name.localeCompare(a.name)
            case "role-asc":
                return a.role.localeCompare(b.role)
            case "role-desc":
                return b.role.localeCompare(a.role)
            default:
                return a.name.localeCompare(b.name)
        }
    })

    const [page, setPage] = useState<number>(1);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const paginatedTeams = sortedTeams.slice(startIndex, endIndex);
    const totalPages = Math.ceil(sortedTeams.length / ITEMS_PER_PAGE);

    if (isLoading) {
        return <TableSkeleton />
    }

    return (
        <div className="space-y-6 p-4 border rounded-md mt-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Team Members</h1>
                    <p className="text-muted-foreground">Manage your team members</p>
                </div>
                <AddTeamDialog />
            </div>

            <div className="grid md:grid-cols-3 flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, role, or email..."
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
                            <SelectItem value="role-asc">Role (A-Z)</SelectItem>
                            <SelectItem value="role-desc">Role (Z-A)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="w-12">#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Expertise</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedTeams.length > 0 ? (
                            paginatedTeams.map((team, index) => (
                                <TableRow key={team.id}>
                                    <TableCell className="font-medium">
                                        {String(startIndex + index + 1).padStart(2, '0')}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            {team.thumbnail ? (
                                                <Image 
                                                    src={team.thumbnail} 
                                                    alt={team.name}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs">
                                                    {team.name.charAt(0)}
                                                </div>
                                            )}
                                            <span className="font-medium">{team.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{team.role}</Badge>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {team.location || "-"}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {team.email}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {team.expertise?.slice(0, 2).map((exp, i) => (
                                                <Badge key={i} variant="outline" className="text-xs">
                                                    {exp}
                                                </Badge>
                                            ))}
                                            {team.expertise?.length > 2 && (
                                                <Badge variant="outline" className="text-xs">
                                                    +{team.expertise.length - 2}
                                                </Badge>
                                            )}
                                        </div>
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
                                                <EditTeamDialog
                                                    teamId={team.id}
                                                    data={team}
                                                />
                                                <DeleteDialog id={team.id} apiUrl="api/teams" />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No team members found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div className="mt-4">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious 
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                <PaginationItem key={p}>
                                    <PaginationLink 
                                        isActive={page === p} 
                                        onClick={() => setPage(p)}
                                        className="cursor-pointer"
                                    >
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            <PaginationItem>
                                <PaginationNext 
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    )
}