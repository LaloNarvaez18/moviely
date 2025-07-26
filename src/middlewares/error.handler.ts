import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

export const handleZodError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    res.status(400).json({
      errors: err.issues.map(issue => {
        return { field: issue.path[0], message: issue.message }
      })
    });
  }

  next(err);
}

const handlePrismaOrmError = (err: Error, req: Request, res: Response, next: NextFunction) => {

}
