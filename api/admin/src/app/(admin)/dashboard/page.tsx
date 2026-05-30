'use client';

import { useMemo, useState, Suspense } from 'react';
import Link from 'next/link';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Building,
  Mail,
  CheckCircle2,
  Coins,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useDashboard } from '@/hooks/useTankstack-query';
import { cn } from '@/lib/utils';
import { API_URL } from '@/utils/main';
import { getImageUrl } from '@/components/common/optimized-image';
import DashboardSkeleton from './skeleton';

type Range = '7d' | '30d' | '90d' | '1y';

const formatNPR = (n: number) => {
  if (n >= 1e7) return `₨ ${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₨ ${(n / 1e5).toFixed(2)} L`;
  return `₨ ${n.toLocaleString()}`;
};

const formatNumber = (n: number) => n.toLocaleString();

const PIPELINE_COLORS: Record<string, string> = {
  DRAFT: '#cbd5e1',
  PUBLISHED: '#10b981',
  SOLD: '#2563eb',
  RENTED: '#7c3aed',
  ARCHIVED: '#f59e0b',
};

const TYPE_COLORS = ['hsl(160 73% 37%)', 'hsl(243 60% 67%)', 'hsl(37 88% 55%)'];

const initialsFor = (name: string) =>
  name
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

function MetricCard({
  icon: Icon,
  label,
  value,
  delta,
  hint,
}: {
  icon: any;
  label: string;
  value: string;
  delta: number;
  hint: string;
}) {
  const positive = delta >= 0;
  return (
    <Card className="border-border/60">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-muted/60">
            <Icon
              className="h-3.5 w-3.5 text-muted-foreground"
              strokeWidth={1.75}
            />
          </span>
          <span
            className={cn(
              'inline-flex items-center gap-0.5 text-[10px] font-medium tabular-nums',
              positive
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-red-600 dark:text-red-400',
            )}
          >
            {positive ? (
              <TrendingUp className="h-3 w-3" strokeWidth={2} />
            ) : (
              <TrendingDown className="h-3 w-3" strokeWidth={2} />
            )}
            {Math.abs(delta).toFixed(1)}%
          </span>
        </div>
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
          {label}
        </p>
        <p className="text-2xl font-medium tabular-nums leading-none">
          {value}
        </p>
        <p className="mt-2 text-[10px] text-muted-foreground tabular-nums">
          {hint}
        </p>
      </CardContent>
    </Card>
  );
}

function RangeSwitcher({
  value,
  onChange,
}: {
  value: Range;
  onChange: (r: Range) => void;
}) {
  const ranges: Range[] = ['7d', '30d', '90d', '1y'];
  return (
    <div className="inline-flex items-center gap-0.5 rounded-md bg-muted/60 p-0.5">
      {ranges.map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={cn(
            'h-6 rounded px-2.5 text-[11px] font-medium transition-colors',
            value === r
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {r}
        </button>
      ))}
    </div>
  );
}

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border/60 bg-background/95 px-3 py-2 text-xs shadow-md backdrop-blur">
      <p className="mb-1 text-muted-foreground">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-sm"
            style={{ background: p.color }}
          />
          <span className="capitalize">{p.dataKey}</span>
          <span className="ml-auto font-medium tabular-nums">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [range, setRange] = useState<Range>('30d');
  const { data, isLoading } = useDashboard(range);

  const trendData = useMemo(
    () =>
      data?.trend.map((d) => ({
        ...d,
        label: format(new Date(d.date), 'MMM d'),
      })) ?? [],
    [data?.trend],
  );

  if (isLoading || !data) return <DashboardSkeleton />;

  const { metrics, mix, pipeline, recentEnquiries, topListings, districts } =
    data;
  const totalProperties = pipeline.reduce((s, p) => s + p.count, 0);

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-medium tracking-tight">Overview</h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Last {range === '30d' ? '30 days' : range} · updated{' '}
            {formatDistanceToNow(new Date(), { addSuffix: true })}
          </p>
        </div>
        <RangeSwitcher value={range} onChange={setRange} />
      </div>

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <MetricCard
          icon={Building}
          label="Total listings"
          value={formatNumber(metrics.totalListings)}
          delta={metrics.totalListingsDelta}
          hint={`+${Math.round((metrics.totalListings * metrics.totalListingsDelta) / 100)} vs prev. period`}
        />
        <MetricCard
          icon={Mail}
          label="New enquiries"
          value={formatNumber(metrics.newEnquiries)}
          delta={metrics.newEnquiriesDelta}
          hint={`${metrics.awaitingReply} awaiting reply`}
        />
        <MetricCard
          icon={CheckCircle2}
          label="Closed deals"
          value={formatNumber(metrics.closedDeals)}
          delta={metrics.closedDealsDelta}
          hint={`${metrics.soldCount} sold · ${metrics.rentedCount} rented`}
        />
        <MetricCard
          icon={Coins}
          label="GMV closed"
          value={formatNPR(metrics.gmv)}
          delta={metrics.gmvDelta}
          hint={`avg ${formatNPR(metrics.avgDealValue)} / deal`}
        />
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
        <Card className="border-border/60">
          <CardHeader className="flex-row items-start justify-between space-y-0 pb-3">
            <div>
              <CardTitle className="text-sm font-medium">
                Listings & enquiries
              </CardTitle>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Daily volume across the selected range
              </p>
            </div>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-blue-600" />
                Listings
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-sm bg-slate-400" />
                Enquiries
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trendData}
                  margin={{ top: 4, right: 6, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="g-listings" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#2563eb"
                        stopOpacity={0.18}
                      />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="g-enquiries"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#94a3b8"
                        stopOpacity={0.14}
                      />
                      <stop offset="100%" stopColor="#94a3b8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="currentColor"
                    strokeOpacity={0.06}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: 'currentColor', opacity: 0.5 }}
                    minTickGap={32}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10, fill: 'currentColor', opacity: 0.5 }}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="enquiries"
                    stroke="#94a3b8"
                    fill="url(#g-enquiries)"
                    strokeWidth={2}
                    strokeDasharray="4 3"
                  />
                  <Area
                    type="monotone"
                    dataKey="listings"
                    stroke="#2563eb"
                    fill="url(#g-listings)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Property mix</CardTitle>
            <p className="mt-0.5 text-xs text-muted-foreground">By type</p>
          </CardHeader>
          <CardContent>
            <div className="h-[140px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mix}
                    dataKey="count"
                    innerRadius={42}
                    outerRadius={64}
                    paddingAngle={2}
                  >
                    {mix.map((_, i) => (
                      <Cell
                        key={i}
                        fill={TYPE_COLORS[i % TYPE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 space-y-1.5 text-xs">
              {mix.map((m, i) => {
                const total = mix.reduce((s, x) => s + x.count, 0);
                const pct = Math.round((m.count / total) * 100);
                return (
                  <div
                    key={m.type}
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5 text-muted-foreground capitalize">
                      <span
                        className="h-2 w-2 rounded-sm"
                        style={{ background: TYPE_COLORS[i] }}
                      />
                      {m.type.toLowerCase()}s
                    </span>
                    <span className="font-medium tabular-nums">
                      {m.count}
                      <span className="ml-1.5 font-normal text-muted-foreground">
                        {pct}%
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <CardTitle className="text-sm font-medium">
              Listing pipeline
            </CardTitle>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Where every property is right now
            </p>
          </div>
          <span className="text-xs text-muted-foreground tabular-nums">
            {totalProperties} total
          </span>
        </CardHeader>
        <CardContent>
          <div className="mb-3.5 flex h-2 overflow-hidden rounded-full">
            {pipeline.map((p) => (
              <div
                key={p.status}
                title={`${p.status}: ${p.count}`}
                style={{
                  width: `${(p.count / totalProperties) * 100}%`,
                  background: PIPELINE_COLORS[p.status],
                }}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {pipeline.map((p) => (
              <div key={p.status} className="space-y-0.5">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: PIPELINE_COLORS[p.status] }}
                  />
                  {p.status.charAt(0) + p.status.slice(1).toLowerCase()}
                </span>
                <span className="text-sm font-medium tabular-nums">
                  {p.count}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-3 lg:grid-cols-2">
        <Card className="border-border/60">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Recent enquiries
            </CardTitle>
            {metrics.awaitingReply > 0 && (
              <Badge
                variant="outline"
                className="border-amber-100 bg-amber-50 text-amber-700 text-[10px] font-medium dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300"
              >
                {metrics.awaitingReply} new
              </Badge>
            )}
          </CardHeader>
          <CardContent className="pb-3">
            <ul className="divide-y divide-border/60">
              {recentEnquiries.slice(0, 5).map((e) => (
                <li key={e.id} className="flex items-center gap-2.5 py-2.5">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="text-[10px] font-medium bg-muted/60">
                      {initialsFor(e.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-xs font-medium">{e.name}</p>
                      {e.isNew && (
                        <span className="h-1 w-1 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {e.propertyTitle} · {e.propertyLocation}
                    </p>
                  </div>
                  <span className="text-[10px] text-muted-foreground tabular-nums">
                    {formatDistanceToNow(new Date(e.createdAt))}
                  </span>
                </li>
              ))}
            </ul>
            <Link href="/enquiries" className="mt-1 block">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-full text-xs"
              >
                View all enquiries
                <ArrowRight className="ml-1 h-3 w-3" strokeWidth={2} />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Top performing listings
            </CardTitle>
            <span className="text-[10px] text-muted-foreground">
              By views · {range}
            </span>
          </CardHeader>
          <CardContent className="pb-3">
            <ul className="divide-y divide-border/60">
              {topListings.slice(0, 5).map((p) => (
                <li key={p.id} className="flex items-center gap-2.5 py-2.5">
                  <div className="h-9 w-9 shrink-0 rounded-md bg-muted/60 overflow-hidden">
                    {p.imageUrl && (
                      <img
                        src={getImageUrl(p.imageUrl)}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">{p.title}</p>
                    <div className="mt-0.5 flex items-center gap-2.5 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" strokeWidth={1.75} />
                        {p.enquiries} enquiries
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">
            Listings by district
          </CardTitle>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Top {districts.length} active markets
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={districts}
                layout="vertical"
                margin={{ top: 4, right: 16, left: -10, bottom: 0 }}
              >
                <CartesianGrid
                  stroke="currentColor"
                  strokeOpacity={0.06}
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fill: 'currentColor', opacity: 0.5 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  width={80}
                  tick={{ fontSize: 11, fill: 'currentColor', opacity: 0.7 }}
                />
                <Tooltip
                  content={<ChartTooltip />}
                  cursor={{ fill: 'currentColor', fillOpacity: 0.04 }}
                />
                <Bar
                  dataKey="count"
                  fill="#2563eb"
                  radius={[0, 3, 3, 0]}
                  barSize={14}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
