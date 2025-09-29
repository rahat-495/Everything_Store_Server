
// @ts-nocheck
import AppError from "../../../errors/AppError";
import { TUser } from "../user/user.interface"
import { userModel } from "../user/user.model";
import { TLoginUser, TUpdatePassword } from "./auth.interface";
import http from "http-status-codes"
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken" ;
import config from "../../config";

const createUserIntoDb = async (payload : TUser) => {
    if(payload?.password.length < 6){
        throw new AppError(http.BAD_REQUEST , "Password must be greater then 6 charecters !") ;
    }

    const isUserAlreadyExist = await userModel.findOne({ $or : [ {email : payload?.email} , { phone : payload?.phone } ] }) ;
    if(isUserAlreadyExist){
        throw new AppError(http.CONFLICT , "User already exist !") ;
    }
    
    const result = await userModel.create(payload) ;
    
    if(!result){
        throw new AppError(http.BAD_REQUEST , "Something went wrong during register user !") ;
    }
    
    const accessToken = jwt.sign({...result , password : ""} , config.jwtAccessSecret as string , {expiresIn : '10d'}) ;
    const refreshToken = jwt.sign({...result , password : ""} , config.jwtAccessSecret as string , {expiresIn : '365d'}) ;
    return {result , accessToken , refreshToken} ;
}

const login = async (payload : TLoginUser) => {
    const { email, phone, password } = payload;
    if(payload?.password.length < 6){
        throw new AppError(http.BAD_REQUEST , "Password must be greater then 6 charecters !") ;
    }

    const isUserExist = await userModel.findOne({ $or : [ {email : phone} , {phone} ] }).select("+password") ;

    if(!isUserExist){
        throw new AppError(http.NOT_FOUND , "User not found !") ;
    }

    if(!isUserExist.isActive){
        throw new AppError(http.FORBIDDEN , "This user is deactivated !") ;
    }
    
    const isPasswordMatched = await bcrypt.compare(password , isUserExist.password) ;
    if(!isPasswordMatched){
        throw new AppError(http.UNAUTHORIZED , "Password isn't match !") ;
    }
    
    const user = {
        _id : isUserExist._id ,
        name : isUserExist.name ,
        email : isUserExist.email ,
        phone : isUserExist.phone ,
        address : isUserExist.address ,
        image : isUserExist.image ,
        role : isUserExist.role ,
    }

    const accessToken = jwt.sign({...isUserExist , password : ""} , config.jwtAccessSecret as string , {expiresIn : '10d'}) ;
    const refreshToken = jwt.sign({...isUserExist , password : ""} , config.jwtAccessSecret as string , {expiresIn : '365d'}) ;
    return {user , accessToken , refreshToken} ;
}

const updatePasswordIntoDb = async (payload : TUpdatePassword , user : JwtPayload) => {
    const userData = await userModel.findById(user?._doc?._id).select("+password") ;
    const isPasswordMatched = await bcrypt.compare(payload?.currentPassword , userData?.password) ;
    if(!isPasswordMatched){
        throw new AppError(http.UNAUTHORIZED , "Old password isn't match !") ;
    }
    
    const newHashedPassword = await bcrypt.hash(payload?.newPassword , Number(config.bcryptSaltRounds)) ;
    const result = await userModel.findByIdAndUpdate(userData?._id , { password : newHashedPassword } , {new : true}).select("-password") ;
    return result ;
}

export const authServices = {
    login ,
    createUserIntoDb ,
    updatePasswordIntoDb ,
}
