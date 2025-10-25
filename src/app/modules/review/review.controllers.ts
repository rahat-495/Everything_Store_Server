
import { NextFunction, Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { reviewServices } from "./review.services";
import sendResponse from "../../utils/sendResponse";

const createReview = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await reviewServices.createReviewIntoDb(req.body , req.user) ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "review created successfull !"}) ;
    }
})

const getAllReviews = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await reviewServices.getAllReviewsFromDb() ;
    if(result){
        sendResponse<object>(res , {data : result , statusCode : 201 , success : true , message : "All review are retrived !"}) ;
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

const getMyOrderReview = catchAsync(async (req : Request , res : Response , next : NextFunction) => {
    const result = await reviewServices.getMyOrderReviewFromDb(req.params?.id) ;
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
    getAllReviews ,
    updateMyReview ,
    getMyAllReviews ,
    getMyOrderReview ,
    getMySingleReview ,
}
