import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./Constant/constant.js";
import { authroutes } from "./Router/auth.Router.js";
import productRouter from "./Router/product.Router.js";


const app =express();

dotenv.config();
const PORT = process.env.PORT || 5000;


console.log("MongoDb",process.env.MONGO_URL);

app.use(cors());
app.use(cookieParser());

app.use(express.json());






app.use("/api/v1/auth",authroutes);
app.use("/api/v1/product",productRouter)

app.listen((PORT),()=>{
    console.log(`The server running in ${PORT}`);
    connectDB();
})







