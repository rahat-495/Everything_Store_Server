
import { Types } from "mongoose";

export type TStatus = "Processing" | "Pending" | "Shipped" | "Out for Delivery" | "Delivered" | "Canceled" | "Returned" | "Refunded"

export interface TOrder {
    paidStatus : boolean ;
    transactionId ?: string ;
    product : Types.ObjectId ;
    status : TStatus ;
    userId : Types.ObjectId ;
    userEmail ?: string ;
    userPhone : string ;
    isCancel : boolean ;
    shippingAddress : string ;
    quantity : number ;
    totalPrice ?: number ;
    deliveryDate : string ;
    cancelReason ?: string ;
    refundAmount ?: number ;
    paymentMethod : "CashOnDelivery" | "Bkash" | "Nagat" ;
}
