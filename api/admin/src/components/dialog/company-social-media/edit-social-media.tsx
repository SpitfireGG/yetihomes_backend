import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TextInput } from "@/components/common/Inputs";
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CRUD } from "@/api/crud";
import { toast } from "sonner";
import { CreateSocialMediaFormData, SocialPlatform } from "@/@types/company";

type Props = {
    mediaId: string;
    data: {
        platfrom: SocialPlatform,
        url: string
    }
}

export const EditSocialMediaDialog = ({ mediaId, data }: Props) => {

    const tripFaqs = new CRUD(`api/company/contact-info/social-media`);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [formData, setFormData] = useState<CreateSocialMediaFormData>(
        {
            platform: data.platfrom ?? SocialPlatform.FACEBOOK,
            url: data.url
        }
    )


    const onChangeHandle = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const onSelectChange = (value: SocialPlatform) => {
        setFormData(prev => ({
            ...prev,
            platform: value,
        }));
    };



    const onSubmitHandle = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await tripFaqs.updateWithOutImage(formData, mediaId)
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
                <DialogTrigger className="p-2 w-full text-left text-sm hover:bg-muted/50 rounded">
                    Edit
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader hidden>
                        <DialogTitle>Create Trip Review</DialogTitle>
                        <DialogDescription hidden>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 space-y-4">
                        <TextInput label="Url" name="url"
                            value={formData.url}
                            onChange={(e) => onChangeHandle(e)}
                        />

                        <Select
                            value={formData.platform}
                            onValueChange={onSelectChange}
                            required
                        >
                            <SelectTrigger className="w-45">
                                <SelectValue placeholder="Select Platform" />
                            </SelectTrigger>

                            <SelectContent>
                                {Object.values(SocialPlatform).map(platform => (
                                    <SelectItem key={platform} value={platform}>
                                        {platform.replace('_', ' ')}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>


                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={onSubmitHandle}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog >
    )
}

