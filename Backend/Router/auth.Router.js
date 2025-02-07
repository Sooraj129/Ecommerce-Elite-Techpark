import express from "express";
import { postLogin, postLogout, postSignup } from "../Controller/auth.controller.js";


 export const authroutes= express.Router();


authroutes.post("/Signup",postSignup);
authroutes.post("/Login",postLogin);
authroutes.post("/Logout",postLogout);

