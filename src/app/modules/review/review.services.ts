
import AppError from "../../../errors/AppError";
import { ordersModel } from "../order/order.model";
import { productsModel } from "../products/products.model";
import { TReview } from "./review.interface" ;
import http from "http-status-codes" ;
import { reviewsModel } from "./review.model";
import { JwtPayload } from "jsonwebtoken";

const createReviewIntoDb = async (payload : TReview , user : JwtPayload) => {
    const isProductExist = await productsModel.findById(payload?.productId) ;
    if(!isProductExist){
        throw new AppError(http.NOT_FOUND , "Product not found !") ;
    }

    const isOrderExist = await ordersModel.findById(payload?.orderId) ;
    if(!isOrderExist){
        throw new AppError(http.NOT_FOUND , "Order not found !") ;
    }
    
    const result = await reviewsModel.create({...payload , userId : user?._doc?._id}) ;
    return result ;
}

const getMyAllReviewsFromDb = async (user : JwtPayload) => {
    const result = await reviewsModel.find({userId : user?._doc?._id}) ;
    return result ;
}

const getMySingleReviewFromDb = async (id : string) => {
    const result = await reviewsModel.findById(id) ;
    if(!result){
        throw new AppError(http.NOT_FOUND , "Review not found !") ;
    }
    return result ;
}

const getAllReviewsFromDb = async () => {
    const result = await reviewsModel.find() ;
    return result ;
}

const getMyOrderReviewFromDb = async (id : string) => {
    const isOrderExist = await ordersModel.findById(id) ;
    if(!isOrderExist){
        throw new AppError(http.NOT_FOUND , "Order not found !") ;
    }

    const result = await reviewsModel.findOne({ orderId : isOrderExist?._id , productId : isOrderExist?.product , userId : isOrderExist?.userId }) ;
    return result ;
}

const updateMyReviewIntoDb = async (id : string , payload : Partial<TReview>) => {
    const isReviewExist = await reviewsModel.findById(id) ;
    if(!isReviewExist){
        throw new AppError(http.NOT_FOUND , "Review not found !") ;
    }

    const result = await reviewsModel.findByIdAndUpdate(id , { rating : payload?.rating , review : payload?.review , images : payload?.images } , {new : true}) ;
    return result ;
}

export const reviewServices = {
    createReviewIntoDb ,
    getAllReviewsFromDb ,
    updateMyReviewIntoDb ,
    getMyAllReviewsFromDb ,
    getMyOrderReviewFromDb ,
    getMySingleReviewFromDb ,
}
