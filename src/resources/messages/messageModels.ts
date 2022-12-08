import { ChatRoom } from "../chat/chat.interface";
import { model, Schema, Types } from "mongoose";


const messageSchema = new Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: new Date().toLocaleDateString(),
      },
    },
    users: Array,
    sender: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Messages", messageSchema);
