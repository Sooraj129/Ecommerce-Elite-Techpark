import { emailRegex } from "../Constant/constant.js";
import { User } from "../Models/user.models.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../util/generateToken.js";

export const postSignup =async (req,res)=>{
    const{username,email,password,role}=req.body;
    try{
        if(!username){
            res.status(400).json({
                Success:false,
                message:"username is required"});
        }
        if(!email){
            res.status(400).json({
                Success:false,
                message:"email is required"});
        }
        if(!password){
            res.status(400).json({
                Success:false,
                message:"password is required"});
        }
        if(!role){
            res.status(400).json({
                Success:false,
                message:"role is required"})
        }

        if(!emailRegex.test(email)){
            res.status(400).json({
                success:false,
                message:"email is not valid"
            })
        }

        const existingUser =await User.findOne({username})
        if(existingUser){
            res.status(400).json({
                success:false,
                message:"username already exist"
            })
        }

        const existingMail =await User.findOne({email})
        if(existingMail){
            res.status(400).json({
                success:false,
                message:"email already exist"
            })
        }
        const hashPassword = await bcryptjs.hash(password,10);
        const newUser =new User({
            username,
            email,
            password:hashPassword,
            role 
        });
        console.log("new user created",newUser);

        if(newUser){
            await newUser.save();{
                generateToken(res,newUser._id);
                res.status(201).json({
                    success:true,
                    User:{
                        ...newUser._doc,
                        password:undefined
                    }
                })
            }
        }
    }

    catch(error){
      console.log("error in signup",error); 
      res.status(500).json({
        success:false,
        message:"internal server error"
      })
    }
}


export const postLogin =async (req,res)=>{
    const{email,password}=req.body;
    try{
        if(!email){
            res.status(400).json({
                success:false,
                message:"please provide the email"
            })
        }
        if(!password){
            res.status(400).json({
                success:false,
                message:"please provide the password"
            })
        }

        if(!emailRegex.test(email)){
            res.status(400).json({
                success:false,
                message:"email is not valid"
            })
        }

        const user =await User.findOne({email});
        if(!user){
            res.status(400).json({
                success:false,
                message:"user not found"
            })
        }

        const isMatch =await bcryptjs.compare(password,user.password);
        if(!isMatch){
            res.status(400).json({
                success:false,
                message:"Password not match"
            })
        }
        generateToken(res,user._id);
        res.status(200).json({
            success:true,
            User:{
                ...user.doc,
                password:undefined
            }
        })
         
    }
    catch(error){
         res.status(500).json({
            success:false,
            message:"internal server error"
         })
    }
}



 export const postLogout =async(req,res)=>{
        try{
            res.clearCookie("jwt-token");
            res.status(200).json({
                success:true,
                message:"log out successfully"
            })

        }
        catch(error){
            res.status(500).json({
                success:false,
                message:"internal server error"
        })
    }
}