
import { Types } from "mongoose";

export interface TOrder {
    paidStatus : boolean ;
    transactionId : string ;
    product : Types.ObjectId ;
    
}
