import type { NextFunction, Request, Response } from 'express';
import { ApiError } from '../lib/errors.js';
import { env } from '../config/env.js';

export function notFoundHandler(_req: Request, res: Response) {
  res.status(404).json({ error: { message: 'Not found' } });
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ error: { message: err.message, code: err.code } });
    return;
  }
  console.error('[api] unhandled error:', err);
  res.status(500).json({
    error: { message: env.isProduction ? 'Internal server error' : String(err) },
  });
}
