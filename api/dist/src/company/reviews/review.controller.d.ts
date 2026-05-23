import { ReviewsService } from './review.service';
export declare class ReviewsController {
    private readonly reviewsService;
    constructor(reviewsService: ReviewsService);
    create(dataString: string, files: Express.Multer.File[]): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isFeatured: boolean;
            role: string;
            image: string | null;
            text: string;
            rating: number;
        };
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
    findOne(id: string): Promise<{
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
    update(id: string, dataString: string, files: Express.Multer.File[]): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            isFeatured: boolean;
            role: string;
            image: string | null;
            text: string;
            rating: number;
        };
    }>;
    remove(id: string): Promise<{
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
