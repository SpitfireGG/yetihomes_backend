import { useEffect, useState } from "react"
import { authService } from "@/api/auth"

export const useAuth = () => {
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        authService
            .getProfile()
            .then(() => {
                setIsAuthenticated(true)
                setIsAdmin(true)
            })
            .catch(() => {
                setIsAuthenticated(false)
                setIsAdmin(false)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return { loading, isAuthenticated, isAdmin }
}
