'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { API_KEY, API_URL } from '@/utils/main';
import { CRUD } from '@/api/crud';

const amenityCrud = new CRUD("api/amenities");

const AMENITY_ICONS = [
  'Wifi',
  'Parking',
  'Pool',
  'Gym',
  'Security',
  'Garden',
  'Lift',
  'AC',
  'Heating',
  'Balcony',
  'Kitchen',
  'Laundry',
  'TV',
  'Pet Friendly',
];

export default function CreateAmenityPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await amenityCrud.authFetch(`${API_URL}/api/amenities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Failed to create amenity');
      }

      toast.success('Amenity created successfully');
      router.push('/amenities');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create amenity');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Swimming Pool"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="icon">Icon</Label>
          <select
            id="icon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            required
          >
            <option value="">Select icon</option>
            {AMENITY_ICONS.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Amenity'}
        </Button>
      </div>
    </form>
  );
}