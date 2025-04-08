import { Request, Response } from 'express';
import { JsonResponse } from '../../../utils/jsonReponse.utils';
import dao from '../dao';

export default async (req: Request, res: Response) => {
  const { page, limit } = req.query

  const users = await dao.getAllUsers({ role: "user" }, { page: parseInt(page?.toString() ?? "1"), limit: parseInt(limit?.toString() ?? "10") });

  return JsonResponse(res, {
    status: 'success',
    statusCode: 200,
    title: 'USER ADMIN',
    message: 'users fetched successfully',
    data: users,
  });
};
