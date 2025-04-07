import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

import userFeat from '../../user';

import { logger } from '../../../utils/logger';
import ERoles from '../types/role.enum';
import { JsonResponse } from '../../../utils/jsonReponse.utils';
import services from '../services';

interface JwtPayload {
  id: string;
}

export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
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

    const decoded = services.jwtService.verifyJwtToken(token) as JwtPayload;
    const user = await userFeat.dao.getUserById(new ObjectId(decoded.id));

    if (!user) {
      return JsonResponse(res, {
        status: 'error',
        statusCode: 401,
        message: 'User not found',
        title: 'UNAUTHORISED ACCESS',
      });
    }

    const { password: _, ...currentUser } = user.toObject();

    res.locals.user = currentUser;
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

export const checkRoleAccess =
  (...roles: ERoles[]) =>
  (_req: Request, res: Response, next: NextFunction) => {
    const currentUserRole = res.locals.user.role;

    if (roles.includes(currentUserRole)) {
      return next();
    } else {
      return JsonResponse(res, {
        status: 'error',
        statusCode: 401,
        message: 'Access Forbidden',
        title: 'UNAUTHORISED ACCESS',
      });
    }
  };
