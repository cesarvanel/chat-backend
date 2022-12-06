"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    message: {
        text: {
            type: String,
            required: true,
        },
        date: Date.now(),
    },
    users: Array,
    sender: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("chatRoom", messageSchema);
