import { LogLevel, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const allLogMessages = [];

class CustomLogger implements LoggerService {
  error(message: any, ...optionalParams: any[]) {
    console.log(message);
  }
  warn(message: any, ...optionalParams: any[]) {
    console.log(message);
  }
  debug?(message: any, ...optionalParams: any[]) {
    console.log(message);
  }
  verbose?(message: any, ...optionalParams: any[]) {
    console.log(message);
  }
  fatal?(message: any, ...optionalParams: any[]) {
    console.log(message);
  }
  setLogLevels?(levels: LogLevel[]) {}
  log(message: string) {
    allLogMessages.push(message);
    const mapped = allLogMessages.filter((logMessage) =>
      logMessage.includes('Mapped'),
    );
    const arrayOfRoutes = this.convertToObjects(mapped);
    arrayOfRoutes.forEach((route) => this.writeToRoutesFile(route));
  }

  convertToObjects(arrayOfStrings: string[]) {
    return arrayOfStrings.map((str) => {
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
    let existingRoutes: { appRoutes: { endpoint: string; method: string }[] } =
      { appRoutes: [] };
    try {
      const existingContent = fs.readFileSync(routesFilePath, 'utf-8');
      existingRoutes = JSON.parse(existingContent);
    } catch (error) {}
    const isRouteExists = existingRoutes.appRoutes.some(
      (existingRoute) =>
        existingRoute.method === route.method &&
        existingRoute.endpoint === route.endpoint,
    );
    if (!isRouteExists) {
      existingRoutes.appRoutes.push(route);
      fs.writeFileSync(routesFilePath, JSON.stringify(existingRoutes, null, 2));
    }
  }
}

export default CustomLogger;
