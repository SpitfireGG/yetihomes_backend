'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { TextAreaInput } from '@/components/common/Inputs';
import { toast } from 'sonner';
import { API_KEY, API_URL } from '@/utils/main';
import { SeoMetadataForm } from '@/components/seo/seo-metadata-form';
import { CRUD } from '@/api/crud';

const blogCrud = new CRUD("api/blogs");

const CATEGORIES = [
  'Real Estate',
  'Market Trends',
  'Investment',
  'Tips & Guide',
  'News',
  'Lifestyle',
];

const READ_TIME_OPTIONS = [
  '2 min read',
  '3 min read',
  '5 min read',
  '7 min read',
  '10 min read',
  '15 min read',
];

export default function CreateBlogPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [authorImagePreview, setAuthorImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Real Estate',
    excerpt: '',
    content: '',
    author: '',
    authorRole: '',
    readTime: '5 min read',
    isFeatured: false,
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [authorImage, setAuthorImage] = useState<File | null>(null);
  const [seoData, setSeoData] = useState<any>({});

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAuthorImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAuthorImage(file);
      setAuthorImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify({ ...formData, seo: seoData }));

      if (coverImage) {
        formDataToSend.append('images', coverImage);
      }
      if (authorImage) {
        formDataToSend.append('images', authorImage);
      }

      const res = await blogCrud.authFetch(`${API_URL}/api/blogs`, {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Failed to create blog article');
      }

      toast.success('Blog article created successfully');
      router.push('/blogs');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create blog article');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => {
              const newTitle = e.target.value;
              const newSlug = newTitle
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
              setFormData({ ...formData, title: newTitle, slug: newSlug });
            }}
            placeholder="Enter article title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="article-url-slug"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            required
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="readTime">Read Time</Label>
          <select
            id="readTime"
            value={formData.readTime}
            onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            required
          >
            {READ_TIME_OPTIONS.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Author Name</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="Author name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="authorRole">Author Role</Label>
          <Input
            id="authorRole"
            value={formData.authorRole}
            onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
            placeholder="e.g., Senior Editor"
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <TextAreaInput
            label="Excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            placeholder="Short description for the article..."
            row={3}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <TextAreaInput
            label="Content"
            name="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Write your article content here..."
            row={12}
          />
        </div>

        <div className="space-y-2">
          <Label>Cover Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleCoverImageChange}
            className="cursor-pointer"
          />
          {coverImagePreview && (
            <div className="mt-2 relative w-48 h-32 overflow-hidden rounded-md">
              <img
                src={coverImagePreview}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setCoverImage(null);
                  setCoverImagePreview(null);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-sm"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Author Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleAuthorImageChange}
            className="cursor-pointer"
          />
          {authorImagePreview && (
            <div className="mt-2 relative w-48 h-32 overflow-hidden rounded-md">
              <img
                src={authorImagePreview}
                alt="Author preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setAuthorImage(null);
                  setAuthorImagePreview(null);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-sm"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isFeatured"
            checked={formData.isFeatured}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isFeatured: checked })
            }
          />
          <Label htmlFor="isFeatured">Mark as Featured</Label>
        </div>
      </div>

      <SeoMetadataForm seo={seoData} onChange={setSeoData} baseSlug={formData.slug} />

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Article'}
        </Button>
      </div>
    </form>
  );
}