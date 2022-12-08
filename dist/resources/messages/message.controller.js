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
const express_1 = require("express");
const message_service_1 = __importDefault(require("./message.service"));
const http_exception_1 = __importDefault(require("@utils/exceptions/http.exception"));
class MessageController {
    constructor() {
        this.path = "/msg";
        this.router = (0, express_1.Router)();
        this.MessageService = new message_service_1.default();
        this.initialiseRoute = () => {
            this.router.post(`${this.path}/addMessage`, this.addMessage);
            this.router.get(`${this.path}/getMessage`, this.getMessage);
        };
        this.addMessage = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { msg, users, sender } = req.body;
                const Msg = yield this.MessageService.addMessage(msg, sender, users);
                res.status(201).json({ success: true, Msg });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.getMessage = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { sender, receiver } = req.query;
                const Msg = yield this.MessageService.getMessage(sender, receiver);
                if (!Msg) {
                    res.status(400).json({ error: "pas de message desole" });
                }
                res.status(200).json({ data: Msg, success: true });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.initialiseRoute();
    }
}
exports.default = MessageController;
