import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as cookieParser from 'cookie-parser';
import CustomLogger from './custom-logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: true,
    credentials: true,
  };
  app.enableCors(corsOptions);
  app.use(cookieParser());
  app.useLogger(new CustomLogger());
  const port = 5000;
  console.log(`App bootstrapped successfully and running on Port: ${port}`);
  await app.listen(port);
}
bootstrap();
