import { model, Schema, Types} from "mongoose";
import bcrypt from 'bcrypt';
import User from '@resources/user/user.interface'; 

const UserSchema : Schema<User> = new Schema({
    _id:{
        type:Types.ObjectId, 
        required:true,
        auto:true
    },
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
