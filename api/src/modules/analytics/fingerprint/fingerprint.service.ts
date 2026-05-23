import { Injectable } from "@nestjs/common";
import { createHash, randomBytes } from "crypto";
import { Request } from "express";

@Injectable()
export class FingerprintService {
  generateFingerprint(req: Request): string {
    const signals = [
      this.getClientIp(req),
      req.headers["user-agent"] ?? "",
      req.headers["accept-language"] ?? "",
      req.headers["accept-encoding"] ?? "",
      req.headers["sec-ch-ua"] ?? "",
      req.headers["sec-ch-ua-platform"] ?? "",
    ].join("|");

    return createHash("sha256").update(signals).digest("hex").slice(0, 32);
  }

  hashIp(req: Request): string {
    const ip = this.getClientIp(req);
    const salt = process.env.IP_HASH_SALT ?? "change-me";
    return createHash("sha256").update(ip + salt).digest("hex").slice(0, 32);
  }

  generateVisitorId(): string {
    return randomBytes(16).toString("hex");
  }

  private getClientIp(req: Request): string {
    const forwarded = req.headers["x-forwarded-for"];
    if (typeof forwarded === "string") {
      return forwarded.split(",")[0].trim();
    }
    return req.ip ?? req.socket?.remoteAddress ?? "unknown";
  }
}