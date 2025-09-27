
import { Router } from "express";
import { authControllers } from "./auth.controllers";

const router = Router() ;

router.post("/register" , authControllers.registerUser) ;
router.post("/login" , authControllers.loginUser) ;
router.post("/logout" , authControllers.logoutUser) ;
router.post("/updatePassword" , authControllers.updatePassword) ;

export const authRoutes = router ;
