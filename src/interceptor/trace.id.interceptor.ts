import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TraceIdInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TraceIdInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();
    const traceId = uuidv4(); // UUID를 사용하여 고유한 trace ID 생성

    response.setHeader('x-trace-id', traceId);
    (request as any).traceId = traceId;

    // 요청 정보와 traceId를 로그에 기록
    //this.logger.log(`Request to ${request.url} with traceId: ${traceId}`);

    return next.handle().pipe(
      tap(() => {
        // 응답이 완료된 후 추가 로그를 남길 수 있습니다.
        //this.logger.log(`Response from ${request.url} with traceId: ${traceId}`);
      }),
    );
  }
}