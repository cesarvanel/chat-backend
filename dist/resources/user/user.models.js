"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        auto: true
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    userPwd: {
        type: String,
        required: true,
    },
    userAvatar: {
        type: String,
        required: false,
    },
    userToken: {
        type: String,
        required: true
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', UserSchema);
