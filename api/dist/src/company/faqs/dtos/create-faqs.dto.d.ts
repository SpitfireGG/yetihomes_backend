import { FaqCategory } from '@prisma/client';
export declare class CreateFaqDto {
    question: string;
    answer: string;
    category?: FaqCategory;
    sortOrder?: number;
    isPublished?: boolean;
}
