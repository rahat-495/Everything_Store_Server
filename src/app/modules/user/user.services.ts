
import { JwtPayload } from "jsonwebtoken";
import { userModel } from "./user.model";

const getMyDataFromDb = async (query : JwtPayload) => {
    const result = await userModel.findOne({ $or : [ { email : query?._doc?.email } , { phone : query?._doc?.phone } ] }).select("-password");
    return result ;
}

export const userServices = {
    getMyDataFromDb ,
}
