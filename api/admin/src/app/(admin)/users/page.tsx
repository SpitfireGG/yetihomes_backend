"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { Search, Filter, ArrowUpDown, Mail, Calendar, MoreHorizontal, UserPlus } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useUsers } from "@/hooks/useTankstack-query";
import TableSkeleton from "@/components/common/table-skeleton"
import { CreateUserDialog } from "@/components/dialog/users/add-user"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"


const getRoleBadge = (role: string) => {
    switch (role) {
        case "ADMIN":
            return (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Admin
                </Badge>
            )
        case "USER":
            return (
                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    User
                </Badge>
            )
        default:
            return <Badge variant="outline">{role}</Badge>
    }
}

const getStatusBadge = (status: boolean) => {
    return status ? (
        <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
        >
            Verified
        </Badge>
    ) : (
        <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200"
        >
            Not Verified
        </Badge>
    );
};


export default function Page() {
    const { loading, isAdmin } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !isAdmin) {
            router.push("/")
        }
    }, [loading, isAdmin, router])

    const { data, isError, isLoading } = useUsers()
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [sortBy, setSortBy] = useState("name-asc")


    const users = data?.data || [];

    if (isLoading) {
        return <TableSkeleton />
    }

    if (isError) return <div>Error loading users.</div>;


    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.includes(searchQuery)

        const matchesStatus =
            statusFilter === "all" ||
            user.is_verified === (statusFilter === "true");

        return matchesSearch && matchesStatus
    })

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        switch (sortBy) {
            case "name-asc":
                return a.name.localeCompare(b.name)
            case "name-desc":
                return b.name.localeCompare(a.name)
            case "recent-first":
                if (a.created_at === "N/A") return 1
                if (b.created_at === "N/A") return -1
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            case "oldest-first":
                if (a.created_at === "N/A") return 1
                if (b.created_at === "N/A") return -1
                return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            default:
                return a.name.localeCompare(b.name)
        }
    })

    const ITEMS_PER_PAGE = 10;
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(sortedUsers.length / ITEMS_PER_PAGE);
    const paginatedUsers = sortedUsers.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE,
    );

    useEffect(() => {
      setPage(1);
    }, [searchQuery, statusFilter, sortBy]);

    return (
        <div className="space-y-6 p-4 border rounded-md mt-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Users List</h1>
                    <p className="text-muted-foreground">Manage your users database</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <CreateUserDialog />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by username or emails..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <div className="flex items-center gap-2">
                                <Filter className="h-4 w-4" />
                                <SelectValue placeholder="Filter by status" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="true">Verified</SelectItem>
                            <SelectItem value="false">Not Verified</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <div className="flex items-center gap-2">
                                <ArrowUpDown className="h-4 w-4" />
                                <SelectValue placeholder="Sort by" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                            <SelectItem value="recent-first">Recent Users</SelectItem>
                            <SelectItem value="oldest-first">Oldest Users</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden md:table-cell">Email</TableHead>
                            <TableHead className="hidden md:table-cell">Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Token Version</TableHead>
                            <TableHead className="hidden md:table-cell">Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedUsers.length > 0 ? (
                            paginatedUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={user.name.charAt(0)} alt={user.name} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">
                                                    <Link href={`/users/${user.id}`} className="hover:underline text-brand">
                                                        {user.name}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-3 w-3 text-muted-foreground" />
                                                <span className="text-sm">{user.email}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                                    <TableCell>{getStatusBadge(user.is_verified)}</TableCell>
                                    <TableCell>{user.token_version}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {user.created_at !== "N/A" ? (
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </div>
                                        ) : (
                                            "N/A"
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
                                                <DropdownMenuItem>
                                                    <Link href={`/users/${user.id}`} className="flex w-full">
                                                        Edit User
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href={`/users/${user.id}`} className="flex w-full">
                                                        View Details
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No users found.
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
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                      let pageNum: number;
                      if (totalPages <= 7) {
                        pageNum = i + 1;
                      } else if (page <= 4) {
                        pageNum = i + 1;
                      } else if (page >= totalPages - 3) {
                        pageNum = totalPages - 6 + i;
                      } else {
                        pageNum = page - 3 + i;
                      }
                      return (
                        <PaginationItem key={pageNum}>
                          <PaginationLink
                            isActive={page === pageNum}
                            onClick={() => setPage(pageNum)}
                            className="cursor-pointer"
                          >
                            {pageNum}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        className={page === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

        </div>
    )
}