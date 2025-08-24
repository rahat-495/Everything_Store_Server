
import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { authServices } from "./auth.services";
import sendResponse from "../../utils/sendResponse";

const registerUser = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await authServices.createUserIntoDb(req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "User register successfully !"}) ;
    }
})

const loginUser = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await authServices.login(req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "User register successfully !"}) ;
    }
})

export const authControllers = {
    loginUser ,
    registerUser ,
}
