import type { NextFunction, Request, Response } from 'express';
import type { ZodType } from 'zod';

/** Validates req.body against a Zod schema; replaces body with the parsed result. */
export function validateBody(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: {
          message: 'Validation failed',
          code: 'validation_error',
          details: result.error.issues.map((i) => ({
            path: i.path.join('.'),
            message: i.message,
          })),
        },
      });
      return;
    }
    req.body = result.data;
    next();
  };
}
