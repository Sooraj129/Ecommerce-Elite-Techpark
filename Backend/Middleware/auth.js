import jwt from "jsonwebtoken";


import dotenv from "dotenv";
import { User } from "../Models/user.models.js";

dotenv.config();

 export const verifyToken =async(req,res,next) =>{
    const token =req.cookies["jwt-token"];

    if(!token){
        return res.status(403).json({
            success:false,
            message:"access denied  no token provided"
        })
    }
    try{
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(403).json({
                success:false,
                message:"invalid token"
            })
        }
        const user =await User.findById(decoded.userId);
        console.log(user,"decodedId");

        if(!user){
            res.status(400).json({
                success:false,
                message:"user not found"
            })
        }
        req.user= user;
        next();

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
}

export const authorizeRoles =(...allowedRoles) =>(req,res,next) =>{
    if(!req.user || !allowedRoles.includes(req.user.role)){
        return res.status(403).json({
            success:false,
            message:"Unauthorized Access"
        })
}
 next();
}