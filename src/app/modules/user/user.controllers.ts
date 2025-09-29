import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { userServices } from "./user.services"
import sendResponse from "../../utils/sendResponse";

const getMyData = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await userServices.getMyDataFromDb(req.user) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "User data retrived successfully !"}) ;
    }
})

const updateProfile = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await userServices.updateProfileIntoDb(req.user?._doc?._id , req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "User profile are updated successfully !"}) ;
    }
})

export const userControllers = {
    getMyData ,
    updateProfile ,
}
