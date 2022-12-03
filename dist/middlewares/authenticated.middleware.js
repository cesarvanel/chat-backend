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
const token_1 = require("@utils/interfaces/token");
const user_models_1 = __importDefault(require("@resources/user/user.models"));
const http_exception_1 = __importDefault(require("@utils/exceptions/http.exception"));
const jsonwebtoken_1 = require("jsonwebtoken");
const authenticatedMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith("Bearer ")) {
        return next(new http_exception_1.default(401, 'UnAuthorised'));
    }
    const accessToken = bearer.split("Bearer ")[1].trim();
    try {
        const payload = yield (0, token_1.VerifyToken)(accessToken);
        if (payload instanceof jsonwebtoken_1.JsonWebTokenError) {
            return next(new http_exception_1.default(401, 'UnAuthorised'));
        }
        const user = yield user_models_1.default.findById(payload.id).select('-userPwd').exec();
        if (!user) {
            return next(new http_exception_1.default(401, 'UnAuthorised'));
        }
        req.user = user;
    }
    catch (error) {
        return next(new http_exception_1.default(401, 'UnAuthorised'));
    }
});
exports.default = authenticatedMiddleware;
