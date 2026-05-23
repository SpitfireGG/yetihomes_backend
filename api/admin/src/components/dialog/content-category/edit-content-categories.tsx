import { CreateContentCategory } from "@/@types/contents/contents";
import { CRUD } from "@/api/crud";
import { TextInput } from "@/components/common/Inputs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguages } from "@/hooks/useTankstack-query";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";


type Props = {
    contentCategoryId: string;
    name: string;
}

export const EditContentCategoriesDialog = ({ name, contentCategoryId }: Props) => {

    const faqCategory = new CRUD(`api/content-categories`);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [formData, setFormData] = useState<CreateContentCategory>(
        {
            name: name
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
            const res = await faqCategory.updateWithOutImage(formData, contentCategoryId)
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
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="p-2 text-sm hover:bg-muted/50 rounde-d">
                        Edit
                    </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>Edit Trip Highlights</DialogTitle>
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
                        <Button onClick={onSubmitHandle} type="submit">Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

