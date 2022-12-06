"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const chat_interface_1 = require("./chat.interface");
class ServerSocket {
    constructor(server) {
        this.listener = (socket) => {
            console.info("Message from socket", socket.id);
            socket.on('handshake', () => {
                console.log("hanshake received with", socket.id);
            });
            socket.on(chat_interface_1.EVENTS.disconnect, () => {
                console.info("Disconnect received from", socket.id);
            });
        };
        ServerSocket.instance = this;
        this.users = {};
        this.io = new socket_io_1.Server(server, {
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
        this.io.on(chat_interface_1.EVENTS.connection, this.listener);
        console.log("socket service started");
    }
}
exports.default = ServerSocket;
