
import { Router } from "express";
import { reviewControllers } from "./review.controllers";
import auth from "../../middlewares/auth";

const router = Router() ;

router.post('/create-review' , auth("user") , reviewControllers.createReview) ;
router.get('/get-all-reviews' , auth("admin") , reviewControllers.getAllReviews) ;
router.get('/get-my-reviews' , auth("user") , reviewControllers.getMyAllReviews) ;
router.get('/get-my-review/:id' , auth("user") , reviewControllers.getMySingleReview) ;
router.get('/get-order-review/:id' , auth("user") , reviewControllers.getMyOrderReview) ;
router.patch('/update-my-review/:id' , auth("user") , reviewControllers.updateMyReview) ;

export const reviewRoutes = router ;
