import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import path from 'path';

@Injectable()
export class FileExtLimiterMiddleware implements NestMiddleware {
  constructor(private readonly allowedExtensions: string[]) {}

  use(req: Request, res: Response, next: NextFunction) {
    const fileNames = Object.keys(req.files);
    for (const fileName of fileNames) {
      const fileExt = path.extname(req.files[fileName].name).toLowerCase();
      if (!this.allowedExtensions.includes(fileExt)) {
        return res.status(400).json({ status: 'error', message: `File type ${fileExt} is not allowed.` });
      }
    }
    next();
  }
}
