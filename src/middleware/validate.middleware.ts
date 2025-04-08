import { Request, Response, NextFunction } from 'express';
import { AnyObjectSchema } from 'yup';
import { JsonResponse } from '../utils/jsonReponse.utils';

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
      return JsonResponse(res, {
        status: 'error',
        statusCode: 400,
        message: (error as Error).message,
        title: 'VALIDATION ERROR',
      });
    }
  };
};
