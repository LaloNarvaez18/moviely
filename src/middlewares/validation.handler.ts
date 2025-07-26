import { Request, Response, NextFunction } from 'express';
import { ZodObject } from 'zod';

export const handleSchema = (
  schema: ZodObject,
  property: 'body' | 'query'
) => {
  return ( req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[property];
      schema.parse(data);
      next();
    } catch (err: any) {
      next(err)
    }
  }
}
