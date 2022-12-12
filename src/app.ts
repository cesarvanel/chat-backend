import express, { Application } from "express";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import compression from "compression";
import Controller from "@utils/interfaces/controller.interface";
import ErrorMiddleWare from "@middlewares/error.middleware";
import ServerSocket from "@resources/chat/chat.controller";
import helmet from "helmet";
import mongoose from "mongoose";

class App {
  public express: Application;
  public port: number;
  private httpServer:http.Server

  constructor(controllers: Controller[], port: number) {
    this.port = port;
    this.express = express();
    this.httpServer = http.createServer(this.express);
    new ServerSocket(this.httpServer);
    this.initialiseDatabaseConnect();
    this.initialiseMiddleWare();
    this.initialiseController(controllers);
    this.initialiseErrorHandling();
   
  }

  private initialiseMiddleWare(): void {
    this.express.use(helmet());
    this.express.use(cors({ origin: "*" }));
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
    this.express.use(express.static(path.join(__dirname, "uploads")));
    
  }

  private initialiseController(controllers: Controller[]): void {
    controllers.forEach((controller: Controller) => {
      this.express.use("/api", controller.router);
    });
  }

  private initialiseErrorHandling(): void {
    this.express.use(ErrorMiddleWare);
  }

  private async initialiseDatabaseConnect(): Promise<void> {
    const { MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER } = process.env;
    await mongoose.connect(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.nyyzhoy.mongodb.net/chatApp?retryWrites=true&w=majority`
    );

    console.log("successfully connect");
  }

  public listen(): void {
    this.httpServer.listen(this.port, () => {
      console.log(`Chat Backend is listenenig on port ${this.port}`);
    });
  }
}

export default App;
