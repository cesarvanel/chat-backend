import { Document } from "mongoose";

interface User extends Document {

    userName:string,
    userEmail:string, 
    isAdmin:boolean, 
    userPwd:string,
    userAvatar:string,
    userToken:string, 

    isValidPassword(password :string):Promise<Error | Boolean >

}

export default User; 