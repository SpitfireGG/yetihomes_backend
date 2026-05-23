import { AffiliationsService } from './affilation.service';
import { CreateAffiliationDto } from './dto/create-affilations.dto';
export declare class AffiliationsController {
    private readonly affiliationsService;
    constructor(affiliationsService: AffiliationsService);
    getPublicAffiliations(): Promise<{
        src: string;
        alt: string;
    }[]>;
    findAllAdmin(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        logoUrl: string;
        displayOrder: number;
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
