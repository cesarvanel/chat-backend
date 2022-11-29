import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import Controller from "@utils/interfaces/controller.interface";
import ErrorMiddleWare from "@middlewares/error.middleware";
import helmet from "helmet";
import mongoose from "mongoose";

class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.port = port;
    this.express = express();

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
      `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.nyyzhoy.mongodb.net/?retryWrites=true&w=majority`
    );
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Chat Backend is listenenig on port ${this.port}`);
    });
  }
}

export default App;
