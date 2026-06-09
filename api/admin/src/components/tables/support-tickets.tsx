'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Search, ArrowUpDown, Eye } from 'lucide-react';
import TableSkeleton from '../common/table-skeleton';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useSupportTickets } from '@/hooks/useTankstack-query';

const statusColors: Record<string, string> = {
  OPEN: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  IN_PROGRESS:
    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  RESOLVED:
    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  CLOSED: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
};

export default function SupportTicketsTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const { data, isLoading } = useSupportTickets();

  const tickets = data?.data || [];

  const filtered = tickets.filter((ticket: any) => {
    const q = searchQuery.toLowerCase();
    return (
      ticket.name?.toLowerCase().includes(q) ||
      ticket.email?.toLowerCase().includes(q) ||
      ticket.subject?.toLowerCase().includes(q) ||
      ticket.message?.toLowerCase().includes(q)
    );
  });

  const sorted = [...filtered].sort((a: any, b: any) => {
    switch (sortBy) {
      case 'newest':
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'oldest':
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case 'name-asc':
        return a.name?.localeCompare(b.name);
      case 'name-desc':
        return b.name?.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const ITEMS_PER_PAGE = 5;
  const [page, setPage] = useState<number>(1);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const paginated = sorted.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="space-y-6 p-4 border rounded-md mt-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground">
            Manage customer support tickets
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email or subject..."
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
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
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
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length > 0 ? (
              paginated.map((ticket: any, indx: number) => (
                <TableRow key={ticket.id}>
                  <TableCell className="text-muted-foreground text-xs">
                    {String(startIndex + indx + 1).padStart(2, '0')}
                  </TableCell>
                  <TableCell className="font-medium">{ticket.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {ticket.email}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {ticket.subject}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[ticket.status] || ''}>
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[525px]">
                        <DialogHeader>
                          <DialogTitle>{ticket.subject}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Name
                              </p>
                              <p className="font-medium">{ticket.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Email
                              </p>
                              <p className="font-medium">{ticket.email}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Status
                            </p>
                            <Badge
                              className={statusColors[ticket.status] || ''}
                            >
                              {ticket.status}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Message
                            </p>
                            <p className="mt-1 text-sm whitespace-pre-wrap rounded-md bg-muted/50 p-3">
                              {ticket.message}
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No support tickets found.
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
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={page === p}
                  onClick={() => setPage(p)}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
