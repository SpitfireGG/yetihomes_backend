import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { FingerprintService } from "./fingerprint.service";

const COOKIE_NAME = "yh_vid";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 2 * 1000;

@Injectable()
export class VisitorCookieMiddleware implements NestMiddleware {
  constructor(private readonly fp: FingerprintService) {}

  use(req: Request, res: Response, next: NextFunction) {
    let visitorId = req.cookies?.[COOKIE_NAME];

    if (!visitorId) {
      visitorId = this.fp.generateVisitorId();
      const isProd = process.env.NODE_ENV === "production";
      res.cookie(COOKIE_NAME, visitorId, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      });
    }

    (req as any).visitorId = visitorId;
    next();
  }
}