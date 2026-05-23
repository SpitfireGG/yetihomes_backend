'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Sparkles, Search, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import TableSkeleton from '@/components/common/table-skeleton';
import { CRUD } from '@/api/crud';

const amenitiesCrud = new CRUD('api/amenities');

export default function AmenitiesPage() {
  const [amenities, setAmenities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAmenities = async () => {
    try {
      setIsLoading(true);
      const result = await amenitiesCrud.getData();
      setAmenities(result.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch amenities');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  const filteredAmenities = amenities.filter((a) =>
    a.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteDialog.id) return;
    setIsDeleting(true);
    try {
      await amenitiesCrud.delete(deleteDialog.id);
      setDeleteDialog({ open: false, id: null });
      toast.success('Amenity deleted');
      fetchAmenities();
    } catch {
      toast.error('Failed to delete amenity');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) return <TableSkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-red-500">{error}</p>
        <Button onClick={fetchAmenities} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Amenities</h1>
          <p className="text-muted-foreground">Manage property amenities</p>
        </div>
        <Link href="/amenities/create">
          <Button size="sm" className="h-9 w-full sm:w-auto">
            <Plus className="mr-1.5 h-4 w-4" strokeWidth={2} />
            Add Amenity
          </Button>
        </Link>
      </div>

      <div className="relative w-full sm:max-w-sm">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          strokeWidth={1.75}
        />
        <Input
          placeholder="Search amenities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-9 pl-9 text-sm"
        />
      </div>

      {filteredAmenities.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 py-20 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted/60">
            <Sparkles className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-medium">No amenities found</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {searchQuery ? 'Try adjusting your search' : 'Add your first amenity'}
          </p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Icon</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAmenities.map((amenity) => (
                <TableRow key={amenity.id}>
                  <TableCell className="font-medium">{amenity.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {amenity.icon ? (
                      <span className="text-muted-foreground">{amenity.icon}</span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setDeleteDialog({ open: true, id: amenity.id })}
                    >
                      <Trash2 className="mr-1.5 h-3 w-3" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, id: null })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this amenity?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the amenity.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({ open: false, id: null })}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}