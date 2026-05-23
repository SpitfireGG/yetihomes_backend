import { Request } from "express";
export declare class FingerprintService {
    generateFingerprint(req: Request): string;
    hashIp(req: Request): string;
    generateVisitorId(): string;
    private getClientIp;
}
