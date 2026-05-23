'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search } from 'lucide-react';
import { usePropertyEnquiries } from '@/hooks/useTankstack-query';
import TableSkeleton from '@/components/common/table-skeleton';

const getStatusBadge = (status: string) => {
  const variants: Record<string, string> = {
    NEW: 'bg-blue-100 text-blue-800',
    CONTACTED: 'bg-yellow-100 text-yellow-800',
    CLOSED: 'bg-green-100 text-green-800',
    SPAM: 'bg-red-100 text-red-800',
  };
  return (
    <Badge variant="outline" className={variants[status] || 'bg-gray-100'}>
      {status}
    </Badge>
  );
};

export default function PropertyEnquiriesPage() {
  const { data, isLoading } = usePropertyEnquiries();
  const enquiries = data?.data || [];
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEnquiries = enquiries
    .filter((e) => e.type === 'PROPERTY')
    .filter((enquiry) => {
      const matchesSearch =
        enquiry.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enquiry.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        enquiry.phone?.includes(searchQuery);
      return matchesSearch;
    });

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Property Requests</h1>
          <p className="text-muted-foreground">Enquiries about properties</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search enquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEnquiries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No property enquiries found.
                </TableCell>
              </TableRow>
            ) : (
              filteredEnquiries.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell className="font-medium">{enquiry.fullName}</TableCell>
                  <TableCell>{enquiry.email || '-'}</TableCell>
                  <TableCell>{enquiry.phone || '-'}</TableCell>
                  <TableCell className="max-w-xs truncate">{enquiry.message}</TableCell>
                  <TableCell>{getStatusBadge(enquiry.status)}</TableCell>
                  <TableCell className="text-right">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}