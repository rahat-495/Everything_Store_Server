import { TProduct } from "./products.interface";
import { productsModel } from "./products.model";

const getAllProductsFromDb = async (query : any) => {
    const result = await productsModel.find() ;
    return result ;
}

const createProductIntoDb = async (payload : TProduct) => {
    const result = await productsModel.create(payload) ;
    return result ;
}

export const productServices = {
    createProductIntoDb ,
    getAllProductsFromDb ,
}
