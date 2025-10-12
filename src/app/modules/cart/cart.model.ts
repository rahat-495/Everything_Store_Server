
import { model, Schema } from "mongoose";
import { TCart } from "./cart.interfaces";

const cartSchema = new Schema<TCart>({
    productId : {
        type : Schema.Types.ObjectId ,
        required : true ,
        ref : 'product'
    },
    userId : {
        type : Schema.Types.ObjectId ,
        required : true ,
        ref : 'user'
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
},{
    timestamps : true ,
})

export const cartsModel = model<TCart>('cart' , cartSchema) ;
