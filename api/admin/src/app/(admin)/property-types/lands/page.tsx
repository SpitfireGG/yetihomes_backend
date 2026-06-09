'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus, MapPin, Edit, LandPlot } from 'lucide-react';
import { useProperties } from '@/hooks/useTankstack-query';
import TableSkeleton from '@/components/common/table-skeleton';
import { cn } from '@/lib/utils';
import { API_URL } from '@/utils/main';

const getImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_URL}${url}`;
};

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

function StatusBadge({ status }: { status: string }) {
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
}

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

function PropertyCard({ property }: { property: any }) {
  const primaryImage =
    property.images?.find((img: any) => img.isPrimary) || property.images?.[0];
  const imageUrl = primaryImage ? getImageUrl(primaryImage.url) : '';
  const [imageError, setImageError] = useState(false);

  const detailLine = property.landDetails
    ? `${property.landDetails.frontageFeet} ft frontage`
    : null;
  const location =
    property.locationText ||
    property.city ||
    property.district ||
    'Location not set';

  return (
    <Card className="group overflow-hidden border-border/60 transition-all duration-200 hover:border-border hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted/40">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted" />
        )}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <Badge className="border-0 bg-background/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground/80 backdrop-blur-md">
            land
          </Badge>
          <StatusBadge status={property.status} />
        </div>
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
              Price
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
        <div className="pt-1">
          <Link href={`/properties/edit?id=${property.id}`} className="block">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-full text-xs font-medium"
            >
              <Edit className="mr-1.5 h-3 w-3" strokeWidth={2} />
              Edit
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LandsPage() {
  const { data, isLoading } = useProperties();
  const properties = data?.data || [];
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return properties
      .filter((p: any) => p.propertyType === 'LAND')
      .filter((property: any) => {
        if (!q) return true;
        return (
          property.title?.toLowerCase().includes(q) ||
          property.city?.toLowerCase().includes(q) ||
          property.district?.toLowerCase().includes(q) ||
          property.locationText?.toLowerCase().includes(q)
        );
      });
  }, [properties, searchQuery]);

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.75}
          />
          <Input
            placeholder="Search lands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 pl-9 text-sm"
          />
        </div>
        <Link href="/properties/create">
          <Button size="sm" className="h-9 w-full sm:w-auto">
            <Plus className="mr-1.5 h-4 w-4" strokeWidth={2} />
            Add Land
          </Button>
        </Link>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/60 py-20 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted/60">
            <LandPlot
              className="h-5 w-5 text-muted-foreground"
              strokeWidth={1.5}
            />
          </div>
          <p className="text-sm font-medium">No lands found</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {searchQuery
              ? 'Try adjusting your search'
              : 'Add your first land property'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProperties.map((property: any) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

      {filteredProperties.length > 0 && (
        <p className="border-t border-border/60 pt-4 text-center text-xs text-muted-foreground tabular-nums">
          Showing {filteredProperties.length} of{' '}
          {properties.filter((p: any) => p.propertyType === 'LAND').length}{' '}
          lands
        </p>
      )}
    </div>
  );
}
