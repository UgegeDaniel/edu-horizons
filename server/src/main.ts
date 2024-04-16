import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { LogLevel, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const allLogMessages = [];

// Custom logger that extends Nest's default Logger class
class CustomLogger implements LoggerService {
  error(message: any, ...optionalParams: any[]) {}
  warn(message: any, ...optionalParams: any[]) {}
  debug?(message: any, ...optionalParams: any[]) {}
  verbose?(message: any, ...optionalParams: any[]) {}
  fatal?(message: any, ...optionalParams: any[]) {}
  setLogLevels?(levels: LogLevel[]) {}
  log(message: string) {
    allLogMessages.push(message);
    const mapped = allLogMessages.filter((logMessage) => logMessage.includes("Mapped"))
    const arrayOfRoutes = this.convertToObjects(mapped);
    arrayOfRoutes.forEach((route) => this.writeToRoutesFile(route))
  }

  convertToObjects(arrayOfStrings: string[]) {
  return arrayOfStrings.map(str => {
    const matches = str.match(/Mapped\s+\{([^,]+),\s*([^}]+)\}\s+route/);
    if (matches && matches.length === 3) {
      return { endpoint: matches[1].trim(), method: matches[2].trim() };
    } else {
      return { endpoint: '', method: '' };
    }
  });
}

  private writeToRoutesFile(route: { endpoint: string; method: string }) {
    const routesFilePath = path.join(__dirname, '..', 'src', 'routes.json');
    let existingRoutes: { appRoutes: { endpoint: string; method: string }[] } = { appRoutes: [] };

    try {
      const existingContent = fs.readFileSync(routesFilePath, 'utf-8');
      existingRoutes = JSON.parse(existingContent);
    } catch (error) {
      // File doesn't exist or is empty, which is okay for initial state
    }

    // Check if the route already exists in appRoutes
    const isRouteExists = existingRoutes.appRoutes.some(existingRoute =>
      existingRoute.method === route.method && existingRoute.endpoint === route.endpoint
    );

    // If the route doesn't exist, add it
    if (!isRouteExists) {
      existingRoutes.appRoutes.push(route);

      // Write the updated content back to the file
      fs.writeFileSync(routesFilePath, JSON.stringify(existingRoutes, null, 2));
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  const corsOptions: CorsOptions = {
    origin: true,
    credentials: true,
  };
  app.enableCors(corsOptions);
  app.use(cookieParser());
  const port = 5000;
  console.log(`App bootstrapped successfully and running on Port: ${port}`);
  await app.listen(port);
}
bootstrap();
