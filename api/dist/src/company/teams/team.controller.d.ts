import { TeamService } from './team.service';
export declare class TeamController {
    private readonly teamService;
    constructor(teamService: TeamService);
    create(dataString: string, files: Express.Multer.File[]): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
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
    findOne(id: string): Promise<{
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
    update(id: string, dataString: string, files: Express.Multer.File[]): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    remove(id: string): Promise<{
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
