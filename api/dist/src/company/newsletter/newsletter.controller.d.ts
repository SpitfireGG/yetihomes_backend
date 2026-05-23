import { NewsletterService } from './newsletter.service';
import { CreateNewsletterDto } from './dtos/create-newsletter.dto';
import { UpdateNewsletterDto } from './dtos/update-newsletter.dto';
export declare class NewsletterController {
    private readonly newsletterService;
    constructor(newsletterService: NewsletterService);
    create(createNewsletterDto: CreateNewsletterDto): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        country: string | null;
        source: string | null;
        subscribed: boolean;
    }>;
    findAll(): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        country: string | null;
        source: string | null;
        subscribed: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        country: string | null;
        source: string | null;
        subscribed: boolean;
    }>;
    update(id: string, updateNewsletterDto: UpdateNewsletterDto): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        country: string | null;
        source: string | null;
        subscribed: boolean;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        country: string | null;
        source: string | null;
        subscribed: boolean;
    }>;
}
