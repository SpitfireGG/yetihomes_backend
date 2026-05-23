"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from 'lucide-react';
import { TextAreaInput, TextInput } from "@/components/common/Inputs";
import React, { useState } from "react";
import { toast } from "sonner";
import { CreateContactInfoFormData } from "@/@types/company";
import { CRUD } from "@/api/crud";

export const AddContactInfoDialog = () => {

    const tripFaqs = new CRUD(`api/company/contact-info`);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [formData, setFormData] = useState<CreateContactInfoFormData>(
        {
            name: '',
            email: '',
            phone: '',
            whatsapp: '',
            address: '',
            map: ''
        }
    )


    const onChangeHandle = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmitHandle = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await tripFaqs.createWithOutImage(formData)
            toast.success(res.message);
            setIsOpen(false)
        } catch (error) {
            const msg = error instanceof Error ? error.message : String(error);
            toast.error(msg);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Information
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader hidden>
                        <DialogTitle>Create Trip Review</DialogTitle>
                        <DialogDescription hidden>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid md:grid-cols-2 gap-4 space-y-4">
                        <TextInput label="Name" name="name"
                            value={formData.name}
                            onChange={(e) => onChangeHandle(e)}
                        />
                        <TextInput label="Email" name="email"
                            value={formData.email}
                            onChange={(e) => onChangeHandle(e)}
                        />
                        <TextInput label="Phone" name="phone"
                            value={formData.phone}
                            onChange={(e) => onChangeHandle(e)}
                        />
                        <TextInput label="Whatsapp" name="whatsapp"
                            value={formData.whatsapp}
                            onChange={(e) => onChangeHandle(e)}
                        />
                        <TextInput label="Address" name="address"
                            value={formData.address}
                            onChange={(e) => onChangeHandle(e)}
                        />
                        <div className="col-span-2">
                            <TextAreaInput label="Map" name="map" value={formData.map}
                                onChange={(e) => onChangeHandle(e)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={onSubmitHandle}>Create</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

