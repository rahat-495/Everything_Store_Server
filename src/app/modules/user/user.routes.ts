
import { Router } from "express";
import { userControllers } from "./user.controllers";

const router = Router() ;

router.get("/getMyData" , userControllers.getMyData) ;

export const userRoutes = router ;
