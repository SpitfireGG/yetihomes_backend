import { PrismaService } from "../../prisma/prisma.service";
import { CreateInquiryDto } from './dtos/create-enquiries.dto';
import { UpdateInquiryStatusDto } from './dtos/update-enquiries.dto';
export declare class InquiriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateInquiryDto): Promise<{
        id: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.InquiryStatus;
        propertyId: string | null;
        message: string;
        email: string | null;
        type: import("@prisma/client").$Enums.InquiryType;
        fullName: string;
    }>;
    findAll(): Promise<({
        property: {
            title: string;
            slug: string;
            listingType: import("@prisma/client").$Enums.ListingType;
            propertyType: import("@prisma/client").$Enums.PropertyType;
        } | null;
    } & {
        id: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.InquiryStatus;
        propertyId: string | null;
        message: string;
        email: string | null;
        type: import("@prisma/client").$Enums.InquiryType;
        fullName: string;
    })[]>;
    findOne(id: string): Promise<{
        property: {
            title: string;
            slug: string;
            listingType: import("@prisma/client").$Enums.ListingType;
            propertyType: import("@prisma/client").$Enums.PropertyType;
        } | null;
    } & {
        id: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.InquiryStatus;
        propertyId: string | null;
        message: string;
        email: string | null;
        type: import("@prisma/client").$Enums.InquiryType;
        fullName: string;
    }>;
    updateStatus(id: string, dto: UpdateInquiryStatusDto): Promise<{
        id: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.InquiryStatus;
        propertyId: string | null;
        message: string;
        email: string | null;
        type: import("@prisma/client").$Enums.InquiryType;
        fullName: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.InquiryStatus;
        propertyId: string | null;
        message: string;
        email: string | null;
        type: import("@prisma/client").$Enums.InquiryType;
        fullName: string;
    }>;
}
