"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageModels_1 = __importDefault(require("./messageModels"));
class MessageService {
    constructor() {
        this.Models = messageModels_1.default;
        this.addMessage = (msg, sender, users, receiver) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Models.create({
                    message: { text: msg },
                    users: [users],
                    sender: sender,
                    receiver: receiver
                });
                return data;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getMessage = (sender, receiver) => __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield this.Models.find({ sender: sender, receiver: receiver });
                const projetMessage = messages.map((msg) => {
                    return {
                        fromMe: msg.sender === sender,
                        message: msg.message.text
                    };
                });
                return projetMessage;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = MessageService;
