'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { API_KEY, API_URL } from '@/utils/main';
import { toast } from 'sonner';
import Link from 'next/link';
import { Plus, Pencil, Trash2, User } from 'lucide-react';

export default function AgentsPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const res = await fetch(`${API_URL}/api/seo/agents`, {
        headers: { 'x-api-key': API_KEY },
      });
      const result = await res.json();
      if (res.ok) setAgents(result.data || []);
    } catch (error) {
      toast.error('Failed to fetch agents');
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`${API_URL}/api/seo/agents/${id}`, {
        method: 'PUT',
        headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !current }),
      });
      if (res.ok) {
        setAgents(agents.map(a => a.id === id ? { ...a, isActive: !current } : a));
        toast.success('Status updated');
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this agent?')) return;
    try {
      const res = await fetch(`${API_URL}/api/seo/agents/${id}`, {
        method: 'DELETE',
        headers: { 'x-api-key': API_KEY },
      });
      if (res.ok) {
        setAgents(agents.filter(a => a.id !== id));
        toast.success('Agent deleted');
      }
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Agents</h1>
          <p className="text-sm text-muted-foreground">Manage agent profile pages for SEO</p>
        </div>
        <Link href="/seo/agents/create">
          <Button><Plus className="h-4 w-4 mr-2" /> Add Agent</Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : agents.length === 0 ? (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-muted-foreground">No agents yet</p>
          <Link href="/seo/agents/create">
            <Button variant="link" className="mt-2">Add your first agent</Button>
          </Link>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 text-sm font-medium">Photo</th>
                <th className="text-left p-3 text-sm font-medium">Name</th>
                <th className="text-left p-3 text-sm font-medium">Email</th>
                <th className="text-left p-3 text-sm font-medium">Phone</th>
                <th className="text-center p-3 text-sm font-medium">Active</th>
                <th className="text-right p-3 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {agents.map((agent) => (
                <tr key={agent.id} className="hover:bg-accent/50">
                  <td className="p-3">
                    {agent.photoUrl ? (
                      <img src={agent.photoUrl} alt={agent.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </td>
                  <td className="p-3 font-medium">{agent.name}</td>
                  <td className="p-3 text-sm text-muted-foreground">{agent.email || '-'}</td>
                  <td className="p-3 text-sm">{agent.phone || '-'}</td>
                  <td className="p-3 text-center">
                    <Switch checked={agent.isActive} onCheckedChange={() => toggleActive(agent.id, agent.isActive)} />
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/seo/agents/edit/${agent.id}`}><Pencil className="h-4 w-4" /></Link>
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(agent.id)}>
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