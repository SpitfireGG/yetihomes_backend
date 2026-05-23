"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

export function BreadCrumb() {
    const pathname = usePathname()

    // Split and filter path segments
    const segments = pathname
        .split("/")
        .filter((segment) => segment !== "")

    // Build breadcrumb data
    const breadcrumbs = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/")
        const label = decodeURIComponent(segment)
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase()) // Capitalize each word

        return { href, label }
    })

    return (
        <Breadcrumb className="py-4">
            <BreadcrumbList>
                {pathname !== '/dashboard' && (<BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/dashboard">
                            <Home size={16} />
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>)}

                {/* Render dynamic segments */}
                {breadcrumbs.map((crumb, index) => (
                    <div key={crumb.href} className="flex items-center">
                        {pathname !== '/dashboard' && <BreadcrumbSeparator className="mr-2" />}
                        {pathname === '/dashboard' && <Home size={18} className="mr-2" />}
                        <BreadcrumbItem>
                            {index === breadcrumbs.length - 1 ? (
                                // Last segment → current page
                                <BreadcrumbPage className="text-primary font-semibold">{crumb.label}</BreadcrumbPage>
                            ) : (
                                // Intermediate segments → links
                                <BreadcrumbLink asChild>
                                    <Link href={crumb.href}>{crumb.label}</Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    </div>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}