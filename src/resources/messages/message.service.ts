import messageModels from "./messageModels";
import { chatMessage } from "./message.interface";

class MessageService {
  public Models = messageModels;

  public addMessage = async (
    msg: string,
    sender: string,
    users: []
  ): Promise<object | Error> => {
    try {
      const data = await this.Models.create({
        message: { text: msg },
        users: [users],
        sender: sender,
      });
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  public getMessage = async (
    sender: any,
    receiver: any
  ): Promise<Error | any> => {
    try {
      const messages = await this.Models.find({users:{$all:[sender,receiver]}})
      const projetMessage = messages.map((msg:any) =>{
        return{
          fromMe:msg.sender === sender,
          message:msg.message.text
        }
      })
      return projetMessage;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}

export default MessageService;
