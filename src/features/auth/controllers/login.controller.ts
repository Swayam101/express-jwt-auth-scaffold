import { Request, Response } from 'express';
// import { logger } from '../../../utils/logger';
import userFeat from '../../user';
import { JsonResponse } from '../../../utils/jsonReponse.utils';
import auth from '..';

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await userFeat.dao.verifyUserCredentials({ email, password });
    if (!user) {
      return JsonResponse(res, {
        status: 'error',
        statusCode: 400,
        message: 'Invalid credentials',
        title: 'UNAUTHORISED ACCESS',
      });
    }

    const token = auth.services.jwtService.generateJwtToken(user._id.toString());
    const { password: _, ...currentUser } = user;

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
    // logger.error('Login Error:', error);
    return JsonResponse(res, {
      status: 'error',
      statusCode: 500,
      message: 'Server error',
      title: 'INTERNAL SERVER ERROR',
    });
  }
};
