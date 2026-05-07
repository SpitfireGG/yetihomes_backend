// logger.middleware.ts
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') ?? '';
    const startTime = Date.now();

    const safeHeaders = this.sanitizeHeaders(req.headers);

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - startTime;
      const contentLength = res.get('content-length');

      this.logger.log({
        method,
        url: originalUrl,
        statusCode,
        duration: `${duration}ms`,
        contentLength,
        ip,
        userAgent,
        headers: safeHeaders,
      });
    });

    next();
  }

  // do not expose the keys udring logging

  private sanitizeHeaders(headers: Record<string, any>) {
    const REDACTED = '[REDACTED]';
    const sensitive = ['authorization', 'cookie', 'x-api-key'];
    const result = { ...headers };
    for (const key of sensitive) {
      if (result[key]) result[key] = REDACTED;
    }
    return result;
  }
}
