import { ChatRoom } from "../chat.interface";

import { model, Schema, Types } from "mongoose";

const messageSchema = new Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
      date: Date.now(),
    },
    users: Array,
    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("chatRoom", messageSchema);
