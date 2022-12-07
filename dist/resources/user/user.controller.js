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
const http_exception_1 = __importDefault(require("@utils/exceptions/http.exception"));
const validation_middleware_1 = __importDefault(require("@middlewares/validation.middleware"));
const user_validation_1 = __importDefault(require("@resources/user/user.validation"));
const user_service_1 = __importDefault(require("@resources/user/user.service"));
const authenticated_middleware_1 = __importDefault(require("@middlewares/authenticated.middleware"));
class UserController {
    constructor() {
        this.path = "/users";
        this.router = (0, express_1.Router)();
        this.UserService = new user_service_1.default();
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("req.body", req.body);
                const sesUser = yield this.UserService.registerUser(req.body);
                res.status(201).json({ sesUser, success: true });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userEmail, userPwd } = req.body;
                const sesUser = yield this.UserService.login(userEmail, userPwd);
                res.status(200).json({ sesUser, success: true });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.getUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    return next(new http_exception_1.default(200, "No logged in user"));
                }
                res.status(200).json({ user: req.user });
            }
            catch (error) {
                console.log(error);
            }
        });
        this.getAllUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allUser = yield this.UserService.get_All_user();
                res.json({ allUser });
            }
            catch (error) {
                next(new http_exception_1.default(400, "something wrong"));
            }
        });
        this.initialiseRoute();
    }
    initialiseRoute() {
        this.router.post(`${this.path}/register`, (0, validation_middleware_1.default)(user_validation_1.default.register), this.register);
        this.router.post(`${this.path}/login`, (0, validation_middleware_1.default)(user_validation_1.default.login), this.login);
        this.router.get(`${this.path}`, authenticated_middleware_1.default, this.getUser);
        this.router.get(`${this.path}/all_users`, this.getAllUser);
    }
}
exports.default = UserController;
