import mongoose from "mongoose";

const UserSchema =mongoose.Schema({
    username:{
       type:String,
       required:true,
       unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
     type:String,
     unique:true
    },
    role:{
        type:String,
        enum:['admin','vendor','staff','user'],
        default:'user'

    },
    vendorAssigned:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})


export const User = mongoose.model('User',UserSchema);