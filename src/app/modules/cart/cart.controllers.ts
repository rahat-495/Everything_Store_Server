
import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { cartServices } from "./cart.services"
import sendResponse from "../../utils/sendResponse";

const getMyAllCarts = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await cartServices.getMyAllCartsFromDb(req.user) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "Successfully retrived all carts !"}) ;
    }
})

const getSingleCart = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await cartServices.getSingleCartFromDb(req.params?.id) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "Successfully retrived that cart !"}) ;
    }
})

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

const deleteAddToCart = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await cartServices.deleteCartIntoDb(req?.params?.id) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "Successfully deleted add to cart !"}) ;
    }
})

export const cartControllers = {
    addToCart ,
    getSingleCart ,
    getMyAllCarts ,
    updateAddToCart ,
    deleteAddToCart ,
}
