// import {
//     Dialog,
//     DialogClose,
//     DialogContent,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { TextInput } from "@/components/common/Inputs"
// import { toast } from "sonner"
// import React, { useState } from "react"
// import { Auth } from "@/api/auth"

// type Props = {
//     userId: string
// }

// const auth = new Auth("api/auth/admin-change-password");

// export const ChangePasswordDialog = ({ userId }: Props): any => {
//     const [isOpen, setIsOpen] = useState(false)
//     const [loading, setLoading] = useState(false)

//     const [formData, setFormData] = useState({
//         password: "",
//         confirm_password: ""
//     })

//     const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target
//         setFormData(prev => ({ ...prev, [name]: value }))
//     }

//     const onSubmitHandle = async (e: React.FormEvent) => {
//         e.preventDefault()

//         if (formData.password.length < 8) {
//             return toast.error("Password must be at least 8 characters")
//         }

//         if (formData.password !== formData.confirm_password) {
//             return toast.error("Passwords do not match")
//         }

//         try {
//             setLoading(true)

//             const res = await auth.changePassword({
//                 old_password: formData.confirm_password,
//                 new_password: formData.password,
//             })

//             toast.success(res.message || "Password updated successfully")
//             setIsOpen(false)
//             setFormData({ password: "", confirm_password: "" })
//         } catch (err) {
//             toast.error(err instanceof Error ? err.message : "Password update failed")
//         } finally {
//             setLoading(false)
//         }


//         return (
//             <Dialog open={isOpen} onOpenChange={setIsOpen}>
//                 <form>
//                     <DialogTrigger asChild>
//                         <Button variant="destructive">Change Password</Button>
//                     </DialogTrigger>

//                     <DialogContent className="sm:max-w-[425px]">
//                         <DialogHeader>
//                             <DialogTitle>Change Password</DialogTitle>
//                         </DialogHeader>

//                         <div className="grid gap-4">
//                             <TextInput
//                                 label="New Password"
//                                 name="password"
//                                 type="password"
//                                 value={formData.password}
//                                 onChange={onChangeHandle}
//                             />

//                             <TextInput
//                                 label="Confirm Password"
//                                 name="confirm_password"
//                                 type="password"
//                                 value={formData.confirm_password}
//                                 onChange={onChangeHandle}
//                             />
//                         </div>

//                         <DialogFooter>
//                             <DialogClose asChild>
//                                 <Button variant="outline">Cancel</Button>
//                             </DialogClose>
//                             <Button
//                                 type="submit"
//                                 onClick={onSubmitHandle}
//                                 disabled={loading}
//                             >
//                                 Update Password
//                             </Button>
//                         </DialogFooter>
//                     </DialogContent>
//                 </form>
//             </Dialog>
//         )
//     }
// }
