
import { Types } from "mongoose";

export interface TCart {
    productId : Types.ObjectId ;
    amount : number ;
    email ?: string ;
    phone : string ;
    userId : Types.ObjectId ;
}
