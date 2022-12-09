import { v4 } from "uuid";
import { Socket, Server } from "socket.io";
import { Server as HTTPSever } from "http";
import { VerifyToken } from "@utils/interfaces/token";
import { JsonWebTokenError } from "jsonwebtoken";
import HttpException from "@utils/exceptions/http.exception";
import Token from "@utils/interfaces/token.interface";
import { EVENTS } from "./chat.interface";

class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;
  public OnlineUsers = [];

  constructor(server: HTTPSever) {
    ServerSocket.instance = this;
    this.OnlineUsers = [];
    this.io = new Server(server, {
      cors: { origin: "*" },
    });

    /*this.io.use(async (socket, next) => {
      if (socket.handshake.auth && socket.handshake.auth.token) {
        const token = socket.handshake.auth.token;
        const verify: Token | JsonWebTokenError = await VerifyToken(token);
        if (verify instanceof JsonWebTokenError) {
          return next(new HttpException(401, "vous n'etes pas authorize"));
        }

        next();
      }
    });*/
    this.io.on("connection", (socket) => {
      console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
    });
    console.log("socket service started");
  }

  public Online = new Map();

  /*listener = (socket: Socket) => {
    console.info("Message from socket", socket.id);
    socket.on(EVENTS.ADD_USER, (userEmail: any) => {
      this.Online.set(userEmail, socket.id);
    });

    socket.on(EVENTS.SEND_MESSAGE, (data: any) => {
      const sendUsersocket = this.Online.get(data.userEmail);
      if (sendUsersocket) {
        socket.to(sendUsersocket).emit(EVENTS.RECEIVE_MESSAGE, data.msg);
      }
    });

    socket.on(EVENTS.disconnect, () => {
      console.info("Disconnect received from", socket.id);
    });
  };*/
}

export default ServerSocket;
