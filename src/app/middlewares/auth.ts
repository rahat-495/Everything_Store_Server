
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import config from '../config';
import { userModel } from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;
    
    if (!req.cookies?.accessToken) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not Authorized!');
    }

    const decoded = jwt.verify( token, config.jwtAccessSecret as string ) as JwtPayload;

    const user = await userModel.findOne({ $or : [ { email : decoded?._doc?.email } , { phone : decoded?._doc?.phone } ] });

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }

    const isActiveStatus = user?.isActive;

    if (isActiveStatus === false) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is deactivated !!');
    }

    if (requiredRole && !requiredRole.includes(decoded?._doc?.role)) {
      throw new AppError(StatusCodes.FORBIDDEN, 'You are not authorized');
    }
    req.user = decoded as JwtPayload & { role: string };

    next();
  });
};

export default auth;
