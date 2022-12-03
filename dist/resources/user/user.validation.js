"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const register = joi_1.default.object({
    userName: joi_1.default.string().required(),
    userEmail: joi_1.default.string().email().required(),
    userPwd: joi_1.default.string().required(),
});
const login = joi_1.default.object({
    userEmail: joi_1.default.string().required(),
    userPwd: joi_1.default.string().required(),
});
exports.default = { register, login };
