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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
/*onst UserSchema: Schema<User> = new Schema(
  {
    userName: {
      type: String,
      trim: true,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
    userPwd: {
      type: String,
      required: true,
    },

    userAvatar: {
      type: String,
      required: false,
      trim:true
    },
    userToken: {
      type: String,
      required: false,
      default: uuidv4(),
    },
  },
  { timestamps: true }
);*/
const UserSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        trim: true,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    userPwd: {
        type: String,
        required: true,
    },
}, { timestamps: true });
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("userPwd")) {
            return next();
        }
        const hash = yield bcrypt_1.default.hash(this.userPwd, 10);
        this.userPwd = hash;
        next();
    });
});
UserSchema.methods.isValidPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.userPwd);
    });
};
exports.default = (0, mongoose_1.model)("User", UserSchema);
