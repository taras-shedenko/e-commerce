import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const res: any = {
      success: false,
      message: exception['message'],
    };
    const resp = host.switchToHttp().getResponse<Response>();
    resp.status(HttpStatus.UNPROCESSABLE_ENTITY).json(res);
  }
}
