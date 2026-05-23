import React, { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { NumberInput, TextAreaInput, TextInput } from "@/components/common/Inputs";
import { PreviewImage } from "@/components/common/image";

import { useLanguages } from "@/hooks/useTankstack-query";
import { CRUD } from "@/api/crud";
import { CreateAchievementDto } from "@/@types/company/achivements";

type Props = {
    achievementId: string;
    data: {
        image: string;
        year: number;
        languageId: string;
        title: string;
        description: string
    }
}

export const EditCompanyAchievementsDialog = ({ achievementId, data }: Props) => {
    const { data: languages } = useLanguages();
    const teamApi = new CRUD("api/company/achievements");

    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState<CreateAchievementDto>(
        {
            image: data.image,
            year: data.year,
            translations: [
                {
                    language_id: data.languageId,
                    title: data.title,
                    description: data.description,
                },
            ],
        },
    );

    const member = formData;
    const translation = member.translations[0];


    const onChangeValue = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const onChangeHandle = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            translations: prev.translations.map((t, index) =>
                index === 0 ? { ...t, [name]: value } : t
            ),
        }));
    };

    const onSelectChange = (
        value: string,
        translationIndex: number,
        field: "language_id" | "title"
    ) => {
        setFormData(prev => ({
            ...prev,
            translations: prev.translations.map((translation, tIndex) =>
                tIndex === translationIndex
                    ? { ...translation, [field]: value }
                    : translation
            ),
        }));
    };

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

    const onChangeHandleNumberInput = (value: number, name: string) => {
        setFormData((pre) => ({
            ...pre, [name]: value,
        })
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await teamApi.update(formData, achievementId);

            toast.success(result.message);
            setIsOpen(false);
        } catch (error) {
            const msg = error instanceof Error ? error.message : "Something went wrong";
            toast.error(msg);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="p-2 w-full text-left text-sm hover:bg-muted/50 rounded">
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
                        label="Title"
                        name="title"
                        value={translation.title}
                        onChange={onChangeHandle}
                    />
                    <NumberInput
                        label="Year"
                        name="year"
                        value={formData.year}
                        onChange={onChangeHandleNumberInput}
                    />

                    <TextAreaInput
                        label="Description"
                        name="description"
                        value={translation.description}
                        onChange={onChangeHandle}
                    />

                    <div className="flex gap-6">
                        <div className="flex-1 space-y-2">
                            <Label>Language</Label>
                            <Select
                                value={translation.language_id}
                                onValueChange={(value) => onSelectChange(value, 0, 'language_id')}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {languages?.data?.map((lang) => (
                                        <SelectItem key={lang.id} value={lang.id}>
                                            {lang.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Image */}
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
                            Update
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
