import { ChatRoom } from "../chat.interface";

import { model, Schema, Types } from "mongoose";

const chatRoomSchema = new Schema({
  chatroom: {
    type: Types.ObjectId,
    required: true,
    ref: "ChatRoom",
  },
  user: {
    type: Types.ObjectId,
    required: true,
    ref: "User",
  },

  message: {
    type: String,
    required: true,
    date: {
      type: Date,
      default: Date.now,
      required:false
    },
  },
});

export default model("chatRoom", chatRoomSchema);
