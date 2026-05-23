'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { API_KEY, API_URL } from '@/utils/main';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const redirectTypes = [
  { value: 'PERMANENT', label: '301 - Permanent' },
  { value: 'TEMPORARY', label: '302 - Temporary' },
];

export default function CreateRedirectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    sourceUrl: '',
    targetUrl: '',
    redirectType: 'PERMANENT',
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/seo/redirects`, {
        method: 'POST',
        headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || 'Failed to create redirect');
      toast.success('Redirect rule created successfully');
      router.push('/seo/redirects');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Redirect rules help maintain SEO value when pages are moved or URLs change.
            Use 301 for permanent moves and 302 for temporary changes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Source URL *</Label>
            <Input
              value={formData.sourceUrl}
              onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
              placeholder="/old-page"
              required
            />
            <p className="text-xs text-muted-foreground">The URL that will redirect (must start with /)</p>
          </div>
          <div className="space-y-2">
            <Label>Target URL *</Label>
            <Input
              value={formData.targetUrl}
              onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
              placeholder="/new-page"
              required
            />
            <p className="text-xs text-muted-foreground">Where the user will be redirected to</p>
          </div>
          <div className="space-y-2">
            <Label>Redirect Type</Label>
            <select
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.redirectType}
              onChange={(e) => setFormData({ ...formData, redirectType: e.target.value })}
            >
              {redirectTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2 pt-6">
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
            <Label>Active</Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        <Button type="submit" disabled={isLoading}>{isLoading ? 'Creating...' : 'Create Redirect'}</Button>
      </div>
    </form>
  );
}