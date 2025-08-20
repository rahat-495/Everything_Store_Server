
import { Router } from "express";
import { productControllers } from "./products.controllers";

const router = Router() ;

router.get('/' , productControllers.getAllProducts) ;

export const productRoutes = router ;
