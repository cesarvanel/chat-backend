import { Request, Response, NextFunction } from "express";
import { VerifyToken } from "@utils/interfaces/token";
import userModels from "@resources/user/user.models";
import Token from "@utils/interfaces/token.interface";
import HttpException from "@utils/exceptions/http.exception";
import { JsonWebTokenError } from "jsonwebtoken";

const authenticatedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith("Bearer ")) {
    return next(new HttpException(401, 'UnAuthorised'));
  }

  const accessToken = bearer.split("Bearer ")[1].trim();

  try {
    const payload: Token | JsonWebTokenError = await VerifyToken(accessToken);
    if (payload instanceof JsonWebTokenError) {
        return next(new HttpException(401, 'UnAuthorised'));
    }

    const user = await userModels.findById(payload.id).select('-userPwd').exec();
    if(!user){
        return next(new HttpException(401, 'UnAuthorised'));
    }

    req.user = user

  } catch (error:any) {
    return next(new HttpException(401, 'UnAuthorised'));
  }
};

export default authenticatedMiddleware; 
