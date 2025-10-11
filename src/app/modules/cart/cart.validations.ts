
import z from "zod"

const createSartValidationSchema = z.object({
    body : z.object({
        productId : z.string({"required_error" : "Product id is required !"}) ,
        amount : z.number({"required_error" : "Product amount is required !"}) ,
        email : z.string({"required_error" : "Email is required !"}).optional() ,
        phone : z.string({"required_error" : "User phone number is required !"}) ,
        userId : z.string({"required_error" : "User id is required !"}) ,
    })
})

const updateSartValidationSchema = z.object({
    body : z.object({
        productId : z.string({"required_error" : "Product id is required !"}).optional() ,
        amount : z.number({"required_error" : "Product amount is required !"}) ,
        email : z.string({"required_error" : "Email is required !"}).optional() ,
        phone : z.string({"required_error" : "User phone number is required !"}).optional() ,
        userId : z.string({"required_error" : "User id is required !"}).optional() ,
    })
})

export const cartValidations = {
    createSartValidationSchema ,
    updateSartValidationSchema ,
}
