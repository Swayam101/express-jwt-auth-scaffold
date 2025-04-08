import { Request, Response } from 'express';
import { logger } from '../../../utils/logger';
import userFeat from '../../user';
import services from '../services';
import { JsonResponse } from '../../../utils/jsonReponse.utils';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body;

    const userExists = await userFeat.dao.getUserByEmail(email);

    if (userExists) {
      return JsonResponse(res, {
        status: 'error',
        statusCode: 400,
        message: 'User already exists',
        title: 'DUPLICATE USER',
      });
    }

    const user = await userFeat.dao.createUser({ email, password, name, role: 'user' });
    const { password: _, ...currentUser } = user.toObject();

    const token = services.jwtService.generateJwtToken(user._id.toString());

    return JsonResponse(res, {
      status: 'success',
      statusCode: 200,
      message: 'User login successfull',
      title: 'USER AUTHENTICATION',
      data: {
        user: currentUser,
        token,
      },
    });
  } catch (error) {
    logger.error('Register Error:', error);
    return JsonResponse(res, {
      status: 'error',
      statusCode: 500,
      message: 'Server error',
      title: 'INTERNAL SERVER ERROR',
    });
  }
};
