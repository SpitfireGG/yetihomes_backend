import { LegalDocType } from '@prisma/client';
import { LegalDocumentService } from './document.service';
import { CreateLegalDocumentDto } from './dtos/create-document.dto';
export declare class LegalDocumentController {
    private readonly legalDocumentService;
    constructor(legalDocumentService: LegalDocumentService);
    create(createLegalDocumentDto: CreateLegalDocumentDto): Promise<{
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
    update(id: string, updateLegalDocumentDto: CreateLegalDocumentDto): Promise<{
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
export declare class TermsController {
    private readonly legalDocumentService;
    constructor(legalDocumentService: LegalDocumentService);
    find(): Promise<{
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
}
export declare class PrivacyController {
    private readonly legalDocumentService;
    constructor(legalDocumentService: LegalDocumentService);
    find(): Promise<{
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
}
export declare class CookieController {
    private readonly legalDocumentService;
    constructor(legalDocumentService: LegalDocumentService);
    find(): Promise<{
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
}
