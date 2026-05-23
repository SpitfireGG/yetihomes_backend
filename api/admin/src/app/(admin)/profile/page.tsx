"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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
import { toast } from "sonner"
import { authService } from "@/api/auth"

type Profile = {
    fullName: string
    email: string
}

type PasswordForm = {
    old_password: string
    new_password: string
    confirm_password: string
}

const ProfilePage = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(true)

    const [formData, setFormData] = useState<Profile>({
        fullName: "",
        email: "",
    })

    const [passwordData, setPasswordData] = useState<PasswordForm>({
        old_password: "",
        new_password: "",
        confirm_password: ""
    })

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await authService.getProfile()
                setFormData({
                    fullName: res.fullName,
                    email: res.email,
                })
            } catch {
                toast.error("Failed to load profile")
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPasswordData(prev => ({ ...prev, [name]: value }))
    }

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            toast.success("Profile updated")
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Update failed")
        }
    }

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (passwordData.new_password.length < 8) {
            return toast.error("Password must be at least 8 characters")
        }

        if (passwordData.new_password !== passwordData.confirm_password) {
            return toast.error("Passwords do not match")
        }

        try {
            toast.success("Password updated")
            setPasswordData({
                old_password: "",
                new_password: "",
                confirm_password: ""
            })
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Password update failed")
        }
    }

    if (loading) return <p>Loading...</p>

    return (
        <div className="p-2 md:p-0">
            <h1 className="text-2xl font-bold tracking-tight md:mt-4">
                My Profile
            </h1>

            <Tabs defaultValue="profile-details" className="py-4">
                <TabsList>
                    <TabsTrigger value="profile-details">Profile</TabsTrigger>
                    <TabsTrigger value="change-password">Change Password</TabsTrigger>
                </TabsList>

                <TabsContent value="profile-details">
                    <form
                        onSubmit={handleProfileSubmit}
                        className="py-4 grid gap-6 max-w-2xl"
                    >
                        <TextInput
                            label="Name"
                            name="name"
                            value={formData.fullName}
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
                            <Select value="ADMIN" disabled>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USER">User</SelectItem>
                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="text-right">
                            <Button type="submit">Update Profile</Button>
                        </div>
                    </form>
                </TabsContent>

                <TabsContent value="change-password">
                    <form
                        onSubmit={handlePasswordSubmit}
                        className="py-4 grid gap-6 max-w-md"
                    >
                        <TextInput
                            label="Current Password"
                            name="old_password"
                            type="password"
                            value={passwordData.old_password}
                            onChange={handlePasswordChange}
                        />

                        <TextInput
                            label="New Password"
                            name="new_password"
                            type="password"
                            value={passwordData.new_password}
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

export default ProfilePage
