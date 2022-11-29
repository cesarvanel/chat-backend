"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const create = joi_1.default.object({
    userName: joi_1.default.string().required(),
    userEmail: joi_1.default.string().email().required(),
    isAdmin: joi_1.default.boolean().required(),
    userPwd: joi_1.default.string().required(),
    userAvatar: joi_1.default.string(),
    userToken: joi_1.default.string().token().required(),
});
exports.default = { create };
