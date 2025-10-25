
import AppError from "../../../errors/AppError";
import { productsModel } from "../products/products.model";
import { TOrder, TStatus } from "./order.interfaces" ;
import http from "http-status-codes" ;
import { ordersModel } from "./order.model";
import { JwtPayload } from "jsonwebtoken";
import { cartsModel } from "../cart/cart.model";

const createOrderIntoDb = async (payload : TOrder) => {
    const isProductExist = await productsModel.findById(payload?.product) ;
    if(!isProductExist){
        throw new AppError(http.NOT_FOUND , "Product not found !") ;
    }

    const isCartExist = await cartsModel.findOne({userId : payload?.userId , productId : payload?.product}) ;
    if(isCartExist){
        await cartsModel.findByIdAndDelete(isCartExist?._id) ;
    }
    
    if(Number(isProductExist?.quantity) >= Number(payload?.quantity)){
        const result = await ordersModel.create({...payload , totalPrice : payload?.quantity * isProductExist?.price + isProductExist?.deliveryFee}) ;
        return result ;
    }
    else{
        throw new AppError(http.CONFLICT , `Only ${isProductExist?.quantity} items are available in stock!`) ;
    }
}

const getAllOrdersFromDb = async () => {
    const result = await ordersModel.find().populate("product").populate("userId") ;
    return result ;
}

const getMyAllOrdersFromDb = async (user : JwtPayload) => {
    const result = await ordersModel.find({userId : user?._doc?._id , status : { $ne : "Delivered" } , isCancel : false } ).populate("product").populate("userId") ;
    return result ;
}

const getSingleOrderFromDb = async (id : string) => {
    const result = await ordersModel.findById(id).populate("product").populate("userId") ;
    if(!result){
        throw new AppError(http.NOT_FOUND , "Order not found !") ;
    }
    return result ;
}

const updateOrderStatusIntoDb = async (id : string , payload : {cancelReason ?: string , status : TStatus}) => {
    const isOrderExist = await ordersModel.findById(id) ;
    if(!isOrderExist){
        throw new AppError(http.NOT_FOUND , "Order not found !") ;
    }
    
    if(isOrderExist?.isCancel){
        throw new AppError(http.CONFLICT , "User already cancel the order !") ;
    }

    const updatedStatus = {status : payload?.status , cancelReason : payload?.cancelReason , paidStatus : false} ;
    if(payload?.status === "Delivered"){
        updatedStatus.paidStatus = true ;
    }

    const result = await ordersModel.findByIdAndUpdate(id , updatedStatus , {new : true}) ;
    return result ;
}

const cancelOrderIntoDb = async (id : string) => {
    const isOrderExist = await ordersModel.findById(id) ;
    if(!isOrderExist){
        throw new AppError(http.NOT_FOUND , "Order not found !") ;
    }
    
    if(
        isOrderExist?.status === "Shipped" || 
        isOrderExist?.status === "Out for Delivery" || 
        isOrderExist?.status === "Delivered" || 
        isOrderExist?.status === "Canceled" || 
        isOrderExist?.status === "Refunded" || 
        isOrderExist?.status === "Returned"
    ){
        throw new AppError(http.CONFLICT , `Order is already ${isOrderExist?.status}!`) ;
    }
    
    if(isOrderExist?.status === "Pending" || isOrderExist?.status === "Processing"){
        if(isOrderExist?.isCancel){
            throw new AppError(http.CONFLICT , `Order is already cancled!`) ;
        }
        const result = await ordersModel.findByIdAndUpdate(id , {isCancel : true} , {new : true}) ;
        return result ;
    }
}

const getMyHistoryFromDb = async (user : JwtPayload) => {
    const result = await ordersModel.find({userId : user?._doc?._id , $or: [{ status: "Delivered" }, { isCancel: true }] }) ;
    return result ; 
}

export const orderServices = {
    cancelOrderIntoDb ,
    createOrderIntoDb ,
    getAllOrdersFromDb ,
    getMyHistoryFromDb ,
    getMyAllOrdersFromDb ,
    getSingleOrderFromDb ,
    updateOrderStatusIntoDb ,
}
