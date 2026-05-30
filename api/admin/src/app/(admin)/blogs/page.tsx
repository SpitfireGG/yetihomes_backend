'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
} from 'lucide-react';
import { toast } from 'sonner';
import TableSkeleton from '@/components/common/table-skeleton';
import { CRUD } from '@/api/crud';
import { OptimizedImage } from '@/components/common/optimized-image';

const blogCrud = new CRUD('api/blogs');

const statusStyles: Record<string, string> = {
  DRAFT: 'bg-muted text-muted-foreground border-transparent',
  PUBLISHED:
    'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900',
};

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
  const [imageError, setImageError] = useState(false);

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
          <span>•</span>
          <span>{blog.author}</span>
          <span>•</span>
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
              {isDeleting ? 'Deleting…' : 'Delete article'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function BlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const result = await blogCrud.getData();
      setBlogs(result.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch blogs');
    } finally {
      setIsLoading(false);
    }
  };

  useState(() => {
    fetchBlogs();
  });

  const categories = useMemo(() => {
    const cats = new Set(blogs.map((b) => b.category).filter(Boolean));
    return Array.from(cats);
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return blogs.filter((blog) => {
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

  const handleAction = () => {
    fetchBlogs();
  };

  if (isLoading) return <TableSkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-red-500">{error}</p>
        <Button onClick={fetchBlogs} className="mt-4">
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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 pl-9 text-sm"
          />
        </div>
        {categories.length > 0 && (
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
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
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onAction={handleAction} />
          ))}
        </div>
      )}

      {filteredBlogs.length > 0 && (
        <p className="border-t border-border/60 pt-4 text-center text-xs text-muted-foreground tabular-nums">
          Showing {filteredBlogs.length} of {blogs.length} articles
        </p>
      )}
    </div>
  );
}