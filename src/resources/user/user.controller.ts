import { Router, Request, Response, NextFunction } from "express";
import Controller from "@utils/interfaces/controller.interface";
import HttpException from "@utils/exceptions/http.exception";
import validationMiddleWare from "@middlewares/validation.middleware";
import validateUser from "@resources/user/user.validation";
import UserService from "@resources/user/user.service";
import authenticated from "@middlewares/authenticated.middleware";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private UserService = new UserService();

  constructor() {
    this.initialiseRoute();
  }

  private initialiseRoute(): void {
    this.router.post(
      `${this.path}/register`,
      validationMiddleWare(validateUser.register),
      this.register
    );

    this.router.post(
      `${this.path}/login`,
      validationMiddleWare(validateUser.login),
      this.login
    );

    this.router.get(`${this.path}`, authenticated, this.getUser);

    this.router.get(`${this.path}/all_users`, this.getAllUser);
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      console.log("req.body", req.body);
      const sesUser = await this.UserService.registerUser(req.body);
      res.status(201).json({ sesUser, success: true });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { userEmail, userPwd } = req.body;
      const sesUser = await this.UserService.login(userEmail, userPwd);
      res.status(200).json({ sesUser, success: true });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      if (!req.user) {
        return next(new HttpException(200, "No logged in user"));
      }
      res.status(200).json({ user: req.user });
    } catch (error) {
      console.log(error);
    }
  };

  private getAllUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const allUser = await this.UserService.get_All_user();
      res.json({ allUser });
    } catch (error) {
      next(new HttpException(400, "something wrong"));
    }
  };
}

export default UserController;
