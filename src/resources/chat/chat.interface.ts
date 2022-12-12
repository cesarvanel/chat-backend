import User from "@resources/user/user.interface";
import { Document } from "mongoose";

export interface ChatRoom extends Document {
  name: string;
}

export const EVENTS = {
  connection: "connection",
  disconnect: "disconnect",
  ROOM: "ROOM",
  JOINED_ROOM: "JOINED_ROOM",
  ROOM_MESSAGE: "ROOM_MESSAGE",
  ADD_USER: "ADD_USER",
  SEND_MESSAGE: "SEND_MESSAGE",
  RECEIVE_MESSAGE:"RECEIVE_MESSAGE",
};

