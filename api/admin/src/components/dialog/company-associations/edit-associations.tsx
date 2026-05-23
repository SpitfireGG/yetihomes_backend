"use client"
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TextAreaInput, TextInput } from "@/components/common/Inputs";
import { PreviewImage } from "@/components/common/image";
import { CRUD } from "@/api/crud";
import { CreateAssociationDto } from "@/@types/company/association";


type Props = {
    guideId: string;
    data: {
        image: string
        name: string,
        link: string
    }

}

export const EditCompanyAssociationsDialog = ({ guideId, data: { image, name, link } }: Props) => {
    const teamApi = new CRUD("api/company/associations");

    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState<CreateAssociationDto>(
        {
            image: image,
            name: name,
            link: link
        }
    );


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target

        setFormData(prev => ({
            ...prev,
            [name]: value
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
            const result = await teamApi.update(formData, guideId);
            toast.success(result.message);
            setIsOpen(false);
        } catch (error) {
            const msg = error instanceof Error ? error.message : "Something went wrong";
            toast.error(msg);
        }
    };

    /* ----------------------------- UI ----------------------------- */

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="p-2 text-sm text-left w-full hover:bg-accent rounded">
                Edit
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
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleNameChange}
                    />
                    <TextInput
                        label="Link"
                        name="link"
                        value={formData.link}
                        onChange={handleNameChange}
                    />
                    <div className="flex gap-6">
                        {/* Image */}
                        <div className="flex-1 space-y-2">
                            <Label>Image</Label>
                            <Input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                onChange={handleImage}
                            />

                            {formData.image && <PreviewImage url={formData.image} />}
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
                            Update
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
