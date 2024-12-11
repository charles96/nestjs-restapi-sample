import { Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export abstract class BaseController {
    protected readonly logger = new Logger(this.constructor.name);

    protected setTraceId(
        req: any, 
        traceId?: string
    ): string {
        return traceId || req.traceId || uuidv4();
    }
}