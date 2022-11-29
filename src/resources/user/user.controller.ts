import { Router, Request, Response, NextFunction } from "express";
import Controller from "@utils/interfaces/controller.interface";
import HttpException from "@utils/exceptions/http.exception";
import validationMiddleWare from "@middlewares/validation.middleware";
import validateUser from "@resources/user/user.validation";
import UserService from "@resources/user/user.service";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private UserService = new UserService()

  constructor() {
    this.initialiseRoute();

  }

  private initialiseRoute(): void {
    this.router.post(`${this.path}`, validationMiddleWare(validateUser.create));
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
        const user = await this.UserService.createUser(req.body)
        res.status(201).json({user}); 
    } catch (error: any) {
        next(new HttpException(400, error.message))
    }
  };
}

export default UserController
