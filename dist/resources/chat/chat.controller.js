"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class ServerSocket {
    constructor(server) {
        this.OnlineUsers = [];
        this.Online = new Map();
        ServerSocket.instance = this;
        this.OnlineUsers = [];
        this.io = new socket_io_1.Server(server, {
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
}
exports.default = ServerSocket;
