import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from 'lucide-react';
import { TextAreaInput, TextInput } from "@/components/common/Inputs";
import React, { useState } from "react";
import { toast } from "sonner";
import { CRUD } from "@/api/crud";
import { CreateContentCategory } from "@/@types/contents/contents";

export const AddContentCategoriesDialog = () => {

    const contentCategory = new CRUD(`api/content-categories`);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [formData, setFormData] = useState<CreateContentCategory>(
        {
            name: ''
        }
    )
    const onChangeHandle = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            name: value
        }));
    };


    const onSubmitHandle = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await contentCategory.createWithOutImage(formData)
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
                        Add content Category
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>Add Content Category</DialogTitle>
                        <DialogDescription hidden>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 space-y-4">
                        <TextInput label="name" name="name"
                            value={formData.name}
                            onChange={(e) => onChangeHandle(e)}
                        />
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

