import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token missing');
    }

    if (authHeader !== 'Bearer my-sample-token') {
      throw new UnauthorizedException('Invalid token');
    }

    next();
  }

}