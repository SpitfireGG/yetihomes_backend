'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { API_KEY, API_URL } from '@/utils/main';
import { toast } from 'sonner';
import Link from 'next/link';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function LocationPagesPage() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch(`${API_URL}/api/seo/location-pages`, {
        headers: { 'x-api-key': API_KEY },
      });
      const result = await res.json();
      if (res.ok) setPages(result.data || []);
    } catch (error) {
      toast.error('Failed to fetch location pages');
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`${API_URL}/api/seo/location-pages/${id}`, {
        method: 'PUT',
        headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !current }),
      });
      if (res.ok) {
        setPages(pages.map(p => p.id === id ? { ...p, isActive: !current } : p));
        toast.success('Status updated');
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this location page?')) return;
    try {
      const res = await fetch(`${API_URL}/api/seo/location-pages/${id}`, {
        method: 'DELETE',
        headers: { 'x-api-key': API_KEY },
      });
      if (res.ok) {
        setPages(pages.filter(p => p.id !== id));
        toast.success('Location page deleted');
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Location Pages</h1>
          <p className="text-sm text-muted-foreground">Manage SEO for location-based landing pages</p>
        </div>
        <Link href="/seo/locations/create">
          <Button><Plus className="h-4 w-4 mr-2" /> Add Location</Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : pages.length === 0 ? (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-muted-foreground">No location pages yet</p>
          <Link href="/seo/locations/create">
            <Button variant="link" className="mt-2">Create your first location page</Button>
          </Link>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 text-sm font-medium">Name</th>
                <th className="text-left p-3 text-sm font-medium">Slug</th>
                <th className="text-left p-3 text-sm font-medium">District</th>
                <th className="text-center p-3 text-sm font-medium">Active</th>
                <th className="text-right p-3 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-accent/50">
                  <td className="p-3">{page.name}</td>
                  <td className="p-3 text-sm text-muted-foreground">{page.slug}</td>
                  <td className="p-3">{page.district || '-'}</td>
                  <td className="p-3 text-center">
                    <Switch checked={page.isActive} onCheckedChange={() => toggleActive(page.id, page.isActive)} />
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/seo/locations/edit/${page.id}`}><Pencil className="h-4 w-4" /></Link>
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(page.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}