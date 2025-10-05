
import { Router } from "express";
import { cartControllers } from "./cart.controllers";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { cartValidations } from "./cart.validations";

const router = Router() ;

router.get('/' , auth("user") , cartControllers.getMyAllCarts) ;
router.post('/add-to-cart' , auth("user") , validateRequest(cartValidations.createSartValidationSchema) , cartControllers.addToCart) ;
router.patch('/update/add-to-cart/:id' , auth("user") , validateRequest(cartValidations.updateSartValidationSchema) , cartControllers.updateAddToCart) ;

export const cartsRouter = router ;
