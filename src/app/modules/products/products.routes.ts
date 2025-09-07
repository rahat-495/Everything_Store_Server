
import { Router } from "express";
import { productControllers } from "./products.controllers";
import auth from "../../middlewares/auth";

const router = Router() ;

router.get('/' , productControllers.getAllProducts) ;
router.post('/create-products' , productControllers.createProduct) ;

export const productRoutes = router ;
