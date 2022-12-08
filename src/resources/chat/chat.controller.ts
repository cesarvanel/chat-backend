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
  

  public users: { [uid: string]: string };

  constructor(server: HTTPSever) {
    ServerSocket.instance = this;
    this.users = {};
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
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
    this.io.on(EVENTS.connection, this.listener);
    console.log("socket service started")
    
  }

  listener = (socket: Socket) => {
    console.info("Message from socket", socket.id);
    
    socket.on('handshake', ()=>{
        console.log("hanshake received with", socket.id)
    })

    socket.on(EVENTS.disconnect, () => {
      console.info("Disconnect received from", socket.id);
    });
  };
}

export default ServerSocket;
