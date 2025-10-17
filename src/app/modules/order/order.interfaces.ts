
import { Types } from "mongoose";

export interface TOrder {
    paidStatus : boolean ;
    transactionId : string ;
    product : Types.ObjectId ;
    status : "Pending" | "Processing" | "Shipped" | "In Transit" | "Out for Delivery" | "Delivered" | "Canceled" | "Returned" | "Refunded" ;
    userId : Types.ObjectId ;
    userEmail : string ;
    userPhone : string ;
    shippingAddress : string ;
    quantity : number ;
    deliveryDate : string ;
    cancelReason ?: string ;
    refundAmount ?: number ;
    paymentMethod : "CashOnDelivery" | "Bkash" | "Nagat" ;
}
