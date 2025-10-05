
import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { cartServices } from "./cart.services"
import sendResponse from "../../utils/sendResponse";

const addToCart = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await cartServices.createCartIntoDb(req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "Add to cart successfull !"}) ;
    }
})

const updateAddToCart = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await cartServices.updateCartIntoDb(req?.params?.id , req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "Successfully updated add to cart !"}) ;
    }
})

export const cartControllers = {
    addToCart ,
    updateAddToCart ,
}
