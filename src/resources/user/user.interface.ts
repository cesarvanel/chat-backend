import { Document } from "mongoose";

interface User extends Document {

    userName:string,
    userEmail:string, 
    userPwd:string,

    isValidPassword(password :string):Promise<Error | Boolean >

}

export default User; 