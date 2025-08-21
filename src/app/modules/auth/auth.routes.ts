
import { Router } from "express";
import { authControllers } from "./auth.controllers";

const router = Router() ;

router.post("/register" , authControllers.registerUser) ;

export const authRoutes = router ;
