import Controller from "@utils/interfaces/controller.interface";
import { Router, Request, Response, NextFunction } from "express";
import { chatMessage } from "./message.interface";
import MessageService from "./message.service";
import HttpException from "@utils/exceptions/http.exception";

class MessageController implements Controller {
  public path = "/msg";
  public router = Router();
  private MessageService = new MessageService();

  constructor() {
    this.initialiseRoute();
  }

  private initialiseRoute = (): void => {
    this.router.post(`${this.path}/addMessage`, this.addMessage);

    this.router.get(`${this.path}/getMessage`, this.getMessage);
  };

  private addMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { msg, users, sender, receiver } = req.body;
      const Msg = await this.MessageService.addMessage(
        msg,
        sender,
        users,
        receiver
      );
      res.status(201).json({ success: true, Msg });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getMessage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { sender, receiver } = req.query;
      const Msg = await this.MessageService.getMessage(sender, receiver);
      if (!Msg) {
        res.status(400).json({ error: "pas de message desole" });
      }
      res.status(200).json({ data: Msg, success: true });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default MessageController;
