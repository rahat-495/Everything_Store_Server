
import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { productServices } from "./products.services"
import sendResponse from "../../utils/sendResponse";

const getAllProducts = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await productServices.getAllProductsFromDb(req.query) ;
    if(result){
        sendResponse(res , {data : result?.result , meta : result.meta , success : true , statusCode : 200 , message : "Products retribed successfully !"}) ;
    }
})

const getSingleProduct = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await productServices.getSingleProductFromDb(req.params.id) ;
    if(result){
        sendResponse(res , {data : result , success : true , statusCode : 200 , message : "Product retribed successfully !"}) ;
    }
})

const createProduct = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await productServices.createProductIntoDb(req.body) ;
    if(result){
        sendResponse(res , {data : result , success : true , statusCode : 200 , message : "Product created successfully !"}) ;
    }
})

const updateProduct = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await productServices.updateProductIntoDb(req.params.id , req.body) ;
    if(result){
        sendResponse(res , {data : result , success : true , statusCode : 200 , message : "Product updated successfully !"}) ;
    }
})

const deleteProduct = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await productServices.deleteProductFromDb(req.params.id) ;
    if(result){
        sendResponse(res , {data : result , success : true , statusCode : 200 , message : "Product deleted successfully !"}) ;
    }
})

export const productControllers = {
    createProduct ,
    updateProduct ,
    deleteProduct ,
    getAllProducts ,
    getSingleProduct ,
}
