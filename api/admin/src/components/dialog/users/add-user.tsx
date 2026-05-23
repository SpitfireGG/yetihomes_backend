import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import React, { useState } from "react"
import { TextInput } from "@/components/common/Inputs"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { CRUD } from "@/api/crud"
import { toast } from "sonner"

type CreateUser = {
    name: string
    email: string
    password: string
    role: "USER" | "ADMIN"
}

export const CreateUserDialog = () => {
    const userCrud = new CRUD("api/auth/users/create")

    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState<CreateUser>({
        name: "",
        email: "",
        password: "",
        role: "USER"
    })

    const onChangeHandle = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const onSubmitHandle = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await userCrud.createWithOutImage(formData)
            toast.success(res.message || "User created successfully")
            setIsOpen(false)
            setFormData({
                name: "",
                email: "",
                password: "",
                role: "USER"
            })
        } catch (error) {
            const msg = error instanceof Error ? error.message : String(error)
            toast.error(msg)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add New User
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>Create User</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <TextInput
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={onChangeHandle}
                        />

                        <TextInput
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={onChangeHandle}
                        />

                        <TextInput
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={onChangeHandle}
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Role</label>
                            <Select
                                value={formData.role}
                                onValueChange={(value: "USER" | "ADMIN") =>
                                    setFormData(prev => ({ ...prev, role: value }))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USER">User</SelectItem>
                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={onSubmitHandle}>
                            Create
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
