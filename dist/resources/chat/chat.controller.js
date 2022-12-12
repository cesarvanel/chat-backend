"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const chat_interface_1 = require("./chat.interface");
class ServerSocket {
    constructor(server) {
        this.OnlineUsers = [];
        this.OnlineUser = new Map();
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
        this.io.on(chat_interface_1.EVENTS.connection, (socket) => {
            console.log("socket service started");
            console.log(socket.id);
            socket.on(chat_interface_1.EVENTS.ADD_USER, (email) => {
                this.OnlineUser.set(email, socket.id);
            });
            socket.on(chat_interface_1.EVENTS.SEND_MESSAGE, (data) => {
                console.log(data);
                const sendUsersocket = this.OnlineUser.get(data.receiver);
                if (sendUsersocket) {
                    socket.to(sendUsersocket).emit(chat_interface_1.EVENTS.RECEIVE_MESSAGE, data.msg);
                }
            });
            socket.on("connect_error", (err) => {
                console.log(`connect_error due to ${err.message}`);
            });
        });
    }
}
exports.default = ServerSocket;
