
import { Router } from "express";
import { userControllers } from "./user.controllers";
import auth from "../../middlewares/auth";

const router = Router() ;

router.get('/get-all-users' , auth("admin") , userControllers.getAllUsers) ;
router.get("/getMyData" , auth("admin" , "user") , userControllers.getMyData) ;
router.patch("/updateProfile" , auth("admin" , "user") , userControllers.updateProfile)

export const userRoutes = router ;
