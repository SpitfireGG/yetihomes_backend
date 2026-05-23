import { PrismaService } from "../../prisma/prisma.service";
import { CreateReviewDto } from './dto/create-reviews.dto';
import { UpdateReviewDto } from './dto/update-reviews.dto';
export declare class ReviewsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateReviewDto & {
        image?: string;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isFeatured: boolean;
        role: string;
        image: string | null;
        text: string;
        rating: number;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isFeatured: boolean;
        role: string;
        image: string | null;
        text: string;
        rating: number;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isFeatured: boolean;
        role: string;
        image: string | null;
        text: string;
        rating: number;
    }>;
    update(id: string, dto: UpdateReviewDto & {
        image?: string;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isFeatured: boolean;
        role: string;
        image: string | null;
        text: string;
        rating: number;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isFeatured: boolean;
        role: string;
        image: string | null;
        text: string;
        rating: number;
    }>;
}
