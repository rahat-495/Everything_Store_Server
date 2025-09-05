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

export const userControllers = {
    getMyData ,
}
