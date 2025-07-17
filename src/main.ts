import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/ResponseInterceptor';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { QueryFailedExceptionFilter } from './common/exception-filters/queryFailed-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new QueryFailedExceptionFilter(),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
