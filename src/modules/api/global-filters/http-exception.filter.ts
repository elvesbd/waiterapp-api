import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private configService: ConfigService) {}

  private logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const isProduction = this.configService.getOrThrow<string>('NODE_ENV');
    this.logger.error(`Exception: ${exception.message}, status: ${status}`);

    response.status(status).json(
      isProduction
        ? {
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: exception.message,
          }
        : {
            statusCode: status,
            timestamp: new Date().toISOString(),
            message: exception.message,
            stackTrace: exception.stack,
          },
    );
  }
}
