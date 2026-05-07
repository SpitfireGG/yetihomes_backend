import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-support.dto';
import { EmailService } from 'src/utils/email/email.service';

@Injectable()
export class ContactService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async createSupportTicket(dto: CreateTicketDto) {
    try {
      const ticket = await this.prisma.supportTicket.create({
        data: dto,
      });

      this.emailService.sendSupportTicketNotificationEmail(
        dto.name,
        dto.email,
        dto.subject,
        dto.message,
      );

      return ticket;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to submit support ticket.',
      );
    }
  }

  async getAllTickets() {
    return this.prisma.supportTicket.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
