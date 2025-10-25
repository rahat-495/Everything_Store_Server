"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_routes_1 = require("../modules/products/products.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/user/user.routes");
const cart_routes_1 = require("../modules/cart/cart.routes");
const order_routes_1 = require("../modules/order/order.routes");
const review_routes_1 = require("../modules/review/review.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.authRoutes,
    },
    {
        path: "/users",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/products",
        route: products_routes_1.productRoutes,
    },
    {
        path: "/carts",
        route: cart_routes_1.cartRoutes,
    },
    {
        path: "/orders",
        route: order_routes_1.orderRoutes,
    },
    {
        path: "/reviews",
        route: review_routes_1.reviewRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
