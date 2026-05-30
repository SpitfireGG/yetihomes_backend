import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContactInfoDto } from './dto/create-contact-info.dto';
import { UpdateContactInfoDto } from './dto/update-contact-info.dto';
import { CreateSocialMediaDto } from './dto/create-social-media.dto';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto';

@Injectable()
export class ContactInfoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContactInfoDto) {
    return this.prisma.contactInfo.create({ data: dto });
  }

  async findAll() {
    return this.prisma.contactInfo.findMany();
  }

  async findOne(id: string) {
    const info = await this.prisma.contactInfo.findUnique({ where: { id } });
    if (!info) {
      throw new NotFoundException(`Contact info not found with id -> ${id}`);
    }
    return info;
  }

  async update(id: string, dto: UpdateContactInfoDto) {
    await this.findOne(id);
    return this.prisma.contactInfo.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.contactInfo.delete({ where: { id } });
  }

  async createSocialMedia(dto: CreateSocialMediaDto) {
    return this.prisma.socialMedia.create({ data: dto });
  }

  async findAllSocialMedia() {
    return this.prisma.socialMedia.findMany();
  }

  async findOneSocialMedia(id: string) {
    const sm = await this.prisma.socialMedia.findUnique({ where: { id } });
    if (!sm) {
      throw new NotFoundException(`Social media not found with id -> ${id}`);
    }
    return sm;
  }

  async updateSocialMedia(id: string, dto: UpdateSocialMediaDto) {
    await this.findOneSocialMedia(id);
    return this.prisma.socialMedia.update({ where: { id }, data: dto });
  }

  async deleteSocialMedia(id: string) {
    await this.findOneSocialMedia(id);
    return this.prisma.socialMedia.delete({ where: { id } });
  }
}
