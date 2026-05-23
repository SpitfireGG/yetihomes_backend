import { FaqService } from './faq.service';
import { UpdateFaqsDto } from './dtos/update-faqs.dto';
import { CreateFaqDto } from './dtos/create-faqs.dto';
export declare class FaqsController {
    private readonly faqService;
    constructor(faqService: FaqService);
    create(createFaqDto: CreateFaqDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sortOrder: number;
        question: string;
        answer: string;
        category: import("@prisma/client").$Enums.FaqCategory;
        isPublished: boolean;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sortOrder: number;
        question: string;
        answer: string;
        category: import("@prisma/client").$Enums.FaqCategory;
        isPublished: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sortOrder: number;
        question: string;
        answer: string;
        category: import("@prisma/client").$Enums.FaqCategory;
        isPublished: boolean;
    } | null>;
    update(id: string, updateFaqsDto: UpdateFaqsDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sortOrder: number;
        question: string;
        answer: string;
        category: import("@prisma/client").$Enums.FaqCategory;
        isPublished: boolean;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sortOrder: number;
        question: string;
        answer: string;
        category: import("@prisma/client").$Enums.FaqCategory;
        isPublished: boolean;
    }>;
}
