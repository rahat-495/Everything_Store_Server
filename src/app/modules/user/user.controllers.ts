import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { userServices } from "./user.services"

const getMyData = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await userServices.getMyDataFromDb(req.user) ;
})

export const userControllers = {
    getMyData ,
}
