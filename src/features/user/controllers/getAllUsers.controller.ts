import { Request, Response } from 'express';
import { JsonResponse } from '../../../utils/jsonReponse.utils';
import dao from '../dao';

export default async (_: Request, res: Response) => {
  const users = await dao.getAllUsers();

  return JsonResponse(res, {
    status: 'success',
    statusCode: 200,
    title: 'USER ADMIN',
    message: 'users fetched successfully',
    data: users,
  });
};
