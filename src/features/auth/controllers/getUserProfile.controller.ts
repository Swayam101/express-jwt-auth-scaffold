import { Request, Response } from 'express';
import { JsonResponse } from '../../../utils/jsonReponse.utils';

export default async (_: Request, res: Response) => {
  const currentUser = res.locals.user;

  return JsonResponse(res, {
    status: 'success',
    statusCode: 200,
    title: '',
    message: '',
    data: currentUser,
  });
};
