'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { CRUD } from '@/api/crud';
import { AffiliationFormData } from '@/@types/company/affiliation';

const affiliationsApi = new CRUD('api/affiliations');

export const AddAffiliationDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState<AffiliationFormData>({
    name: '',
    logoUrl: '',
    isActive: true,
    displayOrder: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      displayOrder: parseInt(e.target.value, 10) || 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.logoUrl) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      const result = await affiliationsApi.createWithOutImage(formData);
      toast.success(result.message || 'Affiliation created successfully');
      setIsOpen(false);
      setFormData({
        name: '',
        logoUrl: '',
        isActive: true,
        displayOrder: 0,
      });
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : 'Something went wrong';
      toast.error(msg);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Affiliation
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add Affiliation</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Nepal Real Estate Board"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logoUrl">Logo URL *</Label>
            <Input
              id="logoUrl"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/logo.png"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="displayOrder">Display Order</Label>
              <Input
                id="displayOrder"
                name="displayOrder"
                type="text"
                inputMode="numeric"
                value={formData.displayOrder || ''}
                onChange={handleOrderChange}
              />
            </div>
            <div className="space-y-2 flex items-end pb-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      isActive: checked === true,
                    }))
                  }
                />
                <Label htmlFor="isActive" className="cursor-pointer">
                  Active
                </Label>
              </div>
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
              disabled={!formData.name || !formData.logoUrl}
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
