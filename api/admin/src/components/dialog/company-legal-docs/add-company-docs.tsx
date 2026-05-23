"use client"
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TextInput } from "@/components/common/Inputs";
import { PreviewImage } from "@/components/common/image";
import { CRUD } from "@/api/crud";
import { CreateCompanyLegalDocuments } from "@/@types/company/legal-docs";

export const AddCompanyLegalDocsDialog = () => {
    const guide = new CRUD("api/company/legal-docs");
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState<CreateCompanyLegalDocuments>(
        {
            image: null,
            title: ''
        },
    );

    const member = formData;

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value

        setFormData(prev => ({
            ...prev,
            title
        }))
    }

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        if (target instanceof HTMLInputElement && target.type === "file") {
            const file = target.files?.[0] ?? null;

            setFormData((prev) => ({
                ...prev,
                image: file
            }));
            return;
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await guide.create(formData);
            toast.success(result.message);
            setIsOpen(false);
        } catch (error) {
            const msg = error instanceof Error ? error.message : "Something went wrong";
            toast.error(msg);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Docs
                </Button>
            </DialogTrigger>
            <DialogHeader hidden>
                <DialogTitle>Add Content Category</DialogTitle>
                <DialogDescription hidden>
                    Make changes to your profile here. Click save when you&apos;re
                    done.
                </DialogDescription>
            </DialogHeader>
            <DialogContent className="sm:max-w-[525px]">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <TextInput
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleNameChange}
                    />
                    <div className="flex gap-6">

                        <div className="flex-1 space-y-2">
                            <Label>Image</Label>
                            <Input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                onChange={handleImage}
                            />

                            {member.image && <PreviewImage url={member.image} />}
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                        >
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
