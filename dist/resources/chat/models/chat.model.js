"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chatRoomSchema = new mongoose_1.Schema({
    chatroom: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "ChatRoom",
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "User",
    },
    message: {
        type: String,
        required: true,
        date: {
            type: Date,
            default: Date.now,
            required: false
        },
    },
});
exports.default = (0, mongoose_1.model)("chatRoom", chatRoomSchema);
