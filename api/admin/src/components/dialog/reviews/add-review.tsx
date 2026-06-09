"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TextAreaInput } from "@/components/common/Inputs";
import { PreviewImage } from "@/components/common/image";
import { Checkbox } from "@/components/ui/checkbox";
import { API_KEY, API_URL } from "@/utils/main";
import { getCookie } from "@/utils/cookies";
import { ReviewFormData } from "@/@types/reviews";

export const AddReviewDialog = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState<ReviewFormData>({
        name: "",
        role: "",
        text: "",
        rating: 5,
        isFeatured: false,
        images: null,
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value, 10);
        if (val >= 1 && val <= 5) {
            setFormData((prev) => ({ ...prev, rating: val }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setFormData((prev) => ({ ...prev, images: file }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.role || !formData.text) {
            toast.error("Please fill in required fields");
            return;
        }

        try {
            const token = getCookie("accessToken");
            const formPayload = new FormData();

            const jsonData = {
                name: formData.name,
                role: formData.role,
                text: formData.text,
                rating: formData.rating,
                isFeatured: formData.isFeatured,
            };
            formPayload.append("data", JSON.stringify(jsonData));

            if (formData.images instanceof File) {
                formPayload.append("images", formData.images);
            }

            const res = await fetch(`${API_URL}/api/reviews`, {
                method: "POST",
                headers: {
                    "x-api-key": API_KEY,
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
                body: formPayload,
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to create review");

            toast.success(result.message || "Review created successfully");
            setIsOpen(false);
            setFormData({
                name: "",
                role: "",
                text: "",
                rating: 5,
                isFeatured: false,
                images: null,
            });
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
                    Add Review
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Review</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name *</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Reviewer name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role *</Label>
                            <Input
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                placeholder="e.g. Homeowner"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="text">Review Text *</Label>
                        <TextAreaInput
                            id="text"
                            name="text"
                            value={formData.text}
                            onChange={handleInputChange}
                            placeholder="Write the review..."
                            row={4}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="rating">Rating (1-5)</Label>
                            <Input
                                id="rating"
                                name="rating"
                                type="number" step="any"
                                min={1}
                                max={5}
                                value={formData.rating}
                                onChange={handleRatingChange}
                                placeholder="5"
                            />
                        </div>
                        <div className="space-y-2 flex items-end pb-2">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="isFeatured"
                                    checked={formData.isFeatured}
                                    onCheckedChange={(checked) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            isFeatured: checked === true,
                                        }))
                                    }
                                />
                                <Label htmlFor="isFeatured" className="cursor-pointer">
                                    Featured Review
                                </Label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Image</Label>
                        <Input
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            onChange={handleImageChange}
                        />
                        {formData.images && (
                            <PreviewImage url={formData.images instanceof File ? URL.createObjectURL(formData.images) : formData.images} />
                        )}
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            disabled={!formData.name || !formData.role || !formData.text}
                        >
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
