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
import { CRUD } from "@/api/crud";
import { TeamMemberFormData } from "@/@types/company/team";

const teamApi = new CRUD("api/teams");

export const AddTeamDialog = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [formData, setFormData] = useState<TeamMemberFormData>({
        name: "",
        role: "",
        location: "",
        email: "",
        bio: "",
        expertise: [],
        education: "",
        thumbnail: null,
        image: null,
    });

    const [expertiseInput, setExpertiseInput] = useState("");

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, field: "thumbnail" | "image") => {
        const file = e.target.files?.[0] ?? null;
        setFormData((prev) => ({ ...prev, [field]: file }));
    };

    const handleAddExpertise = () => {
        if (expertiseInput.trim()) {
            setFormData((prev) => ({
                ...prev,
                expertise: [...prev.expertise, expertiseInput.trim()],
            }));
            setExpertiseInput("");
        }
    };

    const handleRemoveExpertise = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            expertise: prev.expertise.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.role || !formData.email) {
            toast.error("Please fill in required fields");
            return;
        }

        try {
            const result = await teamApi.create(formData);
            toast.success(result.message || "Team member created successfully");
            setIsOpen(false);
            setFormData({
                name: "",
                role: "",
                location: "",
                email: "",
                bio: "",
                expertise: [],
                education: "",
                thumbnail: null,
                image: null,
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
                    Add Member
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Team Member</DialogTitle>
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
                                placeholder="Enter name"
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
                                placeholder="Enter role"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                placeholder="Enter location"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter email"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <TextAreaInput
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                            placeholder="Enter bio"
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="education">Education</Label>
                        <Input
                            id="education"
                            name="education"
                            value={formData.education}
                            onChange={handleInputChange}
                            placeholder="Enter education"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Expertise</Label>
                        <div className="flex gap-2">
                            <Input
                                value={expertiseInput}
                                onChange={(e) => setExpertiseInput(e.target.value)}
                                placeholder="Add expertise"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddExpertise();
                                    }
                                }}
                            />
                            <Button type="button" onClick={handleAddExpertise} variant="secondary">
                                Add
                            </Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.expertise.map((exp, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center gap-1 bg-secondary px-2 py-1 rounded-md text-sm"
                                >
                                    {exp}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveExpertise(index)}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Thumbnail Image</Label>
                            <Input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                onChange={(e) => handleImageChange(e, "thumbnail")}
                            />
                            {formData.thumbnail && (
                                <PreviewImage url={formData.thumbnail instanceof File ? URL.createObjectURL(formData.thumbnail) : formData.thumbnail} />
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>Full Image</Label>
                            <Input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                onChange={(e) => handleImageChange(e, "image")}
                            />
                            {formData.image && (
                                <PreviewImage url={formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image} />
                            )}
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
                            disabled={!formData.name || !formData.role || !formData.email}
                        >
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};