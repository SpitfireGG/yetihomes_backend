import { ContactService } from './support.service';
import { CreateTicketDto } from './dto/create-support.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    createTicket(createTicketDto: CreateTicketDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            message: string;
            email: string;
            subject: string;
        };
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
