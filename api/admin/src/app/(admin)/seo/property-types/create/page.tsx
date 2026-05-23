'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { TextAreaInput } from '@/components/common/Inputs';
import { API_KEY, API_URL } from '@/utils/main';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { SeoMetadataForm } from '@/components/seo/seo-metadata-form';

const propertyTypes = ['HOUSE', 'APARTMENT', 'LAND', 'COMMERCIAL', 'VILLA', 'PENTHOUSE', 'DUPLEX', 'BUNGALOW'];
const listingTypes = ['SALE', 'RENT'];

export default function CreatePropertyTypePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [seo, setSeo] = useState<any>({});
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    propertyType: '',
    listingType: '',
    minBedrooms: 0,
    maxBedrooms: 10,
    displayOrder: 0,
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/seo/property-type-pages`, {
        method: 'POST',
        headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, seo }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to create property type page');
      toast.success('Property type page created successfully');
      router.push('/seo/property-types');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Page Name *</Label>
          <Input
            value={formData.name}
            onChange={(e) => {
              const name = e.target.value;
              const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              setFormData({ ...formData, name, slug });
            }}
            placeholder="e.g., 3 Bedroom Houses"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="3-bedroom-houses"
          />
        </div>
        <div className="space-y-2">
          <Label>Property Type</Label>
          <select
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={formData.propertyType}
            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
          >
            <option value="">Select property type</option>
            {propertyTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Listing Type</Label>
          <select
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={formData.listingType}
            onChange={(e) => setFormData({ ...formData, listingType: e.target.value })}
          >
            <option value="">Select listing type</option>
            {listingTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label>Min Bedrooms</Label>
          <Input
            type="number"
            value={formData.minBedrooms}
            onChange={(e) => setFormData({ ...formData, minBedrooms: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label>Max Bedrooms</Label>
          <Input
            type="number"
            value={formData.maxBedrooms}
            onChange={(e) => setFormData({ ...formData, maxBedrooms: Number(e.target.value) })}
          />
        </div>
        <div className="space-y-2">
          <Label>Display Order</Label>
          <Input
            type="number"
            value={formData.displayOrder}
            onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.isActive}
            onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
          />
          <Label>Active</Label>
        </div>
        <div className="space-y-2 md:col-span-2">
          <TextAreaInput
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Description for this property type page..."
            row={4}
          />
        </div>
      </div>

      <SeoMetadataForm seo={seo} onChange={setSeo} baseSlug={formData.slug} />

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>{isLoading ? 'Creating...' : 'Create Property Type Page'}</Button>
      </div>
    </form>
  );
}