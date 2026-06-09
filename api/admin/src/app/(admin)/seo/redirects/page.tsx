'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { API_KEY, API_URL } from '@/utils/main';
import { toast } from 'sonner';
import Link from 'next/link';
import { Search, Plus, Trash2, ArrowRight } from 'lucide-react';

export default function RedirectsPage() {
  const [redirects, setRedirects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'PERMANENT' | 'TEMPORARY'>('all');

  useEffect(() => {
    fetchRedirects();
  }, []);

  const fetchRedirects = async () => {
    try {
      const res = await fetch(`${API_URL}/api/seo/redirects`, {
        headers: { 'x-api-key': API_KEY },
      });
      const result = await res.json();
      if (res.ok) setRedirects(result.data || []);
    } catch (error) {
      toast.error('Failed to fetch redirects');
    } finally {
      setLoading(false);
    }
  };

  const filteredRedirects = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return redirects.filter((r) => {
      const matchesSearch =
        !q ||
        r.sourceUrl?.toLowerCase().includes(q) ||
        r.targetUrl?.toLowerCase().includes(q);
      const matchesType = typeFilter === 'all' || r.redirectType === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [redirects, searchQuery, typeFilter]);

  const toggleActive = async (id: string, current: boolean) => {
    try {
      await fetch(`${API_URL}/api/seo/redirects/${id}`, {
        method: 'PUT',
        headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !current }),
      });
      setRedirects(redirects.map(r => r.id === id ? { ...r, isActive: !current } : r));
      toast.success('Status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this redirect?')) return;
    try {
      const res = await fetch(`${API_URL}/api/seo/redirects/${id}`, {
        method: 'DELETE',
        headers: { 'x-api-key': API_KEY },
      });
      if (res.ok) {
        setRedirects(redirects.filter(r => r.id !== id));
        toast.success('Redirect deleted');
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Redirect Rules</h1>
          <p className="text-sm text-muted-foreground">Manage URL redirects for SEO preservation</p>
        </div>
        <Link href="/seo/redirects/create">
          <Button><Plus className="h-4 w-4 mr-2" /> Add Redirect</Button>
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.75}
          />
          <Input
            placeholder="Search by source or target URL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 pl-9 text-sm"
          />
        </div>
        <div className="inline-flex items-center gap-1 rounded-md bg-muted/60 p-0.5">
          {(['all', 'PERMANENT', 'TEMPORARY'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`h-7 rounded px-3 text-xs font-medium transition-colors ${
                typeFilter === type
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {type === 'all' ? 'All' : type === 'PERMANENT' ? '301' : '302'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : filteredRedirects.length === 0 ? (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-muted-foreground">
            {searchQuery ? 'No redirect rules match your search' : 'No redirect rules yet'}
          </p>
          {!searchQuery && (
            <Link href="/seo/redirects/create">
              <Button variant="link" className="mt-2">Create your first redirect rule</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 text-sm font-medium">Source</th>
                <th className="p-3 text-center"><ArrowRight className="h-4 w-4 mx-auto" /></th>
                <th className="text-left p-3 text-sm font-medium">Target</th>
                <th className="text-left p-3 text-sm font-medium">Type</th>
                <th className="text-center p-3 text-sm font-medium">Active</th>
                <th className="text-right p-3 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredRedirects.map((redirect) => (
                <tr key={redirect.id} className="hover:bg-accent/50">
                  <td className="p-3 font-mono text-sm">{redirect.sourceUrl}</td>
                  <td className="p-3 text-center"><ArrowRight className="h-4 w-4 text-muted-foreground" /></td>
                  <td className="p-3 font-mono text-sm">{redirect.targetUrl}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded ${redirect.redirectType === 'PERMANENT' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {redirect.redirectType === 'PERMANENT' ? '301 Permanent' : '302 Temporary'}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <Switch checked={redirect.isActive} onCheckedChange={() => toggleActive(redirect.id, redirect.isActive)} />
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(redirect.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(searchQuery || typeFilter !== 'all') && (
            <p className="border-t border-border/60 p-3 text-center text-xs text-muted-foreground tabular-nums">
              Showing {filteredRedirects.length} of {redirects.length} redirects
            </p>
          )}
        </div>
      )}
    </div>
  );
}