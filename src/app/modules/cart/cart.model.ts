
import { model, Schema } from "mongoose";
import { TCart } from "./cart.interfaces";

const cartSchema = new Schema<TCart>({
    productId : {
        type : Schema.Types.ObjectId ,
        required : true ,
        ref : 'products'
    },
    userId : {
        type : Schema.Types.ObjectId ,
        required : true ,
        ref : 'users'
    },
    amount : {
        type : Number ,
        required : true ,
    },
    email : {
        type : String ,
    },
    phone : {
        type : String ,
        required : true ,
    },
})

export const cartsModel = model<TCart>('cart' , cartSchema) ;
