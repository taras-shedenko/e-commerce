import {
  CallHandler,
  NestInterceptor,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return handler.handle().pipe(
      map((resp) => {
        const res: any = { success: !!resp.data };
        if (resp.data) {
          res.data = resp.data;
          res.message = 'Success';
          if (resp.meta) res.meta = resp.meta;
        } else if (resp.error) {
          res.error = resp.error;
          res.message = resp.error.message ?? 'An error acured';
        }
        return res;
      }),
    );
  }
}
