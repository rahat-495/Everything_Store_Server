
import { Router } from "express";
import { userControllers } from "./user.controllers";
import auth from "../../middlewares/auth";

const router = Router() ;

router.get("/getMyData" , auth("admin" , "user") , userControllers.getMyData) ;

export const userRoutes = router ;
