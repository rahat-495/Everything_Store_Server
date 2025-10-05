
import AppError from "../../../errors/AppError";
import { productsModel } from "../products/products.model";
import { TCart } from "./cart.interfaces"
import { cartsModel } from "./cart.model";
import http from "http-status-codes";

const createCartIntoDb = async (payload : TCart) => {
    const product = await productsModel.findById(payload?.productId) ;
    if(Number(product?.quantity) >= Number(payload?.amount)){
        const result = await cartsModel.create(payload) ;
        return result ;
    }
    else{
        throw new AppError(http.CONFLICT , `Only ${product?.quantity} items are available in stock!`) ;
    }
}

const updateCartIntoDb = async (id : string , payload : Partial<TCart>) => {
    const isCartExist = await cartsModel.findById(id) ;
    const product = await productsModel.findById(isCartExist?.productId) ;

    if(!isCartExist){
        throw new AppError(http.NOT_FOUND , "Cart not found !") ;
    }

    if(Number(product?.quantity) >= Number(payload?.amount)){
        const result = await cartsModel.findByIdAndUpdate(id , payload , {new : true}) ;
        return result ;
    }
    else{
        throw new AppError(http.CONFLICT , `Only ${product?.quantity} items are available in stock!`) ;
    }
}

export const cartServices = {
    createCartIntoDb ,
    updateCartIntoDb ,
}
