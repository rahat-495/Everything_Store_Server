
import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { authServices } from "./auth.services";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";

const registerUser = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await authServices.createUserIntoDb(req.body) ;
    res.cookie("token" , result.refreshToken , {httpOnly : true , secure : config.nodeEnv === 'production' , sameSite : "none" , maxAge : 1000 * 60 * 60 * 24 * 365}) ;
    if(result){
        sendResponse<object>(res , {data : {user : result.result , accessToken : result.accessToken} , statusCode : 201 , success : true , message : "User register successfully !"}) ;
    }
})

const loginUser = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await authServices.login(req.body) ;
    res.cookie("token" , result.refreshToken , {httpOnly : true , secure : config.nodeEnv === 'production' , sameSite : "none" , maxAge : 1000 * 60 * 60 * 24 * 365}) ;
    if(result){
        sendResponse<object>(res , {data : { accessToken : result.accessToken} , statusCode : 201 , success : true , message : "User register successfully !"}) ;
    }
})

export const authControllers = {
    loginUser ,
    registerUser ,
}
