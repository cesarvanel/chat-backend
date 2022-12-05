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
const user_models_1 = __importDefault(require("@resources/user/user.models"));
const token_1 = __importDefault(require("@utils/interfaces/token"));
class UserService {
    constructor() {
        this.User = user_models_1.default;
        /**
         * register e new user
         * @param data
         * @returns a token
         */
        this.registerUser = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.User.create(data);
                const accessToken = token_1.default.CreateToken(user);
                const sesUser = Object.assign(Object.assign({}, data), { accessToken });
                return sesUser;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.login = (userEmail, userPwd) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.User.findOne({ userEmail });
                if (!user) {
                    throw new Error("Enable to find the user with this user Address");
                }
                const isValid = yield user.isValidPassword(userPwd);
                if (isValid) {
                    return token_1.default.CreateToken(user);
                }
                else {
                    throw new Error("Wrong credentials given");
                }
            }
            catch (error) {
                throw new Error("enable to login user");
            }
        });
        this.update_profile = (userAvatar) => __awaiter(this, void 0, void 0, function* () { });
    }
}
exports.default = UserService;
