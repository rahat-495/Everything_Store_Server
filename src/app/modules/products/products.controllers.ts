
import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { productServices } from "./products.services"
import sendResponse from "../../utils/sendResponse";

const getAllProducts = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await productServices.getAllProductsFromDb(req.query) ;
    if(result){
        sendResponse(res , {data : result , success : true , statusCode : 200 , message : "Products retribed successfully !"}) ;
    }
})

const createProduct = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await productServices.createProductIntoDb(req.body) ;
    if(result){
        sendResponse(res , {data : result , success : true , statusCode : 200 , message : "Product created successfully !"}) ;
    }
})

export const productControllers = {
    createProduct ,
    getAllProducts ,
}
