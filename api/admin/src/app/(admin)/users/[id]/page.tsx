"use client"

import React, { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TextInput } from "@/components/common/Inputs"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CRUD } from "@/api/crud"
import { toast } from "sonner"
import { authService } from "@/api/auth"
import { useAuth } from "@/hooks/use-auth"
import { API_URL, API_KEY } from "@/utils/main"

type User = {
    id: string
    name: string
    email: string
    role: "USER" | "ADMIN"
}

type PasswordForm = {
    password: string
    confirm_password: string
}

const EditUserPage = () => {
    const { id } = useParams()
    const router = useRouter()
    const { loading: authLoading, isAdmin } = useAuth()

    useEffect(() => {
        if (!authLoading && !isAdmin) {
            router.replace("/")
        }
    }, [authLoading, isAdmin, router])

    const userCrud = new CRUD(`api/auth/users`)

    const [loading, setLoading] = useState(true)

    const [formData, setFormData] = useState<User>({
        id: "",
        name: "",
        email: "",
        role: "USER"
    })

    const [passwordData, setPasswordData] = useState<PasswordForm>({
        password: "",
        confirm_password: ""
    })

    /* ----------------------------------
     Fetch User
    -----------------------------------*/
    useEffect(() => {
        if (!id) return

        const fetchUser = async () => {
            try {
                const res = await userCrud.getDataById(id as string)
                setFormData(res.data)
            } catch {
                toast.error("Failed to load user")
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [id])

    /* ----------------------------------
     Handlers
    -----------------------------------*/
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleRoleChange = (value: "USER" | "ADMIN") => {
        setFormData(prev => ({ ...prev, role: value }))
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPasswordData(prev => ({ ...prev, [name]: value }))
    }

    /* ----------------------------------
     Submit User Update
    -----------------------------------*/
    const handleUserSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await userCrud.updateWithOutImage(formData, id as string)
            toast.success(res.message || "User updated")
            router.push("/users")
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Update failed")
        }
    }

    /* ----------------------------------
     Submit Password Change
    -----------------------------------*/
    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (passwordData.password.length < 8) {
            return toast.error("Password must be at least 8 characters")
        }

        if (passwordData.password !== passwordData.confirm_password) {
            return toast.error("Passwords do not match")
        }

        if (!id) {
            return toast.error("User ID missing")
        }

        try {
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("accessToken="))
                ?.split("=")[1];

            const res = await fetch(`${API_URL}/api/auth/admin-change-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": API_KEY,
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: JSON.stringify({
                    user_id: id as string,
                    new_password: passwordData.password,
                }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to update password");

            toast.success(result.message || "Password updated")
            setPasswordData({ password: "", confirm_password: "" })
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Password update failed")
        }
    }

    if (loading) return <p>Loading...</p>

    return (
        <div className="p-2 md:p-0">
            <h1 className="text-2xl font-bold tracking-tight md:mt-4">
                Edit User
            </h1>

            <Tabs defaultValue="user-details" className="py-4">
                <TabsList>
                    <TabsTrigger value="user-details">Details</TabsTrigger>
                    <TabsTrigger value="change-password">Change Password</TabsTrigger>
                </TabsList>

                {/* ---------------- User Details ---------------- */}
                <TabsContent value="user-details">
                    <form onSubmit={handleUserSubmit} className="py-4 grid gap-6 max-w-2xl">
                        <TextInput
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        <TextInput
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <div className="space-y-2">
                            <Label>Role</Label>
                            <Select value={formData.role} onValueChange={handleRoleChange}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USER">User</SelectItem>
                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="text-right">
                            <Button type="submit">Update User</Button>
                        </div>
                    </form>
                </TabsContent>

                {/* ---------------- Change Password ---------------- */}
                <TabsContent value="change-password">
                    <form
                        onSubmit={handlePasswordSubmit}
                        className="py-4 grid gap-6 max-w-md"
                    >
                        <TextInput
                            label="New Password"
                            name="password"
                            type="password"
                            value={passwordData.password}
                            onChange={handlePasswordChange}
                        />

                        <TextInput
                            label="Confirm Password"
                            name="confirm_password"
                            type="password"
                            value={passwordData.confirm_password}
                            onChange={handlePasswordChange}
                        />

                        <div className="text-right">
                            <Button type="submit">Update Password</Button>
                        </div>
                    </form>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default EditUserPage
