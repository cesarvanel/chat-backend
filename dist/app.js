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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const compression_1 = __importDefault(require("compression"));
const error_middleware_1 = __importDefault(require("@middlewares/error.middleware"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
class App {
    constructor(controllers, port) {
        this.port = port;
        this.express = (0, express_1.default)();
        this.initialiseDatabaseConnect();
        this.initialiseMiddleWare();
        this.initialiseController(controllers);
        this.initialiseErrorHandling();
    }
    initialiseMiddleWare() {
        this.express.use((0, helmet_1.default)());
        this.express.use((0, cors_1.default)({ origin: "*" }));
        this.express.use((0, morgan_1.default)("dev"));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        this.express.use((0, compression_1.default)());
        this.express.use(express_1.default.static(path_1.default.join(__dirname, "uploads")));
    }
    initialiseController(controllers) {
        controllers.forEach((controller) => {
            this.express.use("/api", controller.router);
        });
    }
    initialiseErrorHandling() {
        this.express.use(error_middleware_1.default);
    }
    initialiseDatabaseConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            const { MONGO_USER, MONGO_PASSWORD, MONGO_CLUSTER } = process.env;
            yield mongoose_1.default.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.nyyzhoy.mongodb.net/chatApp?retryWrites=true&w=majority`);
            console.log('successfully connect');
        });
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`Chat Backend is listenenig on port ${this.port}`);
        });
    }
}
exports.default = App;
