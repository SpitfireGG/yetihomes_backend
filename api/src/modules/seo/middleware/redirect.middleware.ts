import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RedirectMiddleware.name);

  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.method !== 'GET') {
      return next();
    }

    try {
      const path = req.path;

      const redirect = await this.prisma.redirectRule.findFirst({
        where: {
          sourceUrl: path,
          isActive: true,
        },
        select: {
          targetUrl: true,
          redirectType: true,
        },
      });

      if (redirect) {
        await this.prisma.redirectRule.updateMany({
          where: { sourceUrl: path },
          data: {
            hitCount: { increment: 1 },
            lastHitAt: new Date(),
          },
        });

        const statusCode = redirect.redirectType === 'PERMANENT' ? 301 : 302;
        return res.redirect(statusCode, redirect.targetUrl);
      }
    } catch (error) {
      this.logger.error(`Redirect middleware error: ${(error as Error).message}`);
    }

    next();
  }
}