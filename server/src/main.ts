import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as cookieParser from 'cookie-parser';
import CustomLogger from './custom-logger';
import { CommandModule, CommandService } from 'nestjs-command';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const corsOptions: CorsOptions = {
    origin: true,
    credentials: true,
  };
  app.enableCors(corsOptions);
  app.useLogger(new CustomLogger());
  try {
    await app.select(CommandModule).get(CommandService).exec();
    await app.close();
  } catch (error) {
    console.error(error);
    await app.close();
    process.exit(1);
  }  const port = 5000;
  console.log(`App bootstrapped successfully and running on Port: ${port}`);
  await app.listen(port);
}
bootstrap();
