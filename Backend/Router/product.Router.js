import express from "express";
import { authorizeRoles, verifyToken } from "../Middleware/auth.js";
import { createProduct, getAllProducts, getStaffProducts, getVendorProducts, searchProducts } from "../Controller/product.controller.js";


const productRouter =express.Router();

productRouter.post("/admin",verifyToken,authorizeRoles("admin"),createProduct);
productRouter.post("/createvendor",verifyToken,authorizeRoles("vendor"),createProduct);
productRouter.post("/createstaff",verifyToken,authorizeRoles("staff"),createProduct);
productRouter.get("/getstaffproducts",verifyToken,authorizeRoles("staff"),getStaffProducts);
productRouter.get("/getvendorproducts",verifyToken,getVendorProducts);
productRouter.get("/getallproducts",verifyToken,getAllProducts);
productRouter.get("/search",verifyToken,searchProducts);


export default productRouter;
