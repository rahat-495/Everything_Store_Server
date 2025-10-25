
import { JwtPayload } from "jsonwebtoken";
import { userModel } from "./user.model";
import { TUser } from "./user.interface";

const getMyDataFromDb = async (query : JwtPayload) => {
    const result = await userModel.findOne({ $or : [ { email : query?._doc?.email } , { phone : query?._doc?.phone } ] }).select("-password");
    return result ;
}

const updateProfileIntoDb = async ( id : string ,  payload : Partial<TUser> ) => {
    const result = await userModel.findByIdAndUpdate(id , payload , {new : true}).select("-password") ;
    return result ;
}

const getAllUsersFromDb = async () => {
    const result = await userModel.find() ;
    return result ;
}

export const userServices = {
    getMyDataFromDb ,
    getAllUsersFromDb ,
    updateProfileIntoDb ,
}
