import { ConfigService } from '@nestjs/config';
export interface EmailOptions {
    to: string;
    subject: string;
    html: string;
    from?: string;
}
export declare class EmailService {
    private readonly configService;
    private readonly logger;
    private transporter;
    constructor(configService: ConfigService);
    sendEmail(options: EmailOptions): Promise<boolean>;
    sendNewsletterSubscriptionEmail(email: string, name?: string): Promise<boolean>;
    sendSupportTicketNotificationEmail(name: string, email: string, subject: string, message: string): Promise<boolean>;
    sendSubscriptionConfirmationEmail(email: string, name?: string): Promise<boolean>;
}
