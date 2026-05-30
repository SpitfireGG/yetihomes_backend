import { Controller, All, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { Public } from 'src/modules/auth/public.decorator';

@Controller()
export class FallbackController {
  @Public()
  @All('*path')
  fallback(@Req() req: Request, @Res() res: Response) {
    res.status(404).json({
      statusCode: 404,
      error: 'Not Found',
      message: `Route ${req.method} ${req.url} not found`,
      timestamp: new Date().toISOString(),
    });
  }
}
