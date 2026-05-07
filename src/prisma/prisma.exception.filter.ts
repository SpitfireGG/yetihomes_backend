import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: unknown[] | null = null;

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.BAD_REQUEST;
        const metaAny = exception.meta as any;

        const target =
          metaAny?.target ??
          metaAny?.driverAdapterError?.cause?.constraint?.index ??
          'unknown';

        message = `Duplicate value for field(s): ${target}`;
        errors = [target];
        break;

      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid foreign key: related record does not exist';
        break;

      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = `Record not found`;
        break;

      default:
        message = exception.message;
        break;
    }

    return response.status(status).json({
      statusCode: status,
      error: 'Bad Request',
      message: message,
      details: errors,
    });
  }
}
