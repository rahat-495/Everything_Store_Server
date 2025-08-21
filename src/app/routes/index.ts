
import { Router } from "express";
import { productRoutes } from "../modules/products/products.routes";
import { authRoutes } from "../modules/auth/auth.routes";

const router = Router() ;

const moduleRoutes = [
    {
        path : "/auth" ,
        route : authRoutes ,
    },
    {
        path : "/products" ,
        route : productRoutes ,
    },
]

moduleRoutes.forEach((route) => router.use(route.path , route.route)) ;

export default router
