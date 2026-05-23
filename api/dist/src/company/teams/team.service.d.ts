import { PrismaService } from "../../prisma/prisma.service";
import { CreateTeamMemberDto } from './dto/create-teams.dto';
import { UpdateTeamMemberDto } from './dto/update-teams.dto';
import { SlugService } from "../../modules/seo/services/slug.service";
export declare class TeamService {
    private readonly prisma;
    private readonly slugService;
    constructor(prisma: PrismaService, slugService: SlugService);
    create(dto: CreateTeamMemberDto & {
        thumbnail?: string;
        image?: string;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        email: string;
        role: string;
        location: string;
        bio: string;
        expertise: string[];
        education: string;
        seoMetadataId: string | null;
        thumbnail: string | null;
        image: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        email: string;
        role: string;
        location: string;
        bio: string;
        expertise: string[];
        education: string;
        seoMetadataId: string | null;
        thumbnail: string | null;
        image: string | null;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        email: string;
        role: string;
        location: string;
        bio: string;
        expertise: string[];
        education: string;
        seoMetadataId: string | null;
        thumbnail: string | null;
        image: string | null;
    }>;
    update(id: string, dto: UpdateTeamMemberDto & {
        thumbnail?: string;
        image?: string;
    }): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        email: string;
        role: string;
        location: string;
        bio: string;
        expertise: string[];
        education: string;
        seoMetadataId: string | null;
        thumbnail: string | null;
        image: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        email: string;
        role: string;
        location: string;
        bio: string;
        expertise: string[];
        education: string;
        seoMetadataId: string | null;
        thumbnail: string | null;
        image: string | null;
    }>;
}
