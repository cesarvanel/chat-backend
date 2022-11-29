import { Request, Response, NextFunction } from "express";
import HttpException from "@utils/exceptions/http.exception";

const errorMilleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next:NextFunction
): void => {
  const status = error.status || 500;
  const message = error.message || "Something wrong";

  res.status(status).send({ status: status, message: message });
};

export default errorMilleware; 