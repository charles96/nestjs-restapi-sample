import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TraceIdInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TraceIdInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const className = context.getClass().name;
    const methodName = context.getHandler().name;
    const traceId = uuidv4();

    response.setHeader('x-trace-id', traceId);
    (request as any).traceId = traceId;

    this.logger.debug(`[${className}][${methodName}][${traceId}][ENTRY]`);

    return next
      .handle()
      .pipe(
        tap(() => this.logger.debug(`[${className}][${methodName}][${traceId}][ESCAPE]`))
      );
  }
}