import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateTeamMemberDto } from './dto/create-teams.dto';
import { UpdateTeamMemberDto } from './dto/update-teams.dto';
import { SlugService } from 'src/modules/seo/services/slug.service';

@Injectable()
export class TeamService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly slugService: SlugService,
  ) {}

  async create(dto: CreateTeamMemberDto & { thumbnail?: string; image?: string }) {
    try {
      const slug = dto.slug || this.slugService.slugify(dto.name);
      const uniqueSlug = await this.slugService.ensureUnique(slug, 'TeamMember');
      const newMember = await this.prisma.teamMember.create({
        data: { ...dto, slug: uniqueSlug },
      });
      return newMember;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('A team member with this email already exists.');
        }
      }
      throw new InternalServerErrorException('Failed to create team member.');
    }
  }

  async findAll() {
    return this.prisma.teamMember.findMany({
      orderBy: { createdAt: 'asc' },
    });
  }

  async findById(id: string) {
    try {
      return await this.prisma.teamMember.findUniqueOrThrow({ where: { id } });
    } catch (error) {
      throw new NotFoundException(`Team member with ID ${id} not found.`);
    }
  }

  async update(
    id: string,
    dto: UpdateTeamMemberDto & { thumbnail?: string; image?: string },
  ) {
    try {
      const updatedMember = await this.prisma.teamMember.update({
        where: { id },
        data: dto,
      });
      return updatedMember;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update team member.`);
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.teamMember.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Team member ID not found -> ${id}`);
        }
      }
      throw new InternalServerErrorException(`Failed to delete team member.`);
    }
  }
}
