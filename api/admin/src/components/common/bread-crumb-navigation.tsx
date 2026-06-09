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

    const segments = pathname
        .split("/")
        .filter((segment) => segment !== "")

    const breadcrumbs = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/")
        const label = decodeURIComponent(segment)
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())

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

                {breadcrumbs.map((crumb, index) => (
                    <div key={crumb.href} className="flex items-center">
                        {pathname !== '/dashboard' && <BreadcrumbSeparator className="mr-2" />}
                        {pathname === '/dashboard' && <Home size={18} className="mr-2" />}
                        <BreadcrumbItem>
                            {index === breadcrumbs.length - 1 ? (
                                <BreadcrumbPage className="text-primary font-semibold">{crumb.label}</BreadcrumbPage>
                            ) : (
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