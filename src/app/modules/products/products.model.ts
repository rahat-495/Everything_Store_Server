
import { model, Schema } from "mongoose";
import { TProduct } from "./products.interface";

const productSchema = new Schema<TProduct>({
    description : {
        type : String ,
        required : true ,
    },
    shortDescription : {
        type : String ,
        required : true ,
    },
    image : {
        type : String ,
        required : true ,
    },
    discount : {
        type : Number ,
    },
    previousPrice : {
        type : Number ,
    },
    price : {
        type : Number ,
        required : true ,
    },
    title : {
        type : String ,
        required : true ,
    },
    inStock : {
        type : Boolean ,
        default : true ,
    },
    category : {
        type : String ,
        require : true ,
    },
    quantity : {
        type : Number ,
        required : true ,
    },
    deliveryFee : {
        type : Number ,
        required : true ,
    },
    paymentMethod: {
        bkash: { type: Boolean, default: false },
        nagat: { type: Boolean, default: false },
        CashOnDelivery: { type: Boolean, default: false },
    },
},{
    timestamps : true ,
})

export const productsModel = model<TProduct>("product" , productSchema) ;
