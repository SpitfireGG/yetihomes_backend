import { PrismaService } from "../../prisma/prisma.service";
import { CreateTicketDto } from './dto/create-support.dto';
export declare class ContactService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSupportTicket(dto: CreateTicketDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        message: string;
        email: string;
        subject: string;
    }>;
    getAllTickets(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        message: string;
        email: string;
        subject: string;
    }[]>;
}
