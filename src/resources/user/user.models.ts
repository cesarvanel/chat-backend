import { model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import User from "@resources/user/user.interface";
import { v4 as uuidv4 } from "uuid";
const UserSchema: Schema<User> = new Schema(
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
      default:false
    },
    userPwd: {
      type: String,
      required: true,
    },

    userAvatar: {
      type: String,
      required: false,
      trim:true,
      default:''
    },
    userToken: {
      type: String,
      required: false,
      default: uuidv4(),
    },
  },
  { timestamps: true }
);



UserSchema.pre<User>("save", async function (next) {
  if (!this.isModified("userPwd")) {
    return next();
  }

  const hash = await bcrypt.hash(this.userPwd, 10);
  this.userPwd = hash;

  next();
});

UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | Boolean> {
  return await bcrypt.compare(password, this.userPwd);
};

export default model<User>("User", UserSchema);
