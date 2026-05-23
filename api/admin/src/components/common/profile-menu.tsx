"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authService } from "@/api/auth"
import { toast } from "sonner"

export const ProfileMenu = () => {
    const router = useRouter()
    const [user, setUser] = React.useState<{
        fullName: string
        email: string
        avatar?: string
    } | null>(null)

    React.useEffect(() => {
        authService.getProfile().then(setUser).catch(() => {})
    }, [])

    const handleProfileClick = async () => {
        if (!user) {
            try {
                const res = await authService.getProfile()
                setUser(res)
                router.push("/profile")
            } catch {
                toast.error("Failed to load profile")
            }
        } else {
            router.push("/profile")
        }
    }

    const handleLogout = async () => {
        try {
            await authService.logout()
            setUser(null)
            router.push("/auth/login")
        } catch {
            toast.error("Logout failed")
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full p-0">
                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.fullName}
                            className="h-8 w-8 rounded-full object-cover"
                        />
                    ) : (
                        <User className="h-6 w-6" />
                    )}
                    <span className="sr-only">Profile</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-sm font-medium truncate">
                    {user?.fullName || "Admin"}
                </div>
                <div className="px-2 pb-1.5 text-xs text-muted-foreground truncate">
                    {user?.email || ""}
                </div>

                <DropdownMenuItem onClick={handleProfileClick}>Profile</DropdownMenuItem>

                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" /> Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
