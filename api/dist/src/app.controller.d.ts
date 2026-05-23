import { PrismaService } from './prisma/prisma.service';
export declare class AppController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getApiHealth(): Promise<{
        status: string;
        description: string;
        version: string;
        database: string;
        timestamp: string;
    }>;
}
