import { CompayInfoService } from './about.service';
import { CreateCompanyInfoDto } from './dtos/create-about-dto';
import { UpdateCompanyInfoDto } from './dtos/update-about-dto';
export declare class CompanyInfoController {
    private readonly companyInfoService;
    constructor(companyInfoService: CompayInfoService);
    create(createCompanyInfoDto: CreateCompanyInfoDto): Promise<{
        id: string;
        name: string;
        description: string;
        mission: string | null;
        vision: string | null;
        contactEmail: string | null;
        phone: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        latitude: import("@prisma/client-runtime-utils").Decimal | null;
        longitude: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        description: string;
        mission: string | null;
        vision: string | null;
        contactEmail: string | null;
        phone: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        latitude: import("@prisma/client-runtime-utils").Decimal | null;
        longitude: import("@prisma/client-runtime-utils").Decimal | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        description: string;
        mission: string | null;
        vision: string | null;
        contactEmail: string | null;
        phone: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        latitude: import("@prisma/client-runtime-utils").Decimal | null;
        longitude: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
    update(id: string, updateCompanyInfoDto: UpdateCompanyInfoDto): Promise<{
        id: string;
        name: string;
        description: string;
        mission: string | null;
        vision: string | null;
        contactEmail: string | null;
        phone: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        latitude: import("@prisma/client-runtime-utils").Decimal | null;
        longitude: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        description: string;
        mission: string | null;
        vision: string | null;
        contactEmail: string | null;
        phone: string | null;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        latitude: import("@prisma/client-runtime-utils").Decimal | null;
        longitude: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
}
