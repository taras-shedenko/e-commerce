import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const excResp = exception.getResponse();
    const res: any = {
      success: false,
      message: typeof excResp === 'string' ? excResp : excResp['message'],
    };
    const resp = host.switchToHttp().getResponse<Response>();
    resp.status(exception.getStatus()).json(res);
  }
}
