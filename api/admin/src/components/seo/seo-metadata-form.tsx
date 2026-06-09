'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronDown, ChevronUp, ExternalLink, AlertCircle } from 'lucide-react';
import { TextAreaInput } from '@/components/common/Inputs';

interface SeoMetadataFormProps {
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    slug?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImageUrl?: string;
    ogImageWidth?: number;
    ogImageHeight?: number;
    ogImageAlt?: string;
    twitterCard?: 'summary' | 'summary_large_image';
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImageUrl?: string;
    noindex?: boolean;
    nofollow?: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
    focusKeyword?: string;
    secondaryKeywords?: string;
    breadcrumbOverride?: string;
    locale?: string;
  };
  onChange: (seo: any) => void;
  baseSlug?: string;
}

export function SeoMetadataForm({ seo = {}, onChange, baseSlug }: SeoMetadataFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const updateSeo = (field: string, value: any) => {
    onChange({ ...seo, [field]: value });
  };

  const metaTitleLength = (seo.metaTitle || '').length;
  const metaDescLength = (seo.metaDescription || '').length;

  return (
    <div className="rounded-lg border bg-card">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4 text-left hover:bg-accent/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">SEO Settings</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t p-4 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4 pt-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <span className={`text-xs ${metaTitleLength > 70 ? 'text-red-500' : metaTitleLength > 60 ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                    {metaTitleLength}/70
                  </span>
                </div>
                <Input
                  id="metaTitle"
                  value={seo.metaTitle || ''}
                  onChange={(e) => updateSeo('metaTitle', e.target.value)}
                  placeholder="Page title for search engines (50-60 chars recommended)"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <span className={`text-xs ${metaDescLength > 200 ? 'text-red-500' : metaDescLength > 160 ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                    {metaDescLength}/200
                  </span>
                </div>
                <textarea
                  id="metaDescription"
                  value={seo.metaDescription || ''}
                  onChange={(e) => updateSeo('metaDescription', e.target.value)}
                  placeholder="Brief description for search results (150-160 chars recommended)"
                  className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="canonicalUrl">Canonical URL</Label>
                <Input
                  id="canonicalUrl"
                  value={seo.canonicalUrl || ''}
                  onChange={(e) => updateSeo('canonicalUrl', e.target.value)}
                  placeholder="https://yhetihomes.com/page"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="focusKeyword">Focus Keyword</Label>
                <Input
                  id="focusKeyword"
                  value={seo.focusKeyword || ''}
                  onChange={(e) => updateSeo('focusKeyword', e.target.value)}
                  placeholder="Main keyword for this page"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondaryKeywords">Secondary Keywords</Label>
                <Input
                  id="secondaryKeywords"
                  value={seo.secondaryKeywords || ''}
                  onChange={(e) => updateSeo('secondaryKeywords', e.target.value)}
                  placeholder="Comma-separated keywords"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="breadcrumbOverride">Breadcrumb Override</Label>
                <Input
                  id="breadcrumbOverride"
                  value={seo.breadcrumbOverride || ''}
                  onChange={(e) => updateSeo('breadcrumbOverride', e.target.value)}
                  placeholder="Custom breadcrumb text"
                />
              </div>
            </TabsContent>

            <TabsContent value="social" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Open Graph (Facebook/LinkedIn)</Label>
                <div className="grid gap-3 pl-4 border-l-2 border-border">
                  <div className="space-y-1">
                    <Label htmlFor="ogTitle" className="text-xs text-muted-foreground">OG Title</Label>
                    <Input
                      id="ogTitle"
                      value={seo.ogTitle || ''}
                      onChange={(e) => updateSeo('ogTitle', e.target.value)}
                      placeholder="Title for social sharing"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="ogDescription" className="text-xs text-muted-foreground">OG Description</Label>
                    <textarea
                      id="ogDescription"
                      value={seo.ogDescription || ''}
                      onChange={(e) => updateSeo('ogDescription', e.target.value)}
                      className="min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="ogImageUrl" className="text-xs text-muted-foreground">OG Image URL</Label>
                    <Input
                      id="ogImageUrl"
                      value={seo.ogImageUrl || ''}
                      onChange={(e) => updateSeo('ogImageUrl', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="ogImageWidth" className="text-xs text-muted-foreground">Width</Label>
                      <Input
                        id="ogImageWidth"
                        type="number" step="any"
                        value={seo.ogImageWidth || ''}
                        onChange={(e) => updateSeo('ogImageWidth', Number(e.target.value))}
                        placeholder="1200"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="ogImageHeight" className="text-xs text-muted-foreground">Height</Label>
                      <Input
                        id="ogImageHeight"
                        type="number" step="any"
                        value={seo.ogImageHeight || ''}
                        onChange={(e) => updateSeo('ogImageHeight', Number(e.target.value))}
                        placeholder="630"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="ogImageAlt" className="text-xs text-muted-foreground">Image Alt Text</Label>
                    <Input
                      id="ogImageAlt"
                      value={seo.ogImageAlt || ''}
                      onChange={(e) => updateSeo('ogImageAlt', e.target.value)}
                      placeholder="Describe the image"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Twitter Card</Label>
                <div className="flex items-center gap-4 pl-4 border-l-2 border-border">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={seo.twitterCard === 'summary_large_image'}
                      onCheckedChange={(checked) => updateSeo('twitterCard', checked ? 'summary_large_image' : 'summary')}
                    />
                    <Label className="text-sm">Large Image</Label>
                  </div>
                </div>
                <div className="grid gap-3 pl-4 border-l-2 border-border mt-3">
                  <div className="space-y-1">
                    <Label htmlFor="twitterTitle" className="text-xs text-muted-foreground">Twitter Title</Label>
                    <Input
                      id="twitterTitle"
                      value={seo.twitterTitle || ''}
                      onChange={(e) => updateSeo('twitterTitle', e.target.value)}
                      placeholder="Title for Twitter"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="twitterDescription" className="text-xs text-muted-foreground">Twitter Description</Label>
                    <textarea
                      id="twitterDescription"
                      value={seo.twitterDescription || ''}
                      onChange={(e) => updateSeo('twitterDescription', e.target.value)}
                      className="min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="twitterImageUrl" className="text-xs text-muted-foreground">Twitter Image URL</Label>
                    <Input
                      id="twitterImageUrl"
                      value={seo.twitterImageUrl || ''}
                      onChange={(e) => updateSeo('twitterImageUrl', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 pt-4">
              <div className="flex items-start gap-2 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-yellow-700">Indexing Controls</p>
                  <p className="text-xs text-yellow-600/80">
                    Use these settings carefully. Incorrect settings can prevent pages from appearing in search results.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="text-sm">No Index</Label>
                    <p className="text-xs text-muted-foreground">Prevent page from appearing in search results</p>
                  </div>
                  <Switch
                    checked={seo.noindex || false}
                    onCheckedChange={(checked) => updateSeo('noindex', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="text-sm">No Follow</Label>
                    <p className="text-xs text-muted-foreground">Prevent search engines from following links</p>
                  </div>
                  <Switch
                    checked={seo.nofollow || false}
                    onCheckedChange={(checked) => updateSeo('nofollow', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="text-sm">No Archive</Label>
                    <p className="text-xs text-muted-foreground">Prevent page from being cached</p>
                  </div>
                  <Switch
                    checked={seo.noarchive || false}
                    onCheckedChange={(checked) => updateSeo('noarchive', checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <Label className="text-sm">No Snippet</Label>
                    <p className="text-xs text-muted-foreground">Prevent search engines from showing snippets</p>
                  </div>
                  <Switch
                    checked={seo.nosnippet || false}
                    onCheckedChange={(checked) => updateSeo('nosnippet', checked)}
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Label htmlFor="locale">Locale</Label>
                <Input
                  id="locale"
                  value={seo.locale || ''}
                  onChange={(e) => updateSeo('locale', e.target.value)}
                  placeholder="en_US"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}