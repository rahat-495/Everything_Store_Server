import { TProduct } from "./products.interface";
import { productsModel } from "./products.model";

const getAllProductsFromDb = async (query : any) => {
    const page = Number(query?.page) || 1 ;
    const limit = Number(query?.limit) || 12 ;
    const skip = ( page - 1 ) * limit ;

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

const createProductIntoDb = async (payload : TProduct) => {
    const result = await productsModel.create(payload) ;
    return result ;
}

export const productServices = {
    createProductIntoDb ,
    getAllProductsFromDb ,
}
