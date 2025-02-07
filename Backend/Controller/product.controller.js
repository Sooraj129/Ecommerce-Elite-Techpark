import { Product } from "../Models/products.model.js";
import { User } from "../Models/user.models.js";
import { calculateDiscount } from "../util/CalculateDiscount.js";




export const createProduct =async(req,res)=>{
    try{
        

        const{name,description,category,priceOld,priceNew,scheduledStartDate,vendor,images,freeDelivery,deliveryAmount,url}=req.body;

        let assignedVendor =vendor;
        if(req.user.role === "staff"){
            const staff =await User.findById(req.user._id);
            console.log(staff,"staff");
            if(!staff.role.includes("staff")){
                res.status(403).json({
                    success:false,
                    message:"you are not assigned to this vendor"
                })
            }   
        }
        else if(staff.role.includes("vendor")){
            assignedVendor =req.user._id
        }
    
        const expiryDate =new Date(scheduledStartDate)
        expiryDate.setDate(expiryDate.getDate() +7);

        const product =new Product({name,description,category,priceOld,priceNew,scheduledStartDate,expiryDate,vendor
            :assignedVendor,images,freeDelivery,deliveryAmount,url});
        await product.save();
        res.status(201).json({
            success:true,
            message:"product created successfully",
            product

    });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"internal server error",
            error
        })
    }
}

export const getStaffProducts = async (req, res) => {
    try {
      let filter = {};
  
      if (req.user.role === "vendor") {
        filter.vendor = req.user._id;
      } else if (req.user.role === "staff") {
        const staff = await User.findById(req.user._id);
        if (!staff || !staff.vendorAssigned || staff.vendorAssigned.length === 0) {
          return res.status(403).json({
            success: false,
            message: "You have no assigned vendors",
          });
        }
        filter.vendor = { $in: staff.vendorAssigned };
      }
  
      const products = await Product.find(filter).populate("vendor", "name"); // Get vendor name
  
      res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };
  

  export const getVendorProducts = async (req, res) => {
    try {
      if (req.user.role !== "vendor") {
        return res.status(403).json({
          success: false,
          message: "Access denied. Only vendors can view their products.",
        });
      }
  
      const products = await Product.find({ vendor: req.user._id });
  
      if (!products.length) {
        return res.status(404).json({
          success: false,
          message: "No products found for this vendor.",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Products fetched successfully.",
        products,
      });
  
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };
  
export const getAllProducts =async (req,res)=>{
    try{
        const products =await Product.find({}).populate("vendor","name");
        const formattedProducts =products.map((product) => ({
            ...product.toObject(),
            ...calculateDiscount(product.priceOld,product.priceNew)

        }))
        res.status(200).json({
            success:true,
            message:"products fetched successfully",
            products:formattedProducts
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"internal server error",
            error
        })
    }
}


export const searchProducts = async (req, res) => {
    try {
      console.log("Search query:", req.query); // Debugging log
  
      const { search, category,  page = 1, limit = 10 } = req.query;
  
      const filter = {};
  
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }
  
      if (category) {
        filter.category = category;
      }

        const pageNumber =parseInt(page,10);
        const pageSize =parseInt(limit,10);
        const skip =(pageNumber-1)*pageSize;
        const products =await Product.find(filter).skip(skip).limit(pageSize)
        console.log(products,"products");
        const totalProducts =await Product.countDocuments(filter);

        console.log(products,"products");
        res.status(200).json({
            success:true,
            message:"product fetched succesfully",
            totalPages: Math.ceil(totalProducts/pageSize),
            currentPage:pageNumber,
            totalProducts,
            products

        })

    }
    catch(error){
        res.status(500).json({  
            success:false,
            message:"internal server error",
            error
        })
    }
}    
