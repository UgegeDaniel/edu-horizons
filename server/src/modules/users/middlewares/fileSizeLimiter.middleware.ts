import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class FileSizeLimiterMiddleware implements NestMiddleware {
  constructor(private readonly maxSize: number) {}

  use(req: Request, res: Response, next: NextFunction) {
    const fileNames = Object.keys(req.files);
    for (const fileName of fileNames) {
      if (req.files[fileName].size > this.maxSize) {
        return res.status(400).json({ status: 'error', message: 'File size exceeds the allowed limit.' });
      }
    }
    next();
  }
}
