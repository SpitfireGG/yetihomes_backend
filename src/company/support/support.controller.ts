import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ContactService } from './support.service';
import { CreateTicketDto } from './dto/create-support.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('ticket')
  @HttpCode(HttpStatus.CREATED)
  async createTicket(@Body() createTicketDto: CreateTicketDto) {
    const ticket =
      await this.contactService.createSupportTicket(createTicketDto);

    return {
      success: true,
      message:
        'Support ticket submitted successfully. We will be in touch soon!',
      data: ticket,
    };
  }

  @Get('tickets')
  getAllTickets() {
    return this.contactService.getAllTickets();
  }
}
