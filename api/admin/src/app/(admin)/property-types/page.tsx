'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Home, Building2, LandPlot } from 'lucide-react';
import { useProperties } from '@/hooks/useTankstack-query';
import TableSkeleton from '@/components/common/table-skeleton';

const propertyTypes = [
  {
    type: 'HOUSE',
    label: 'Houses',
    icon: Home,
    description: 'Residential houses, villas, bungalows',
  },
  {
    type: 'APARTMENT',
    label: 'Apartments',
    icon: Building2,
    description: 'Flats, penthouses, condos',
  },
  {
    type: 'LAND',
    label: 'Lands',
    icon: LandPlot,
    description: 'Residential & commercial plots',
  },
];

export default function PropertyTypesPage() {
  const { data, isLoading } = useProperties();
  const properties = data?.data || [];
  const [searchQuery, setSearchQuery] = useState('');

  const propertyCounts = useMemo(() => {
    const counts: Record<string, number> = { HOUSE: 0, APARTMENT: 0, LAND: 0 };
    properties.forEach((p: any) => {
      if (counts[p.propertyType] !== undefined) {
        counts[p.propertyType]++;
      }
    });
    return counts;
  }, [properties]);

  const filteredTypes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return propertyTypes;
    return propertyTypes.filter(
      (pt) =>
        pt.label.toLowerCase().includes(q) ||
        pt.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Property Types</h1>
        <p className="text-muted-foreground">Browse properties by type</p>
      </div>

      <div className="relative w-full sm:max-w-sm">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          strokeWidth={1.75}
        />
        <Input
          placeholder="Search property types..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-9 pl-9 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTypes.map((pt) => {
          const Icon = pt.icon;
          return (
            <Link key={pt.type} href={`/property-types/${pt.type.toLowerCase()}`}>
              <Card className="group cursor-pointer transition-all duration-200 hover:border-border hover:shadow-md">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
                    <Icon
                      className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium leading-tight">{pt.label}</h3>
                    <p className="text-sm text-muted-foreground">{pt.description}</p>
                    <p className="text-sm font-medium text-primary">
                      {propertyCounts[pt.type as keyof typeof propertyCounts]} properties
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}