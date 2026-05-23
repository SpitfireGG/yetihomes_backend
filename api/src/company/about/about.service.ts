import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyInfoDto } from './dtos/create-about-dto';
import { UpdateCompanyInfoDto } from './dtos/update-about-dto';

@Injectable()
export class CompayInfoService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyInfoDto: CreateCompanyInfoDto) {
    return this.prisma.companyInfo.create({
      data: createCompanyInfoDto,
    });
  }
  async findAll() {
    return this.prisma.companyInfo.findMany();
  }
  async findOne(id: string) {
    const companyInfo = await this.prisma.companyInfo.findUnique({
      where: { id },
    });
    if (!companyInfo) {
      throw new NotFoundException(
        `company information not found with id -> ${id}`,
      );
    }
    return companyInfo;
  }
  async update(id: string, updateCompanyInfoDto: UpdateCompanyInfoDto) {
    await this.findOne(id);
    return this.prisma.companyInfo.update({
      where: { id },
      data: updateCompanyInfoDto,
    });
  }
  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.companyInfo.delete({
      where: { id },
    });
  }
}
