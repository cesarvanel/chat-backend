"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENTS = void 0;
exports.EVENTS = {
    connection: "connection",
    disconnect: "disconnect",
    CLIENT: {
        CREATE_ROOM: "CREATE_ROOM",
        JOIN_ROOM: "JOIN_ROOM",
        SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    },
    SERVER: {
        ROOM: "ROOM",
        JOINED_ROOM: "JOINED_ROOM",
        ROOM_MESSAGE: "ROOM_MESSAGE",
    },
};
