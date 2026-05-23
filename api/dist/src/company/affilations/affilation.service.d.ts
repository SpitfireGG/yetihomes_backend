import { PrismaService } from "../../prisma/prisma.service";
import { CreateAffiliationDto } from './dto/create-affilations.dto';
export declare class AffiliationsService {
    private prisma;
    constructor(prisma: PrismaService);
    getPublicAffiliations(): Promise<{
        src: string;
        alt: string;
    }[]>;
    create(createAffiliationDto: CreateAffiliationDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        logoUrl: string;
        displayOrder: number;
    }>;
    findAllAdmin(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        logoUrl: string;
        displayOrder: number;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        logoUrl: string;
        displayOrder: number;
    }>;
    update(id: string, updateAffiliationDto: CreateAffiliationDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        logoUrl: string;
        displayOrder: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        logoUrl: string;
        displayOrder: number;
    }>;
}
