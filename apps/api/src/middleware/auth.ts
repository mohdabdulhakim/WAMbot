import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../lib/errors.js';
import { verifyAccessToken } from '../lib/tokens.js';

declare module 'express-serve-static-core' {
  interface Request {
    userId?: string;
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    next(ApiError.unauthorized('Missing access token', 'token_missing'));
    return;
  }
  try {
    const { sub } = verifyAccessToken(header.slice('Bearer '.length));
    req.userId = sub;
    next();
  } catch {
    next(ApiError.unauthorized('Invalid or expired access token', 'token_invalid'));
  }
}
