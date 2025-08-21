
import { TUser } from "../user/user.interface"
import { userModel } from "../user/user.model";

const createUserIntoDb = async (payload : TUser) => {
    const result = await userModel.create(payload) ;
    return result ;
}

export const authServices = {
    createUserIntoDb ,
}
