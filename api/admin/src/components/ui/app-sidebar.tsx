'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { navigations } from '@/data/navigations';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();

  const isActive = (url: string) =>
    pathname === url || pathname.startsWith(`${url.toLowerCase()}/`);

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="border-b border-border/40 px-3 py-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className={`relative flex shrink-0 items-center justify-center rounded-md bg-primary/5 p-1 ${open ? 'h-12 w-20' : 'h-10 w-10'}`}>
            <Image
              src="/Yeti-Logo-01.svg"
              alt="Yeti Homes"
              fill
              className="object-contain"
            />
          </div>
          {open && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium tracking-tight">
                Yeti Homes
              </span>
              <span className="text-[11px] text-muted-foreground">
                Management console
              </span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup className="p-0">
          {open && (
            <SidebarGroupLabel className="px-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {navigations.map((item, idx) => {
                const itemActive = isActive(item.url);
                const hasChildren = item.subNavigations.length > 0;

                return (
                  <Collapsible
                    key={idx}
                    defaultOpen={itemActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      {hasChildren ? (
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            isActive={itemActive}
                            tooltip={item.title}
                            className={cn(
                              'group/btn h-9 gap-2.5 rounded-md transition-colors',
                              'data-[active=true]:bg-primary/8 data-[active=true]:text-primary',
                              'hover:bg-muted/60',
                            )}
                          >
                            <item.icon
                              className={cn(
                                'size-4 shrink-0 transition-colors',
                                itemActive
                                  ? 'text-primary'
                                  : 'text-muted-foreground group-hover/btn:text-foreground',
                              )}
                            />
                            <span className="flex-1 truncate text-sm font-medium capitalize">
                              {item.title}
                            </span>
                            {open && (
                              <ChevronRight
                                className="size-3.5 text-muted-foreground/60 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                aria-hidden
                              />
                            )}
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                      ) : (
                        <SidebarMenuButton
                          asChild
                          isActive={itemActive}
                          tooltip={item.title}
                          className={cn(
                            'group/btn h-9 gap-2.5 rounded-md transition-colors',
                            'data-[active=true]:bg-primary/8 data-[active=true]:text-primary',
                            'hover:bg-muted/60',
                          )}
                        >
                          <Link href={item.url}>
                            <item.icon
                              className={cn(
                                'size-4 shrink-0 transition-colors',
                                itemActive
                                  ? 'text-primary'
                                  : 'text-muted-foreground group-hover/btn:text-foreground',
                              )}
                            />
                            <span className="flex-1 truncate text-sm font-medium capitalize">
                              {item.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      )}

                      {hasChildren && open && (
                        <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                          <SidebarMenuSub className="ml-[18px] mt-0.5 gap-0 border-l border-border/40 pl-2">
                            {item.subNavigations.map((nav, index) => {
                              const navActive = isActive(nav.link);
                              return (
                                <SidebarMenuSubItem key={index}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={navActive}
                                    className={cn(
                                      'h-8 rounded-md text-[13px] transition-colors',
                                      'data-[active=true]:bg-primary/8 data-[active=true]:font-medium data-[active=true]:text-primary',
                                      'hover:bg-muted/60',
                                    )}
                                  >
                                    <Link href={nav.link}>
                                      <span className="truncate">
                                        {nav.title}
                                      </span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}

                      
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <Separator className="opacity-40" />

      <SidebarFooter className="px-3 py-3">
      </SidebarFooter>
    </Sidebar>
  );
}
