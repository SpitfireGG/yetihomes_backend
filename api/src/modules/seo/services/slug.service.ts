import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { isReservedSlug } from '../dto/seo-metadata.dto';

const nepaliToLatin: Record<string, string> = {
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'i', 'उ': 'u', 'ऊ': 'u',
  'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
  'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng',
  'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'n',
  'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
  'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
  'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
  'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'w',
  'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h',
  'ा': 'a', 'ि': 'i', 'ी': 'i', 'ु': 'u', 'ू': 'u',
  'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
  'ं': 'n', 'ः': 'h', '्': '',
  ' ': '-', '।': '.',
};

@Injectable()
export class SlugService {
  constructor(private prisma: PrismaService) {}

  slugify(input: string, options?: { maxLength?: number }): string {
    const maxLength = options?.maxLength || 80;
    
    let normalized = input.normalize('NFD').normalize('NFC');
    
    let slug = '';
    for (const char of normalized) {
      const latin = nepaliToLatin[char];
      if (latin) {
        slug += latin;
      } else if (char.charCodeAt(0) > 127) {
        continue;
      } else {
        slug += char;
      }
    }
    
    slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    slug = slug.toLowerCase();
    slug = slug.replace(/['"]/g, '');
    slug = slug.replace(/[^a-z0-9\s-]/g, '');
    slug = slug.replace(/[\s_]+/g, '-');
    slug = slug.replace(/-+/g, '-');
    slug = slug.replace(/^-|-$/g, '');
    
    if (slug.length > maxLength - 5) {
      slug = slug.substring(0, maxLength - 5);
      slug = slug.replace(/-[^-]*$/, '');
    }
    
    return slug || 'untitled';
  }

  async generatePropertySlug(params: {
    title: string;
    propertyType: string;
    city?: string;
    district?: string;
    listingType?: string;
    existingId?: string;
  }): Promise<string> {
    const parts: string[] = [];
    
    const bedroomMatch = params.title.match(/(\d+)\s*(bedroom|bed|bhk|bhk)/i);
    if (bedroomMatch) {
      parts.push(`${bedroomMatch[1]}-bedroom`);
    }
    
    const typeSlug = params.propertyType.toLowerCase();
    parts.push(typeSlug === 'house' ? 'house' : 
               typeSlug === 'apartment' ? 'apartment' : 
               typeSlug === 'land' ? 'land' : typeSlug);
    
    if (params.district) {
      parts.push(this.slugify(params.district));
    } else if (params.city) {
      parts.push(this.slugify(params.city));
    }
    
    if (params.listingType === 'RENT') {
      parts.push('for-rent');
    }
    
    const baseSlug = parts.join('-');
    return this.ensureUnique(baseSlug, 'Property', params.existingId);
  }

  async ensureUnique(
    baseSlug: string,
    entityType: 'Property' | 'BlogArticle' | 'LocationPage' | 'Agent' | 'PropertyTypePage' | 'StaticPage' | 'BlogCategory' | 'TeamMember',
    excludeId?: string
  ): Promise<string> {
    if (isReservedSlug(baseSlug)) {
      throw new BadRequestException(`Slug "${baseSlug}" is reserved. Choose a different one.`);
    }
    
    let slug = baseSlug;
    let counter = 0;
    
    while (true) {
      const exists = await this.checkSlugExists(slug, entityType, excludeId);
      if (!exists) {
        return slug;
      }
      
      counter++;
      slug = `${baseSlug}-${counter}`;
      
      if (counter > 99) {
        throw new BadRequestException('Could not generate unique slug. Please provide one manually.');
      }
    }
  }

  async checkSlugExists(
    slug: string,
    entityType: string,
    excludeId?: string
  ): Promise<boolean> {
    switch (entityType) {
      case 'Property':
        const property = await this.prisma.property.findFirst({
          where: excludeId ? { slug, id: { not: excludeId } } : { slug },
          select: { id: true },
        });
        return !!property;
        
      case 'BlogArticle':
        const article = await this.prisma.blogArticle.findFirst({
          where: excludeId ? { slug, id: { not: excludeId } } : { slug },
          select: { id: true },
        });
        return !!article;
        
      case 'LocationPage':
        const location = await this.prisma.locationPage.findFirst({
          where: excludeId ? { slug, id: { not: excludeId } } : { slug },
          select: { id: true },
        });
        return !!location;
        
      case 'Agent':
        const agent = await this.prisma.agent.findFirst({
          where: excludeId ? { slug, id: { not: excludeId } } : { slug },
          select: { id: true },
        });
        return !!agent;
        
      case 'PropertyTypePage':
        const page = await this.prisma.propertyTypePage.findFirst({
          where: excludeId ? { slug, id: { not: excludeId } } : { slug },
          select: { id: true },
        });
        return !!page;
        
      case 'StaticPage':
        const staticPage = await this.prisma.staticPage.findFirst({
          where: excludeId ? { slug, id: { not: excludeId } } : { slug },
          select: { id: true },
        });
        return !!staticPage;
        
      case 'BlogCategory':
        const category = await this.prisma.blogCategory.findFirst({
          where: excludeId ? { slug, id: { not: excludeId } } : { slug },
          select: { id: true },
        });
        return !!category;
        
      case 'TeamMember':
        const teamMember = await this.prisma.teamMember.findFirst({
          where: excludeId ? { slug, id: { not: excludeId } } : { slug },
          select: { id: true },
        });
        return !!teamMember;
        
      default:
        return false;
    }
  }

  async handleSlugChange(
    entityType: string,
    entityId: string,
    oldSlug: string,
    newSlug: string
  ): Promise<void> {
    if (oldSlug === newSlug) return;
    
    const existing = await this.prisma.redirectRule.findUnique({
      where: { sourceUrl: `/${oldSlug}` },
    });
    
    if (existing) {
      await this.prisma.redirectRule.update({
        where: { id: existing.id },
        data: { 
          targetUrl: `/${newSlug}`,
          updatedAt: new Date(),
        },
      });
    } else {
      await this.prisma.redirectRule.create({
        data: {
          sourceUrl: `/${oldSlug}`,
          targetUrl: `/${newSlug}`,
          redirectType: 'PERMANENT',
          isActive: true,
        },
      });
    }
    
    await this.prisma.seoAuditLog.create({
      data: {
        entityType,
        entityId,
        action: 'SLUG_CHANGE',
        newValues: { oldSlug, newSlug },
        reason: 'Admin-initiated slug change',
      },
    });
  }
}