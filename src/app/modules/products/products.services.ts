
import AppError from "../../../errors/AppError";
import { TProduct } from "./products.interface";
import { productsModel } from "./products.model";
import httpStatus from "http-status-codes";

const getAllProductsFromDb = async (query : any) => {
    const page = Number(query?.page) || 1 ;
    const limit = Number(query?.limit) || 24 ;
    const skip = ( page - 1 ) * limit ;

    if(query?.minPrice === '0' && query?.maxPrice === '0'){
        query.minPrice = null ;
        query.maxPrice = null ;
    }

    const filter : any = {} ;

    if(query?.searchTerm){
        filter.$or = [
            { title : { $regex : query.searchTerm , $options : "i" } } ,
            { description : { $regex : query.searchTerm , $options : "i" } } ,
        ]
    }

    if(query?.category){
        filter.category = query?.category ;
    }

    if(query?.isAvailable === "yes"){
        filter.inStock = true ;
    } else if (query?.isAvailable === "no") {
        filter.inStock = false ;
    }

    if(query?.minPrice && query?.maxPrice){
        filter.price = {
            $gte : query?.minPrice ,
            $lte : query?.maxPrice ,
        }
    } else if (query?.minPrice) {
        filter.price = { $gte : query?.minPrice } ;
    } else if (query?.maxPrice) {
        filter.price = { $lte : query?.maxPrice } ;
    }

    const total = await productsModel.find(filter).estimatedDocumentCount() ;
    const result = await productsModel.find(filter).skip(skip).limit(limit) ;
    const totalPage = Math.ceil(total / limit) ;

    return { result , meta : { limit , page , total , totalPage }} ;
}

const getSingleProductFromDb = async (id : string) => {
    const result = await productsModel.findById(id) ;
    if(!result){
        throw new AppError(httpStatus.NOT_FOUND , "Product not found !") ;
    }
    return result ;
}

const createProductIntoDb = async (payload : TProduct) => {
    const result = await productsModel.create(payload) ;
    return result ;
}

const updateProductIntoDb = async (id : string , payload : Partial<TProduct>) => {
    const isProductExist = await productsModel.findById(id) ;
    if(!isProductExist){
        throw new AppError(httpStatus.NOT_FOUND , "Product not found !") ;
    }
    const result = await productsModel.findByIdAndUpdate(id , payload , { new : true }) ;
    return result ;
}

const deleteProductFromDb = async (id : string) => {
    const isProductExist = await productsModel.findById(id) ;
    if(!isProductExist){
        throw new AppError(httpStatus.NOT_FOUND , "Product not found !") ;
    }
    const result = await productsModel.findByIdAndDelete(id) ;
    return result ;
}

export const productServices = {
    createProductIntoDb ,
    updateProductIntoDb ,
    deleteProductFromDb ,
    getAllProductsFromDb ,
    getSingleProductFromDb ,
}
