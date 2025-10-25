
import { model, Schema } from "mongoose";
import { TReview } from "./review.interface";

const reviewSchema = new Schema<TReview>({
    images : {
        type : [String] ,
    },
    rating : {
        type : Number ,
        required : true ,
        enum : [ 1 , 2 , 3 , 4 , 5 ] ,
    },
    review : {
        type : String ,
        required : true ,
    },
    orderId : {
        type : Schema.Types.ObjectId ,
        ref : 'order' ,
        required : true ,
    },
    productId : {
        type : Schema.Types.ObjectId ,
        ref : 'product' ,
        required : true ,
    },
    userId : {
        type : Schema.Types.ObjectId ,
        ref : 'user' ,
        required : true ,
    },
})

export const reviewsModel = model<TReview>('review' , reviewSchema) ;
