import { PrismaService } from "../../../prisma/prisma.service";
export declare class StatsCronService {
    private prisma;
    constructor(prisma: PrismaService);
    resetDaily(): Promise<void>;
    resetWeekly(): Promise<void>;
    resetMonthly(): Promise<void>;
}
