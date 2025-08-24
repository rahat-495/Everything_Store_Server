
import AppError from "../../../errors/AppError";
import { TUser } from "../user/user.interface"
import { userModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import http from "http-status-codes"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken" ;
import config from "../../config";

const createUserIntoDb = async (payload : TUser) => {
    const result = await userModel.create(payload) ;
    return result ;
}

const login = async (payload : TLoginUser) => {
    const { email, phone, password } = payload;

    const isUserExist = await userModel.findOne({ $or : [ {email} , {phone} ] }).select("+password") ;

    if(!isUserExist){
        throw new AppError(http.NOT_FOUND , "User not found !") ;
    }

    if(!isUserExist.isActive){
        throw new AppError(http.FORBIDDEN , "This user is deactivated !") ;
    }
    
    const isPasswordMatched = await bcrypt.compare(password , isUserExist.password) ;
    if(!isPasswordMatched){
        throw new AppError(http.UNAUTHORIZED , "Invalid cradentials !") ;
    }
    
    const accessToken = jwt.sign({...isUserExist , password : ""} , config.jwtAccessSecret as string , {expiresIn : '10d'}) ;
    const refreshToken = jwt.sign({...isUserExist , password : ""} , config.jwtAccessSecret as string , {expiresIn : '10d'}) ;

    return {accessToken , refreshToken} ;
}

export const authServices = {
    login ,
    createUserIntoDb ,
}
