import { Controller, All, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';

@Controller()
export class FallbackController {
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
