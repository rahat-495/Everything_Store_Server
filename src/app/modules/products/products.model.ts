
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
})

export const productsModel = model<TProduct>("product" , productSchema) ;
