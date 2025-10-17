
import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { orderServices } from "./order.services"
import sendResponse from "../../utils/sendResponse";

const createOrder = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await orderServices.createOrderIntoDb(req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "Order created successfull !"}) ;
    }
})

const getAllOrders = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await orderServices.getAllOrdersFromDb() ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "All orders are retrived successfull !"}) ;
    }
})

const getMyAllOrders = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await orderServices.getMyAllOrdersFromDb(req.user) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "All orders are retrived successfull !"}) ;
    }
})

const getMySingleOrder = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await orderServices.getMySingleOrderFromDb(req.params?.id) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "Orders are retrived successfull !"}) ;
    }
})

const updateOrderStatus = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await orderServices.updateOrderStatusIntoDb(req.params?.id , req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "Order status updated successfull !"}) ;
    }
})

const cancelOrder = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await orderServices.cancelOrderIntoDb(req.params?.id) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "Order canceled successfull !"}) ;
    }
})

export const orderControllers = {
    cancelOrder ,
    createOrder ,
    getAllOrders ,
    getMyAllOrders ,
    getMySingleOrder ,
    updateOrderStatus ,
}
