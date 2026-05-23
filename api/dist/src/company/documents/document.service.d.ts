import { PrismaService } from "../../prisma/prisma.service";
import { LegalDocType } from '@prisma/client';
import { CreateLegalDocumentDto } from './dtos/create-document.dto';
export declare class LegalDocumentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateLegalDocumentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.LegalDocType;
        content: string | null;
        version: string | null;
        effectiveDate: Date | null;
        isActive: boolean;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.LegalDocType;
        content: string | null;
        version: string | null;
        effectiveDate: Date | null;
        isActive: boolean;
    }[]>;
    findByType(type: LegalDocType): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.LegalDocType;
        content: string | null;
        version: string | null;
        effectiveDate: Date | null;
        isActive: boolean;
    }>;
    update(id: string, dto: CreateLegalDocumentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.LegalDocType;
        content: string | null;
        version: string | null;
        effectiveDate: Date | null;
        isActive: boolean;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        type: import("@prisma/client").$Enums.LegalDocType;
        content: string | null;
        version: string | null;
        effectiveDate: Date | null;
        isActive: boolean;
    }>;
}
