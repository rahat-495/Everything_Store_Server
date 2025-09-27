
import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { authServices } from "./auth.services";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";

const registerUser = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await authServices.createUserIntoDb(req.body) ;
    res.cookie("refreshToken" , result.refreshToken , {httpOnly : true , secure : config.nodeEnv === 'production' , sameSite : "strict" , maxAge : 1000 * 60 * 60 * 24 * 365}) ;
    res.cookie("accessToken" , result.accessToken , {httpOnly : true , secure : config.nodeEnv === 'production' , sameSite : "strict" , maxAge : 1000 * 60 * 60 * 24 * 10}) ;
    if(result){
        sendResponse<object>(res , {data : {user : result.result , accessToken : result.accessToken} , statusCode : 201 , success : true , message : "User register successfully !"}) ;
    }
})

const loginUser = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await authServices.login(req.body) ;
    res.cookie("refreshToken" , result.refreshToken , {httpOnly : true , secure : config.nodeEnv === 'production' , sameSite : "strict" , maxAge : 1000 * 60 * 60 * 24 * 365}) ;
    res.cookie("accessToken" , result.accessToken , {httpOnly : true , secure : config.nodeEnv === 'production' , sameSite : "strict" , maxAge : 1000 * 60 * 60 * 24 * 10}) ;
    if(result){
        sendResponse<object>(res , {data : { user : result.user , accessToken : result.accessToken } , statusCode : 201 , success : true , message : "User login successfully !"}) ;
    }
})

const logoutUser = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    res.clearCookie("accessToken") ;
    sendResponse<object>(res , {data : {} , statusCode : 201 , success : true , message : "User logout successfully !"}) ;
})

const updatePassword = catchAsync(async(req : Request , res : Response , next : NextFunction) => {
    const result = await authServices.updatePasswordIntoDb(req.body , req.user) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "User password updated successfully !"}) ;
    }
})

export const authControllers = {
    loginUser ,
    logoutUser ,
    registerUser ,
    updatePassword ,
}
