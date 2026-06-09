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

export default function CreateAgentPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [seo, setSeo] = useState<any>({});
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    email: '',
    phone: '',
    bio: '',
    photoUrl: '',
    licenseNumber: '',
    experienceYears: 0,
    displayOrder: 0,
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/seo/agents`, {
        method: 'POST',
        headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, seo }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to create agent');
      toast.success('Agent created successfully');
      router.push('/seo/agents');
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
          <Label>Agent Name *</Label>
          <Input
            value={formData.name}
            onChange={(e) => {
              const name = e.target.value;
              const slug = name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
              setFormData({ ...formData, name, slug });
            }}
            placeholder="John Doe"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="john-doe"
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="john@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            placeholder="+977 9800000000"
          />
        </div>
        <div className="space-y-2">
          <Label>License Number</Label>
          <Input
            value={formData.licenseNumber}
            onChange={(e) =>
              setFormData({ ...formData, licenseNumber: e.target.value })
            }
            placeholder="LIC-12345"
          />
        </div>
        <div className="space-y-2">
          <Label>Experience (Years)</Label>
          <Input
            type="number" step="any"
            value={formData.experienceYears || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                experienceYears: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Photo URL</Label>
          <Input
            value={formData.photoUrl}
            onChange={(e) =>
              setFormData({ ...formData, photoUrl: e.target.value })
            }
            placeholder="https://example.com/photo.jpg"
          />
        </div>
        <div className="space-y-2">
          <Label>Display Order</Label>
          <Input
            type="number" step="any"
            value={formData.displayOrder || ''}
            onChange={(e) =>
              setFormData({ ...formData, displayOrder: Number(e.target.value) })
            }
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.isActive}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isActive: checked })
            }
          />
          <Label>Active</Label>
        </div>
        <div className="space-y-2 md:col-span-2">
          <TextAreaInput
            label="Bio"
            name="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Agent biography..."
            row={4}
          />
        </div>
      </div>

      <SeoMetadataForm seo={seo} onChange={setSeo} baseSlug={formData.slug} />

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Agent'}
        </Button>
      </div>
    </form>
  );
}
