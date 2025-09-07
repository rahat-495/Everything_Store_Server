
import { Router } from "express";
import { productControllers } from "./products.controllers";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { productValidations } from "./products.validations";

const router = Router() ;

router.get('/' , productControllers.getAllProducts) ;
router.post('/create-product' , validateRequest(productValidations.createProductValidationSchema) , productControllers.createProduct) ;

export const productRoutes = router ;
