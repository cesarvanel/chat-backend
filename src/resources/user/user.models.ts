import { model, Schema} from "mongoose";
import User from '@resources/user/user.interface'; 

const UserSchema = new Schema({
    userName:{
        type:String, 
        required:true
    },
    userEmail:{
        type:String,
        required:true,
        trim:true, 
        unique:true



    },
    isAdmin:{
        type:Boolean, 
        required:true
    }, 
    userPwd:{
        type:String, 
        required:true, 
    },

    userAvatar:{
        type:String, 
        required:false,
    },
    userToken:{
        type:String, 
        required:true
    }
}, {timestamps:true})

export default model<User>('User', UserSchema); 
