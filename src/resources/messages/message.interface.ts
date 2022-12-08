import User from "@resources/user/user.interface";

export interface chatMessage extends Document {
  message: Object;
  users: Object;
  sender: Object;
}
