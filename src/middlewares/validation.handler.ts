import { Request, Response, NextFunction } from 'express';
import { ZodObject } from 'zod';

const validateRequestSchema = (
  schema: ZodObject,
  property: 'body' | 'query' | 'params'
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[property];
      const result = schema.parse(data);
      req[property] = result;
      next();
    } catch (err: any) {
      next(err);
    }
  };
};

export default validateRequestSchema;
