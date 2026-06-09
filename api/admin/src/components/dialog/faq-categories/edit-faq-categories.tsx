import { FaqCategoryFormData } from '@/@types/faq';
import { CRUD } from '@/api/crud';
import { TextAreaInput, TextInput } from '@/components/common/Inputs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguages } from '@/hooks/useTankstack-query';
import { cn } from '@/lib/utils';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
  faqCategoryId: string;
  highlights: {
    display_order: number;
    language_id: string;
    title: string;
  };
};

export const EditFaqCategoriesDialog = ({
  highlights,
  faqCategoryId,
}: Props) => {
  const { data: languages } = useLanguages();
  const faqCategory = new CRUD(`api/faq-categories`);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FaqCategoryFormData>({
    display_order: highlights.display_order,
    translations: [
      {
        language_id: highlights.language_id,
        title: highlights.title,
      },
    ],
  });

  const onChangeHandle = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      translations: prev.translations.map((t, index) =>
        index === 0 ? { ...t, [name]: value } : t,
      ),
    }));
  };

  const handleDisplayOrderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    highlightIndex: number,
  ) => {
    const value = Number(e.target.value);

    setFormData((prev) => ({ ...prev, display_order: value }));
  };
  const onSelectChange = (
    value: string,
    translationIndex: number,
    field: 'language_id' | 'title',
  ) => {
    setFormData((prev) => ({
      ...prev,
      translations: prev.translations.map((translation, tIndex) =>
        tIndex === translationIndex
          ? { ...translation, [field]: value }
          : translation,
      ),
    }));
  };

  const onSubmitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await faqCategory.updateWithOutImage(formData, faqCategoryId);
      toast.success(res.message);
      setIsOpen(false);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      toast.error(msg);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="p-2 text-sm hover:bg-muted/50 rounde-d"
          >
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
            <TextInput
              label="title"
              name="title"
              value={formData.translations[0].title}
              onChange={(e) => onChangeHandle(e)}
            />

            <div className="space-y-3">
              <Label>Language</Label>
              <Select
                value={formData.translations[0].language_id}
                onValueChange={(value) =>
                  onSelectChange(value, 0, 'language_id')
                }
                required
              >
                <SelectTrigger className="w-45">
                  <div className="flex items-center gap-2">
                    <SelectValue placeholder="Select Language" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {languages?.data &&
                    languages.data.map((lang) => (
                      <SelectItem key={lang.id} value={lang.id}>
                        {lang.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="display_order">Display Order</label>
              <input
                className={cn(
                  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                  'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                  'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                  'w-20',
                )}
                type="text"
                inputMode="numeric"
                name="display_order"
                value={formData.display_order || ''}
                onChange={(e) => handleDisplayOrderChange(e, 0)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={onSubmitHandle} type="submit">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
