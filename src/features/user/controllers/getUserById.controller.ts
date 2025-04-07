import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import dao from '../dao';

import { JsonResponse } from '../../../utils/jsonReponse.utils';

export default async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return JsonResponse(res, {
      status: 'error',
      statusCode: 400,
      message: 'ID is required',
      title: 'ID REQUIRED',
    });
  }

  const users = await dao.getUserById(new ObjectId(id?.toString()));

  return JsonResponse(res, {
    status: 'success',
    statusCode: 200,
    title: 'USER ADMIN',
    message: '',
    data: users,
  });
};
