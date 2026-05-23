import { PrismaService } from "../../../prisma/prisma.service";
export declare class AmenitiesController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            createdAt: Date;
            slug: string;
            icon: string | null;
        }[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: {
            id: string;
            name: string;
            createdAt: Date;
            slug: string;
            icon: string | null;
        };
    }>;
    create(createAmenityDto: {
        name: string;
        icon?: string;
    }): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            id: string;
            name: string;
            createdAt: Date;
            slug: string;
            icon: string | null;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
