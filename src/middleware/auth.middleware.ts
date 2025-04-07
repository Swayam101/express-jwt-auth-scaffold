import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../features/user/models/user.model';
import { logger } from '../utils/logger';
import { JsonResponse } from '../utils/jsonReponse.utils';
import ERoles from '../features/auth/types/role.enum';

interface JwtPayload {
  id: string;
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return JsonResponse(res, {
        status: 'error',
        statusCode: 401,
        message: 'Not authorized, no token',
        title: 'UNAUTHORISED ACCESS',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return JsonResponse(res, {
        status: 'error',
        statusCode: 401,
        message: 'User not found',
        title: 'UNAUTHORISED ACCESS',
      });
    }

    res.locals.user = user;
    return next();
  } catch (error) {
    logger.error('Auth Middleware Error:', error);
    return JsonResponse(res, {
      status: 'error',
      statusCode: 401,
      message: 'Not authorized, token failed',
      title: 'UNAUTHORISED ACCESS',
    });
  }
};

export const checkRole = (...role: ERoles[]): RequestHandler => {
  return (_req, res, next) => {
    if (!role.includes(res.locals.user.role)) {
      return JsonResponse(res, {
        message: 'unauthorised role access',
        status: 'error',
        statusCode: 401,
        title: 'Access Forbidden',
      });
    }
    return next();
  };
};
