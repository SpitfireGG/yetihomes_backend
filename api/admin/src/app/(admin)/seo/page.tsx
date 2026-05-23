"use client";

import Link from "next/link";
import {
  MapPin, LayoutGrid, Users, ArrowRightLeft, Search,
  TrendingUp, AlertTriangle, CheckCircle, ArrowRight, FileText,
  ExternalLink, Plus,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SeoStat = {
  label: string;
  count: number;
  total?: number;
  icon: any;
  href: string;
  hint: string;
};

const seoStats: SeoStat[] = [
  {
    label: "Location pages",
    count: 0,
    icon: MapPin,
    href: "/seo/locations",
    hint: "Cities & districts",
  },
  {
    label: "Property type pages",
    count: 0,
    icon: LayoutGrid,
    href: "/seo/property-types",
    hint: "Houses, apartments, land",
  },
  {
    label: "Agent pages",
    count: 0,
    icon: Users,
    href: "/seo/agents",
    hint: "Public team profiles",
  },
  {
    label: "Active redirects",
    count: 0,
    icon: ArrowRightLeft,
    href: "/seo/redirects",
    hint: "301 & 302 rules",
  },
];

type Check = {
  label: string;
  count: number;
  total: number;
  description: string;
};

const seoChecks: Check[] = [
  { label: "Meta titles", count: 0, total: 0, description: "Pages with optimized titles" },
  { label: "Meta descriptions", count: 0, total: 0, description: "Pages with descriptions 70-160 chars" },
  { label: "OG images", count: 0, total: 0, description: "Pages with social share images" },
  { label: "Canonical URLs", count: 0, total: 0, description: "Pages with canonical tags set" },
  { label: "Image alt text", count: 0, total: 0, description: "Property images with descriptive alt" },
  { label: "Structured data", count: 0, total: 0, description: "Pages with valid JSON-LD" },
];

const quickActions = [
  {
    label: "Create location page",
    description: "City or district landing",
    icon: MapPin,
    href: "/seo/locations/new",
  },
  {
    label: "Create property type page",
    description: "Houses, apartments, land",
    icon: LayoutGrid,
    href: "/seo/property-types/new",
  },
  {
    label: "Add agent profile",
    description: "Public team member",
    icon: Users,
    href: "/seo/agents/new",
  },
  {
    label: "Add redirect rule",
    description: "301 from old URL to new",
    icon: ArrowRightLeft,
    href: "/seo/redirects/new",
  },
];

function StatCard({ stat }: { stat: SeoStat }) {
  return (
    <Link
      href={stat.href}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
    >
      <Card className="border-border/60 transition-all duration-200 group-hover:border-border group-hover:shadow-sm">
        <CardContent className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-muted/60">
              <stat.icon
                className="h-3.5 w-3.5 text-muted-foreground"
                strokeWidth={1.75}
              />
            </span>
            <ArrowRight
              className="h-3.5 w-3.5 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-muted-foreground"
              strokeWidth={1.75}
            />
          </div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1">
            {stat.label}
          </p>
          <p className="text-2xl font-medium tabular-nums leading-none">
            {stat.count}
          </p>
          <p className="mt-2 text-[10px] text-muted-foreground">
            {stat.hint}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

function HealthRow({ check }: { check: Check }) {
  const percentage = check.total > 0 ? (check.count / check.total) * 100 : 0;
  const isHealthy = percentage >= 80;
  const isWarning = percentage >= 50 && percentage < 80;
  const isEmpty = check.total === 0;

  const statusColor = isEmpty
    ? "text-muted-foreground/50"
    : isHealthy
      ? "text-emerald-600 dark:text-emerald-400"
      : isWarning
        ? "text-amber-600 dark:text-amber-400"
        : "text-red-600 dark:text-red-400";

  const StatusIcon = isEmpty
    ? AlertTriangle
    : isHealthy
      ? CheckCircle
      : AlertTriangle;

  const barColor = isEmpty
    ? "bg-muted-foreground/20"
    : isHealthy
      ? "bg-emerald-500"
      : isWarning
        ? "bg-amber-500"
        : "bg-red-500";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <StatusIcon
            className={cn("h-3.5 w-3.5 flex-shrink-0", statusColor)}
            strokeWidth={1.75}
          />
          <div className="min-w-0">
            <p className="truncate text-xs font-medium leading-tight">
              {check.label}
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              {check.description}
            </p>
          </div>
        </div>
        <span className="flex-shrink-0 text-xs tabular-nums text-muted-foreground">
          {check.count}
          <span className="text-muted-foreground/40">
            /{check.total || "—"}
          </span>
        </span>
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-muted/60">
        <div
          className={cn("h-full rounded-full transition-all", barColor)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function SeoDashboard() {
  const totalPages = seoStats.reduce((sum, s) => sum + s.count, 0);
  const healthyChecks = seoChecks.filter(
    c => c.total > 0 && c.count / c.total >= 0.8
  ).length;
  const totalChecks = seoChecks.filter(c => c.total > 0).length;

  return (
    <div className="space-y-6 p-4 md:p-6">

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-medium tracking-tight">SEO management</h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {totalPages > 0 ? (
              <>
                <span className="font-medium text-foreground">{totalPages}</span>{" "}
                managed pages · {healthyChecks} of {totalChecks || "—"} health checks passing
              </>
            ) : (
              "Get started by creating your first SEO page"
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild className="h-9 text-xs">
            <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1.5 h-3 w-3" strokeWidth={1.75} />
              Search Console
            </a>
          </Button>
          <Button size="sm" asChild className="h-9 text-xs">
            <Link href="/seo/locations/new">
              <Plus className="mr-1.5 h-3 w-3" strokeWidth={2} />
              New page
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {seoStats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">

        <Card className="border-border/60">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
            <div className="flex items-center gap-2">
              <Search
                className="h-3.5 w-3.5 text-muted-foreground"
                strokeWidth={1.75}
              />
              <CardTitle className="text-sm font-medium">
                SEO health check
              </CardTitle>
            </div>
            {totalChecks > 0 && (
              <Badge
                variant="outline"
                className={cn(
                  "h-5 border-0 text-[10px] font-medium uppercase tracking-wider",
                  healthyChecks === totalChecks
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                    : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
                )}
              >
                {healthyChecks}/{totalChecks} passing
              </Badge>
            )}
          </CardHeader>
          <CardContent className="space-y-4 pt-1">
            {seoChecks.map((check) => (
              <HealthRow key={check.label} check={check} />
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp
                className="h-3.5 w-3.5 text-muted-foreground"
                strokeWidth={1.75}
              />
              <CardTitle className="text-sm font-medium">Quick actions</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pb-3 pt-1">
            <ul className="divide-y divide-border/60">
              {quickActions.map((action) => (
                <li key={action.label}>
                  <Link
                    href={action.href}
                    className="group flex items-center gap-3 py-2.5 transition-colors hover:bg-muted/40 -mx-4 px-4"
                  >
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-muted/60 transition-colors group-hover:bg-muted">
                      <action.icon
                        className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-foreground"
                        strokeWidth={1.75}
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium leading-tight">
                        {action.label}
                      </p>
                      <p className="truncate text-[11px] text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                    <ArrowRight
                      className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-muted-foreground"
                      strokeWidth={1.75}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

      </div>

      <Card className="border-border/60 border-dashed bg-muted/20">
        <CardContent className="flex items-start gap-3 p-4">
          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-background">
            <FileText
              className="h-3.5 w-3.5 text-muted-foreground"
              strokeWidth={1.75}
            />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium">SEO resources</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              View the sitemap, robots.txt, and structured data validator to verify what search engines see.
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                <ExternalLink className="h-3 w-3" strokeWidth={1.75} />
                sitemap.xml
              </a>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                <ExternalLink className="h-3 w-3" strokeWidth={1.75} />
                robots.txt
              </a>
              <a
                href="https://search.google.com/test/rich-results"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-border/60 bg-background px-2 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
              >
                <ExternalLink className="h-3 w-3" strokeWidth={1.75} />
                Rich results test
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
