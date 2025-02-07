import mongoose from "mongoose";

export  const connectDB = async() =>{
   try{
    const conn =await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
   }
   catch(error){
    console.error("error connceting mongodb" +error.message);
    process.exit(1);
   }
}


export const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;