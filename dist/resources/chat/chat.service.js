"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageModels_1 = __importDefault(require("../messages/messageModels"));
class ChatService {
    constructor() {
        this.msgSchema = messageModels_1.default;
    }
}
