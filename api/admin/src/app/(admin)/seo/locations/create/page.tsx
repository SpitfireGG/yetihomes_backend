'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TextAreaInput } from '@/components/common/Inputs';
import { API_KEY, API_URL } from '@/utils/main';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { SeoMetadataForm } from '@/components/seo/seo-metadata-form';

export default function CreateLocationPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [seo, setSeo] = useState<any>({});
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    latitude: '',
    longitude: '',
    district: '',
    province: '',
    displayOrder: 0,
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/seo/location-pages`, {
        method: 'POST',
        headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, seo }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to create location page');
      toast.success('Location page created successfully');
      router.push('/seo/locations');
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
          <Label>Location Name *</Label>
          <Input
            value={formData.name}
            onChange={(e) => {
              const name = e.target.value;
              const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              setFormData({ ...formData, name, slug });
            }}
            placeholder="e.g., Lalitpur"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="lalitpur"
          />
        </div>
        <div className="space-y-2">
          <Label>District</Label>
          <Input
            value={formData.district}
            onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            placeholder="Lalitpur"
          />
        </div>
        <div className="space-y-2">
          <Label>Province</Label>
          <Input
            value={formData.province}
            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
            placeholder="Bagmati"
          />
        </div>
        <div className="space-y-2">
          <Label>Latitude</Label>
          <Input
            type="number"
            step="any"
            value={formData.latitude}
            onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
            placeholder="27.6644"
          />
        </div>
        <div className="space-y-2">
          <Label>Longitude</Label>
          <Input
            type="number"
            step="any"
            value={formData.longitude}
            onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
            placeholder="85.3188"
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
            placeholder="Description of the location..."
            row={4}
          />
        </div>
      </div>

      <SeoMetadataForm seo={seo} onChange={setSeo} baseSlug={formData.slug} />

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>{isLoading ? 'Creating...' : 'Create Location Page'}</Button>
      </div>
    </form>
  );
}