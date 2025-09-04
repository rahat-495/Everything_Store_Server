
import { Router } from "express";
import { productRoutes } from "../modules/products/products.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";

const router = Router() ;

const moduleRoutes = [
    {
        path : "/auth" ,
        route : authRoutes ,
    },
    {
        path : "/users" ,
        route : userRoutes ,
    },
    {
        path : "/products" ,
        route : productRoutes ,
    },
]

moduleRoutes.forEach((route) => router.use(route.path , route.route)) ;

export default router
