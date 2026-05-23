import { LegalDocType } from '@prisma/client';
export declare class CreateLegalDocumentDto {
    type: LegalDocType;
    title: string;
    content?: string;
    version?: string;
    effectiveDate?: string;
    isActive?: boolean;
}
