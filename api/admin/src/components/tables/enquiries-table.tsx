"use client"

import { useState, useMemo } from "react"
import { formatDistanceToNow } from "date-fns"
import {
  Search, Mail, Phone, Calendar, MessageSquare,
  ArrowUpRight, ChevronDown, X, Filter,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePropertyEnquiries } from "@/hooks/useTankstack-query"
import TableSkeleton from "../common/table-skeleton"
import { cn } from "@/lib/utils"

type EnquiryStatus = "NEW" | "CONTACTED" | "CLOSED" | "SPAM"
type EnquiryType = "GENERAL" | "PROPERTY" | "SCHEDULE_VISIT" | "SELLER"

const statusStyles: Record<EnquiryStatus, string> = {
  NEW: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900",
  CONTACTED: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900",
  CLOSED: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900",
  SPAM: "bg-muted text-muted-foreground border-transparent",
}

const typeLabels: Record<EnquiryType, string> = {
  GENERAL: "General",
  PROPERTY: "Property",
  SCHEDULE_VISIT: "Site visit",
  SELLER: "Seller",
}

const initialsFor = (name: string) =>
  name?.split(" ").map(s => s[0]).slice(0, 2).join("").toUpperCase() ?? "?"

const avatarColorFor = (name: string) => {
  const palettes = [
    "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300",
    "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300",
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
    "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
    "bg-pink-50 text-pink-700 dark:bg-pink-950/50 dark:text-pink-300",
  ]
  const hash = name?.split("").reduce((a, c) => a + c.charCodeAt(0), 0) ?? 0
  return palettes[hash % palettes.length]
}

function StatusBadge({ status }: { status: EnquiryStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 h-5",
        statusStyles[status],
      )}
    >
      {status === "SPAM" ? "spam" : status.toLowerCase()}
    </Badge>
  )
}

export default function EnquiryTable() {
  const { data, isLoading } = usePropertyEnquiries()
  const enquiries = data?.data ?? []

  const [searchQuery, setSearchQuery] = useState("")
  const [activeStatus, setActiveStatus] = useState<"all" | EnquiryStatus>("all")
  const [typeFilters, setTypeFilters] = useState<EnquiryType[]>([])
  const [selected, setSelected] = useState<any | null>(null)

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return enquiries.filter((e: any) => {
      const matchesSearch = !q
        || e.fullName?.toLowerCase().includes(q)
        || e.email?.toLowerCase().includes(q)
        || e.phone?.includes(q)
        || e.message?.toLowerCase().includes(q)
      const matchesStatus = activeStatus === "all" || e.status === activeStatus
      const matchesType = typeFilters.length === 0 || typeFilters.includes(e.type)
      return matchesSearch && matchesStatus && matchesType
    })
  }, [enquiries, searchQuery, activeStatus, typeFilters])

  const counts = useMemo(() => ({
    all: enquiries.length,
    NEW: enquiries.filter((e: any) => e.status === "NEW").length,
    CONTACTED: enquiries.filter((e: any) => e.status === "CONTACTED").length,
    CLOSED: enquiries.filter((e: any) => e.status === "CLOSED").length,
    SPAM: enquiries.filter((e: any) => e.status === "SPAM").length,
  }), [enquiries])

  if (isLoading) return <TableSkeleton />

  const toggleType = (t: EnquiryType) => {
    setTypeFilters(prev =>
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
    )
  }

  return (
    <div className="space-y-5">

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-lg font-medium tracking-tight">Enquiries</h1>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {counts.NEW > 0 && (
              <span className="font-medium text-foreground">{counts.NEW} new </span>
            )}
            of {counts.all} total
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-full sm:max-w-xs">
          <Search
            className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.75}
          />
          <Input
            placeholder="Search by name, email, phone, message…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 pl-8 pr-8 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground/70 transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              <X className="h-3 w-3" strokeWidth={2} />
            </button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-9 gap-1.5 text-xs font-medium",
                typeFilters.length > 0 && "border-foreground/30",
              )}
            >
              <Filter className="h-3 w-3" strokeWidth={1.75} />
              Type
              {typeFilters.length > 0 && (
                <span className="ml-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background tabular-nums">
                  {typeFilters.length}
                </span>
              )}
              <ChevronDown className="h-3 w-3 opacity-60" strokeWidth={1.75} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-44">
            <DropdownMenuLabel className="text-xs">Filter by type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(Object.keys(typeLabels) as EnquiryType[]).map((t) => (
              <DropdownMenuCheckboxItem
                key={t}
                checked={typeFilters.includes(t)}
                onCheckedChange={() => toggleType(t)}
                className="text-xs"
              >
                {typeLabels[t]}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {(typeFilters.length > 0 || searchQuery) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setTypeFilters([]); setSearchQuery("") }}
            className="h-9 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear
          </Button>
        )}
      </div>

      <Tabs
        value={activeStatus}
        onValueChange={(v) => setActiveStatus(v as any)}
      >
        <TabsList className="h-9 bg-muted/50 p-0.5">
          {([
            ["all", "All", counts.all],
            ["NEW", "New", counts.NEW],
            ["CONTACTED", "Contacted", counts.CONTACTED],
            ["CLOSED", "Closed", counts.CLOSED],
            ["SPAM", "Spam", counts.SPAM],
          ] as const).map(([value, label, count]) => (
            <TabsTrigger
              key={value}
              value={value}
              className="h-8 px-3 text-xs data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              {label}
              <span className="ml-1.5 text-[10px] tabular-nums text-muted-foreground data-[state=active]:text-foreground">
                {count}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="overflow-hidden rounded-lg border border-border/60">
        <Table>
          <TableHeader>
            <TableRow className="border-border/60 bg-muted/30 hover:bg-muted/30">
              <TableHead className="h-9 w-[28%] text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Contact
              </TableHead>
              <TableHead className="h-9 w-[40%] text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Message
              </TableHead>
              <TableHead className="h-9 w-[12%] text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Type
              </TableHead>
              <TableHead className="h-9 w-[10%] text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="h-9 w-[10%] text-right text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Received
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={5} className="h-32">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-muted/60">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                    </div>
                    <p className="text-sm font-medium">No enquiries found</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((e: any) => {
                const isUnread = e.status === "NEW"
                return (
                  <TableRow
                    key={e.id}
                    onClick={() => setSelected(e)}
                    className={cn(
                      "group cursor-pointer border-border/60 transition-colors",
                      "hover:bg-muted/40",
                    )}
                  >
                    <TableCell className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="relative flex-shrink-0">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback
                              className={cn("text-[11px] font-medium", avatarColorFor(e.fullName))}
                            >
                              {initialsFor(e.fullName)}
                            </AvatarFallback>
                          </Avatar>
                          {isUnread && (
                            <span
                              className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-background"
                              aria-label="Unread"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className={cn(
                            "truncate text-sm leading-tight",
                            isUnread ? "font-medium text-foreground" : "text-foreground",
                          )}>
                            {e.fullName || "—"}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                            {e.email || e.phone || "No contact info"}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="py-3">
                      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {e.message || <span className="italic">No message</span>}
                      </p>
                    </TableCell>

                    <TableCell className="py-3">
                      <span className="text-xs text-foreground/80">
                        {typeLabels[e.type as EnquiryType] ?? e.type}
                      </span>
                    </TableCell>

                    <TableCell className="py-3">
                      <StatusBadge status={e.status} />
                    </TableCell>

                    <TableCell className="py-3 text-right">
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {formatDistanceToNow(new Date(e.createdAt), { addSuffix: true })}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>

      {filtered.length > 0 && (
        <p className="text-center text-[11px] text-muted-foreground tabular-nums">
          Showing {filtered.length} of {enquiries.length} enquiries
        </p>
      )}

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent className="w-full sm:max-w-md">
          {selected && (
            <>
              <SheetHeader className="space-y-3 pb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11">
                    <AvatarFallback className={cn("text-sm font-medium", avatarColorFor(selected.fullName))}>
                      {initialsFor(selected.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <SheetTitle className="text-base font-medium leading-tight">
                      {selected.fullName}
                    </SheetTitle>
                    <SheetDescription className="mt-0.5 flex items-center gap-2 text-xs">
                      <StatusBadge status={selected.status} />
                      <span>·</span>
                      <span>{typeLabels[selected.type as EnquiryType] ?? selected.type}</span>
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-5 py-2">
                <div className="grid grid-cols-1 gap-3">
                  {selected.email && (
                    <div className="flex items-center gap-3 rounded-md border border-border/60 px-3 py-2.5">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          Email
                        </p>
                        <a
                          href={`mailto:${selected.email}`}
                          className="block truncate text-sm hover:underline underline-offset-4"
                        >
                          {selected.email}
                        </a>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/50" strokeWidth={1.75} />
                    </div>
                  )}
                  {selected.phone && (
                    <div className="flex items-center gap-3 rounded-md border border-border/60 px-3 py-2.5">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                          Phone
                        </p>
                        <a
                          href={`tel:${selected.phone}`}
                          className="block truncate text-sm tabular-nums hover:underline underline-offset-4"
                        >
                          {selected.phone}
                        </a>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/50" strokeWidth={1.75} />
                    </div>
                  )}
                  <div className="flex items-center gap-3 rounded-md border border-border/60 px-3 py-2.5">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.75} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        Received
                      </p>
                      <p className="text-sm tabular-nums">
                        {new Date(selected.createdAt).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    Message
                  </p>
                  <div className="rounded-md border border-border/60 bg-muted/30 p-4">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {selected.message || (
                        <span className="italic text-muted-foreground">No message provided</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  {selected.email && (
                    <Button asChild className="h-9 w-full text-sm">
                      <a href={`mailto:${selected.email}`}>
                        <Mail className="mr-1.5 h-3.5 w-3.5" strokeWidth={1.75} />
                        Reply via email
                      </a>
                    </Button>
                  )}
                  {selected.phone && (
                    <Button variant="outline" asChild className="h-9 w-full text-sm">
                      <a href={`tel:${selected.phone}`}>
                        <Phone className="mr-1.5 h-3.5 w-3.5" strokeWidth={1.75} />
                        Call
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
