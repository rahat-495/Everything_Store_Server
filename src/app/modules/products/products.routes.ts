
import { Router } from "express";
import { productControllers } from "./products.controllers";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { productValidations } from "./products.validations";

const router = Router() ;

router.get('/' , productControllers.getAllProducts) ;
router.get('/:id' , productControllers.getSingleProduct) ;
router.delete('/:id' , productControllers.deleteProduct) ;
router.post('/create-product' , validateRequest(productValidations.createProductValidationSchema) , productControllers.createProduct) ;
router.patch('/update-product/:id' , validateRequest(productValidations.updateProductValidationSchema) , productControllers.updateProduct) ;

export const productRoutes = router ;
