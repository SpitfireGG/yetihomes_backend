import { NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { FingerprintService } from "./fingerprint.service";
export declare class VisitorCookieMiddleware implements NestMiddleware {
    private readonly fp;
    constructor(fp: FingerprintService);
    use(req: Request, res: Response, next: NextFunction): void;
}
