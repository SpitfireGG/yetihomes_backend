'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Search, Plus, Edit, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';
import TableSkeleton from '@/components/common/table-skeleton';
import { CRUD } from '@/api/crud';
import { useBlogs } from '@/hooks/useTankstack-query';
import { OptimizedImage } from '@/components/common/optimized-image';

const blogCrud = new CRUD('api/blogs');

function FeaturedBadge({ isFeatured }: { isFeatured: boolean }) {
  if (!isFeatured) return null;
  return (
    <Badge
      variant="outline"
      className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900"
    >
      <Star className="mr-1 h-3 w-3" />
      Featured
    </Badge>
  );
}

function BlogCard({
  blog,
  onAction,
}: {
  blog: any;
  onAction: () => void;
}) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await blogCrud.delete(blog.id);
      setShowDeleteDialog(false);
      toast.success('Blog article deleted');
      onAction();
    } catch {
      toast.error('Failed to delete blog article');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
      <div className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
        {blog.coverImage ? (
          <OptimizedImage
            src={blog.coverImage}
            alt={blog.title}
            width={80}
            height={64}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-xs text-muted-foreground">No image</span>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium truncate">{blog.title}</h3>
          {blog.isFeatured && <FeaturedBadge isFeatured={blog.isFeatured} />}
        </div>
        <p className="text-sm text-muted-foreground truncate">{blog.excerpt}</p>
        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
          <span className="capitalize">{blog.category}</span>
          <span>·</span>
          <span>{blog.author}</span>
          <span>·</span>
          <span>{blog.readTime}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/blogs/edit/${blog.id}`}>
            <Edit className="mr-1.5 h-3 w-3" />
            Edit
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => setShowDeleteDialog(true)}
        >
          <Trash2 className="mr-1.5 h-3 w-3" />
          Delete
        </Button>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this blog article?</DialogTitle>
            <DialogDescription>
              <span className="font-medium text-foreground">{blog.title}</span>{' '}
              will be permanently deleted. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting\u2026' : 'Delete article'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const ITEMS_PER_PAGE = 12;

export default function BlogsPage() {
  const { data, isLoading, isError, refetch } = useBlogs();
  const blogs = data?.data || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(1);

  const categories = useMemo(() => {
    const cats = new Set(blogs.map((b: any) => b.category).filter(Boolean));
    return Array.from(cats) as string[];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return blogs.filter((blog: any) => {
      const matchesSearch =
        !q ||
        blog.title?.toLowerCase().includes(q) ||
        blog.excerpt?.toLowerCase().includes(q) ||
        blog.author?.toLowerCase().includes(q);
      const matchesCategory =
        categoryFilter === 'all' || blog.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchQuery, categoryFilter]);

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handleAction = () => {
    refetch();
  };

  if (isLoading) return <TableSkeleton />;

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-red-500">Failed to load blogs</p>
        <Button onClick={() => refetch()} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Blog Articles</h1>
          <p className="text-muted-foreground">Manage your blog content</p>
        </div>
        <Link href="/blogs/create">
          <Button size="sm" className="h-9 w-full sm:w-auto">
            <Plus className="mr-1.5 h-4 w-4" strokeWidth={2} />
            Add Article
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.75}
          />
          <Input
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="h-9 pl-9 text-sm"
          />
        </div>
        {categories.length > 0 && (
          <Select
            value={categoryFilter}
            onValueChange={(v) => {
              setCategoryFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 py-20 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted/60">
            <span className="text-2xl">📝</span>
          </div>
          <p className="text-sm font-medium">No blog articles found</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {searchQuery
              ? 'Try adjusting your search or filters'
              : 'Start by adding your first blog article'}
          </p>
          {!searchQuery && (
            <Link href="/blogs/create">
              <Button className="mt-4">Add Article</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {paginatedBlogs.map((blog: any) => (
            <BlogCard key={blog.id} blog={blog} onAction={handleAction} />
          ))}
        </div>
      )}

      {filteredBlogs.length > 0 && (
        <div className="flex flex-col items-center gap-3 border-t border-border/60 pt-4">
          <p className="text-center text-xs text-muted-foreground tabular-nums">
            Showing {paginatedBlogs.length} of {filteredBlogs.length} articles
          </p>
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={
                      page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                    }
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
                    className={
                      page === totalPages
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      )}
    </div>
  );
}
