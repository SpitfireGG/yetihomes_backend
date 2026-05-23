import { InquiryType } from '@prisma/client';
export declare class CreateInquiryDto {
    propertyId?: string;
    type?: InquiryType;
    fullName: string;
    email?: string;
    phone?: string;
    message: string;
}
