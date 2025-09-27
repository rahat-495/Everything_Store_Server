
import { Router } from "express";
import { authControllers } from "./auth.controllers";
import auth from "../../middlewares/auth";

const router = Router() ;

router.post("/login" , authControllers.loginUser) ;
router.post("/logout" , authControllers.logoutUser) ;
router.post("/register" , authControllers.registerUser) ;
router.post("/updatePassword" , auth("admin" , "user") , authControllers.updatePassword) ;

export const authRoutes = router ;
