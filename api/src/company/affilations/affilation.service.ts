import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAffiliationDto } from './dto/create-affilations.dto';

@Injectable()
export class AffiliationsService {
  constructor(private prisma: PrismaService) {}

  async getPublicAffiliations() {
    const affiliations = await this.prisma.affiliation.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
    });

    return affiliations.map((partner) => ({
      src: partner.logoUrl,
      alt: partner.name,
    }));
  }

  async create(createAffiliationDto: CreateAffiliationDto) {
    return this.prisma.affiliation.create({
      data: createAffiliationDto,
    });
  }

  async findAllAdmin() {
    return this.prisma.affiliation.findMany({
      orderBy: { displayOrder: 'asc' },
    });
  }

  async findOne(id: string) {
    const affiliation = await this.prisma.affiliation.findUnique({
      where: { id },
    });
    if (!affiliation)
      throw new NotFoundException(`Affiliation with ID ${id} not found`);
    return affiliation;
  }

  async update(id: string, updateAffiliationDto: CreateAffiliationDto) {
    await this.findOne(id); // Ensure it exists
    return this.prisma.affiliation.update({
      where: { id },
      data: updateAffiliationDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.affiliation.delete({
      where: { id },
    });
  }
}
