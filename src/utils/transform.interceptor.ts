import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  message: string;
  statusCode: number;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => {
        return {
          timestamp: new Date().toISOString(),
          success: true,
          message: data?.message || 'All Response fetched successfully.',
          statusCode: statusCode,
          data: data !== null && typeof data === 'object' && 'data' in data ? data.data : data,
          ...(data !== null && typeof data === 'object' && 'meta' in data ? { meta: data.meta } : {}),
        };
      }),
    );
  }
}
