import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNewsletterDto } from './dtos/create-newsletter.dto';
import { UpdateNewsletterDto } from './dtos/update-newsletter.dto';
import { EmailService } from 'src/utils/email/email.service';

@Injectable()
export class NewsletterService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateNewsletterDto) {
    const existing = await this.prisma.newsletter.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('This email is already subscribed.');
    }

    const subscriber = await this.prisma.newsletter.create({ data: dto });

    this.emailService.sendNewsletterSubscriptionEmail(dto.email, dto.name);
    this.emailService.sendSubscriptionConfirmationEmail(dto.email, dto.name);

    return subscriber;
  }

  async findAll() {
    return this.prisma.newsletter.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const subscriber = await this.prisma.newsletter.findUnique({
      where: { id },
    });
    if (!subscriber) throw new NotFoundException('Subscriber not found.');
    return subscriber;
  }

  async update(id: string, dto: UpdateNewsletterDto) {
    await this.findOne(id);
    return this.prisma.newsletter.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.newsletter.delete({ where: { id } });
  }
}
