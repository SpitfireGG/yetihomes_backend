import { InquiriesService } from './enquiries.service';
import { CreateInquiryDto } from './dtos/create-enquiries.dto';
import { UpdateInquiryStatusDto } from './dtos/update-enquiries.dto';
export declare class InquiriesController {
    private readonly inquiriesService;
    constructor(inquiriesService: InquiriesService);
    create(createInquiryDto: CreateInquiryDto): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
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
    updateStatus(id: string, updateInquiryStatusDto: UpdateInquiryStatusDto): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    delete(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
