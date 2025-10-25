
import { Types } from "mongoose";

export interface TReview {
    productId : Types.ObjectId ;
    orderId : Types.ObjectId ;
    userId : Types.ObjectId ;
    rating : 1 | 2 | 3 | 4 | 5 ;
    review : string ;
    images : string[] ;
}
