import { PrismaService } from "../../prisma/prisma.service";
import { CreateFaqDto } from './dtos/create-faqs.dto';
import { UpdateFaqsDto } from './dtos/update-faqs.dto';
export declare class FaqService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateFaqDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        sortOrder: number;
        question: string;
        answer: string;
        category: import("@prisma/client").$Enums.FaqCategory;
        isPublished: boolean;
    }>;
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
