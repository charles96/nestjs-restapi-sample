import { LoggerService, ExecutionContext } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export class CustomLogger implements LoggerService {
  private logger: winston.Logger;
  private context: string;

  constructor(context: string) {
    this.context = context;
    this.logger = winston.createLogger({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const { serverName, className, methodName, traceId } = meta;
          return `[${timestamp}] [${level}] [${serverName || 'Unknown'}] [${className || 'Unknown'}] [${methodName || 'Unknown'}] [${traceId || 'Unknown'}] : ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    });
  }

  private getCallerInfo() {
    const stack = new Error().stack;
    if (!stack) return { className: 'Unknown', methodName: 'Unknown' };

    const stackLines = stack.split('\n');
    const callerLine = stackLines[3]; // 호출 스택에서 적절한 라인을 선택
    const match = callerLine.match(/at (\w+) \((.*):(\d+):(\d+)\)/);

    if (match) {
      const methodName = match[1];
      const className = match[2].split('/').pop()?.replace('.ts', '') || 'Unknown';
      return { className, methodName };
    }

    return { className: 'Unknown', methodName: 'Unknown' };
  }

  log(message: string, context: ExecutionContext, meta: Record<string, any> = {}) {
    const methodName = context.getHandler().name;

    this.logger.info(message + methodName, { ...meta, className: this.context, methodName });
  }

  error(message: string, context: ExecutionContext,  trace: string, meta: Record<string, any> = {}) {
    const methodName = context.getHandler().name;
    this.logger.error(message + methodName, { ...meta, trace, className: this.context, methodName });
  }

  warn(message: string, meta: Record<string, any> = {}) {
    const { methodName } = this.getCallerInfo();
    this.logger.warn(message, { ...meta, className: this.context, methodName });
  }

  debug(message: string, meta: Record<string, any> = {}) {
    const { methodName } = this.getCallerInfo();
    this.logger.debug(message, { ...meta, className: this.context, methodName });
  }

  verbose(message: string, meta: Record<string, any> = {}) {
    const { methodName } = this.getCallerInfo();
    this.logger.verbose(message, { ...meta, className: this.context, methodName });
  }
}