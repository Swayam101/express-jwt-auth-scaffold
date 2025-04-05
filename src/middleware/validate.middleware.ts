import { Request, Response, NextFunction } from 'express';
import { AnyObjectSchema } from 'yup';

export const validate = (schema: AnyObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }
}