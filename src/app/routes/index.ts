
import { Router } from "express";
import { productRoutes } from "../modules/products/products.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { userRoutes } from "../modules/user/user.routes";
import { cartRoutes } from "../modules/cart/cart.routes";
import { orderRoutes } from "../modules/order/order.routes";
import { reviewRoutes } from "../modules/review/review.routes";

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
    {
        path : "/carts" ,
        route : cartRoutes ,
    },
    {
        path : "/orders" ,
        route : orderRoutes ,
    },
    {
        path : "/reviews" ,
        route : reviewRoutes ,
    },
]

moduleRoutes.forEach((route) => router.use(route.path , route.route)) ;

export default router
