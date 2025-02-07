 import mongoose from 'mongoose';

 const productSchema =new mongoose.Schema({
    name:{
           type:String,
           required:true 
    },
    description:{
        type:String,

    },
    category:{
        type:String
    },
    priceOld:{
        type:Number,
        required:true
    },
    priceNew:{
        type:Number,
        required:true
    },
    scheduledStartDate:{
        type:Date,
        required:true
    },
    expiryDate:{
        type:Date,
        required:true
    },
    vendor:{
       type:mongoose.Schema.Types.ObjectId, ref:"User"
    },
    images:[String],
    freeDelivery:{
        type:Boolean,
        default:false
    },
    deliveryAmount:{
        type:Number,
        default:0
    },
    url:{
        type:String,
        unique:true
    }

 },{timestamps:true})

 export const Product = mongoose.model("Product",productSchema)   //Can view and add Products for assigned vendors. 
 