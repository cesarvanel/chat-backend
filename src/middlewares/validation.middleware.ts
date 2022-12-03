import { Request, Response, NextFunction, RequestHandler } from "express";
import Joi, { Schema } from "joi";

const validationMiddleWare = (schema: Schema): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const validationOptions = {
      abortEarly: false,
      allowUnKnown: true,
      stripUnKnown: true,
    };
    try {
      const value = await schema.validateAsync(req.body, validationOptions);
      req.body = value;
      next();
    } catch (e: any) {
      const errors: string[] = [];
      e.details.forEach((error: Joi.ValidationErrorItem) => {
        errors.push(error.message);
      });

      res.status(400).json({ errors: errors });
    }
  };
};

export default validationMiddleWare;
