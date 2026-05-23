import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
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

    next();
  }
}