
import { Router } from "express";
import { orderControllers } from "./order.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { orderValidations } from "./order.validations";
import auth from "../../middlewares/auth";

const router = Router() ;

router.get('/' , auth("admin") , orderControllers.getAllOrders) ;
router.get('/get-my-orders' , auth("user") , orderControllers.getMyAllOrders) ;
router.patch('/cancel-order/:id' , auth("user") , orderControllers.cancelOrder) ;
router.get('/:id' , auth("user" , "admin") , orderControllers.getSingleOrder) ;
router.post('/create-order' , auth("user") , validateRequest(orderValidations.createOrderValidationSchema) , orderControllers.createOrder) ;
router.patch('/update-order-status/:id' , validateRequest(orderValidations.updateOrderValidationSchema) , auth("admin") , orderControllers.updateOrderStatus) ;

export const orderRoutes = router ;
