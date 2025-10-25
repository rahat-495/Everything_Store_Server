
import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { reviewServices } from "./review.services";
import sendResponse from "../../utils/sendResponse";

const createReview = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await reviewServices.createReviewIntoDb(req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "review created successfull !"}) ;
    }
})

const getMyAllReviews = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await reviewServices.getMyAllReviewsFromDb(req.user) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "All review are retrived !"}) ;
    }
})

const getMySingleReview = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await reviewServices.getMySingleReviewFromDb(req.params?.id) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "Review are retrived !"}) ;
    }
})

const updateMyReview = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await reviewServices.updateMyReviewIntoDb(req.params?.id , req.body) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "Review are updated !"}) ;
    }
})

export const reviewControllers = {
    createReview ,
    updateMyReview ,
    getMyAllReviews ,
    getMySingleReview ,
}
