'use client';

import { useState, useMemo, memo, useEffect } from 'react';
import Link from 'next/link';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import {
  Search,
  Plus,
  Building,
  MapPin,
  Home,
  Building2,
  LandPlot,
  Edit,
  Trash2,
  CheckCircle,
  Eye,
} from 'lucide-react';
import { useProperties } from '@/hooks/useTankstack-query';
import { toast } from 'sonner';
import { CRUD } from '@/api/crud';
import TableSkeleton from '@/components/common/table-skeleton';
import { cn } from '@/lib/utils';
import { API_URL, API_KEY } from '@/utils/main';
import { getImageUrl } from '@/components/common/optimized-image';

const propertyCrud = new CRUD('api/properties');

async function getPropertyViewStats(propertyType: string, propertyId: string) {
  try {
    const res = await fetch(
      `${API_URL}/api/analytics/views/${propertyType}/${propertyId}`,
      {
        headers: { 'x-api-key': API_KEY },
      },
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

const statusStyles: Record<string, string> = {
  DRAFT: 'bg-muted text-muted-foreground border-transparent',
  PUBLISHED:
    'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900',
  SOLD: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900',
  RENTED:
    'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900',
  ARCHIVED:
    'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900',
};

const StatusBadge = memo(function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'text-[10px] font-medium uppercase tracking-wider px-2 py-0.5',
        statusStyles[status] ?? statusStyles.DRAFT,
      )}
    >
      {status.toLowerCase()}
    </Badge>
  );
});

function formatPrice(
  amount: string | number,
  currency: string,
  period: string,
) {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (Number.isNaN(num)) return `${currency} —`;
  const formatted = num.toLocaleString();
  const suffix =
    period === 'MONTHLY' ? '/mo' : period === 'YEARLY' ? '/yr' : '';
  return `${currency} ${formatted}${suffix}`;
}

const PropertyCard = memo(function PropertyCard({
  property,
  onAction,
}: {
  property: any;
  onAction: () => void;
}) {
  const primaryImage =
    property.images?.find((img: any) => img.isPrimary) || property.images?.[0];
  const imageUrl = primaryImage ? getImageUrl(primaryImage.url) : '';
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    getPropertyViewStats(property.propertyType, property.id).then((data) => {
      if (controller.signal.aborted) return;
      if (data?.data?.totalViews !== undefined) {
        setViewCount(data.data.totalViews);
      } else if (data?.totalViews !== undefined) {
        setViewCount(data.totalViews);
      }
    });
    return () => controller.abort();
  }, [property.propertyType, property.id]);

  const handleArchive = async () => {
    setIsArchiving(true);
    try {
      await propertyCrud.delete(property.id);
      setShowArchiveDialog(false);
      toast.success('Property archived');
      onAction();
    } catch {
      toast.error('Failed to archive property');
    } finally {
      setIsArchiving(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await propertyCrud.publish(property.id);
      toast.success('Property published');
      onAction();
    } catch {
      toast.error('Failed to publish property');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await propertyCrud.hardDelete(property.id);
      setShowDeleteDialog(false);
      toast.success('Property deleted permanently');
      onAction();
    } catch {
      toast.error('Failed to delete property');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleMarkSold = async () => {
    try {
      await propertyCrud.markAsSold(property.id);
      toast.success('Marked as sold');
      onAction();
    } catch {
      toast.error('Failed to mark as sold');
    }
  };

  const handleMarkRented = async () => {
    try {
      await propertyCrud.markAsRented(property.id);
      toast.success('Marked as rented');
      onAction();
    } catch {
      toast.error('Failed to mark as rented');
    }
  };

  const detailLine = (() => {
    if (property.propertyType === 'HOUSE' && property.houseDetails) {
      return `${property.houseDetails.bedrooms ?? 0} bed · ${property.houseDetails.bathrooms ?? 0} bath`;
    }
    if (property.propertyType === 'APARTMENT' && property.apartmentDetails) {
      return `${property.apartmentDetails.bedrooms ?? 0} bed · ${property.apartmentDetails.bathrooms ?? 0} bath`;
    }
    if (property.propertyType === 'LAND' && property.landDetails) {
      return `${property.landDetails.frontageFeet ?? 0} ft frontage`;
    }
    return null;
  })();

  const location =
    property.locationText ||
    property.city ||
    property.district ||
    'Location not set';

  return (
    <Card className="overflow-hidden border-border/60">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted/40">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={property.title}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted" />
        )}

        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <Badge className="border-0 bg-background/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground/80 backdrop-blur-md">
            {property.propertyType.toLowerCase()}
          </Badge>
          <StatusBadge status={property.status} />
        </div>
        {viewCount !== null && (
          <div className="absolute inset-x-3 bottom-3 flex items-center justify-end">
            <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-md">
              <Eye className="h-3 w-3" strokeWidth={2} />
              {viewCount.toLocaleString()}
            </div>
          </div>
        )}
      </div>

      <CardContent className="space-y-3 p-4">
        <div className="space-y-1.5">
          <h3 className="line-clamp-1 text-sm font-medium leading-tight tracking-tight">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 flex-shrink-0" strokeWidth={1.75} />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        <div className="flex items-end justify-between gap-2 border-t border-border/50 pt-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {property.listingType === 'RENT' ? 'Rent' : 'Price'}
            </p>
            <p className="truncate text-sm font-medium tabular-nums">
              {formatPrice(
                property.priceAmount,
                property.currency,
                property.pricePeriod,
              )}
            </p>
          </div>
          {detailLine && (
            <p className="whitespace-nowrap text-xs text-muted-foreground tabular-nums">
              {detailLine}
            </p>
          )}
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="flex gap-1.5">
            <Link
              href={`/properties/edit?id=${property.id}`}
              className="flex-1"
            >
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-full text-xs font-medium"
              >
                <Edit className="mr-1.5 h-3 w-3" strokeWidth={2} />
                Edit
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2.5 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/50 dark:hover:bg-red-950/40"
              onClick={() => setShowDeleteDialog(true)}
              title="Permanently Delete"
            >
              <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
            </Button>
          </div>

          {property.status === 'PUBLISHED' && (
            <div className="flex gap-1.5">
              {property.listingType === 'SALE' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 flex-1 text-[11px] font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-blue-950/40"
                  onClick={handleMarkSold}
                >
                  <CheckCircle className="mr-1 h-3 w-3" strokeWidth={2} />
                  Mark sold
                </Button>
              )}
              {property.listingType === 'RENT' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 flex-1 text-[11px] font-medium text-purple-600 hover:bg-purple-50 hover:text-purple-700 dark:text-purple-400 dark:hover:bg-purple-950/40"
                  onClick={handleMarkRented}
                >
                  <CheckCircle className="mr-1 h-3 w-3" strokeWidth={2} />
                  Mark rented
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="h-7 flex-1 text-[11px] font-medium text-muted-foreground hover:bg-orange-50 hover:text-orange-600 dark:hover:bg-orange-950/40 dark:hover:text-orange-400"
                onClick={() => setShowArchiveDialog(true)}
              >
                <Trash2 className="mr-1 h-3 w-3" strokeWidth={2} />
                Archive
              </Button>
            </div>
          )}

          {property.status !== 'PUBLISHED' && (
            <div className="flex gap-1.5">
              <Button
                variant="outline"
                size="sm"
                className="h-8 flex-1 text-[11px] font-medium text-green-600 hover:bg-green-50 hover:text-green-700 dark:border-green-900/50 dark:hover:bg-green-950/40"
                onClick={handlePublish}
                disabled={isPublishing}
              >
                <CheckCircle className="mr-1.5 h-3 w-3" strokeWidth={2} />
                {isPublishing ? 'Publishing...' : 'Publish'}
              </Button>
            </div>
          )}
        </div>
      </CardContent>

      <Dialog open={showArchiveDialog} onOpenChange={setShowArchiveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive this property?</DialogTitle>
            <DialogDescription>
              <span className="font-medium text-foreground">
                {property.title}
              </span>{' '}
              will be hidden from public listings. You can restore it later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowArchiveDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleArchive}
              disabled={isArchiving}
            >
              {isArchiving ? 'Archiving…' : 'Archive property'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Permanently delete this property?</DialogTitle>
            <DialogDescription>
              <span className="font-medium text-foreground">
                {property.title}
              </span>{' '}
              will be permanently deleted along with all its images and details.
              This action cannot be undone.
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
              {isDeleting ? 'Deleting…' : 'Delete permanently'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
});

const PropertySection = memo(function PropertySection({
  title,
  icon: Icon,
  properties,
  onAction,
}: {
  title: string;
  icon: any;
  properties: any[];
  onAction: () => void;
}) {
  if (properties.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-2.5">
        <div className="flex items-center gap-2.5">
          <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
          <h2 className="text-base font-medium tracking-tight">{title}</h2>
        </div>
        <span className="text-xs tabular-nums text-muted-foreground">
          {properties.length}{' '}
          {properties.length === 1 ? 'property' : 'properties'}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onAction={onAction}
          />
        ))}
      </div>
    </section>
  );
});

const ITEMS_PER_PAGE = 24;

export default function PropertiesPage() {
  const { data, isLoading, refetch } = useProperties();
  const queryClient = useQueryClient();
  const properties = data?.data || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [page, setPage] = useState(1);

  const filteredProperties = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return properties.filter((property: any) => {
      const matchesSearch =
        !q ||
        property.title?.toLowerCase().includes(q) ||
        property.city?.toLowerCase().includes(q) ||
        property.district?.toLowerCase().includes(q) ||
        property.locationText?.toLowerCase().includes(q);
      const matchesTab =
        activeTab === 'all' || property.propertyType === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [properties, searchQuery, activeTab]);

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = filteredProperties.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setPage(1);
  }, [searchQuery, activeTab]);

  const houses = filteredProperties.filter(
    (p: any) => p.propertyType === 'HOUSE',
  );
  const apartments = filteredProperties.filter(
    (p: any) => p.propertyType === 'APARTMENT',
  );
  const lands = filteredProperties.filter(
    (p: any) => p.propertyType === 'LAND',
  );

  const handleAction = () => {
    refetch();
    queryClient.invalidateQueries({ queryKey: ['dashboard', ''] });
  };

  if (isLoading) return <TableSkeleton />;

  const counts = {
    all: properties.length,
    HOUSE: properties.filter((p: any) => p.propertyType === 'HOUSE').length,
    APARTMENT: properties.filter((p: any) => p.propertyType === 'APARTMENT')
      .length,
    LAND: properties.filter((p: any) => p.propertyType === 'LAND').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.75}
          />
          <Input
            placeholder="Search by title or location\u2026"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 pl-9 text-sm"
          />
        </div>
        <Link href="/properties/create">
          <Button size="sm" className="h-9 w-full sm:w-auto">
            <Plus className="mr-1.5 h-4 w-4" strokeWidth={2} />
            Add property
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="h-9 bg-muted/50 p-1">
          <TabsTrigger
            value="all"
            className="h-7 px-3 text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            All
            <span className="ml-1.5 text-[10px] tabular-nums text-muted-foreground data-[state=active]:text-foreground">
              {counts.all}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="HOUSE"
            className="h-7 px-3 text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Home className="mr-1.5 h-3 w-3" strokeWidth={1.75} />
            Houses
            <span className="ml-1.5 text-[10px] tabular-nums text-muted-foreground">
              {counts.HOUSE}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="APARTMENT"
            className="h-7 px-3 text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Building2 className="mr-1.5 h-3 w-3" strokeWidth={1.75} />
            Apartments
            <span className="ml-1.5 text-[10px] tabular-nums text-muted-foreground">
              {counts.APARTMENT}
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="LAND"
            className="h-7 px-3 text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <LandPlot className="mr-1.5 h-3 w-3" strokeWidth={1.75} />
            Land
            <span className="ml-1.5 text-[10px] tabular-nums text-muted-foreground">
              {counts.LAND}
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {(searchQuery || activeTab !== 'all') &&
      filteredProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 py-20 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted/60">
            <Building
              className="h-5 w-5 text-muted-foreground"
              strokeWidth={1.5}
            />
          </div>
          <p className="text-sm font-medium">No properties found</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      ) : !searchQuery && activeTab === 'all' ? (
        <div className="space-y-10">
          <PropertySection
            title="Houses"
            icon={Home}
            properties={houses}
            onAction={handleAction}
          />
          <PropertySection
            title="Apartments"
            icon={Building2}
            properties={apartments}
            onAction={handleAction}
          />
          <PropertySection
            title="Land & plots"
            icon={LandPlot}
            properties={lands}
            onAction={handleAction}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedProperties.map((property) => (
            <div key={property.id} style={{ contain: 'content' }}>
              <PropertyCard property={property} onAction={handleAction} />
            </div>
          ))}
        </div>
      )}

      {filteredProperties.length > 0 && (
        <div className="flex flex-col items-center gap-3 border-t border-border/60 pt-4">
          <p className="text-center text-xs text-muted-foreground tabular-nums">
            Showing {paginatedProperties.length} of {filteredProperties.length}{' '}
            {filteredProperties.length === 1 ? 'property' : 'properties'}
            {searchQuery || activeTab !== 'all'
              ? ` (filtered from ${properties.length})`
              : ''}
          </p>
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={
                      page === 1
                        ? 'pointer-events-none opacity-50'
                        : 'cursor-pointer'
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
