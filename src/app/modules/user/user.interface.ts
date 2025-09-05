import { Model } from "mongoose";
import { userRole } from "./user.constant";

export interface TName {
    firstName: string;
    lastName: string;
}

export interface TUser {
    name : TName;
    email ?: string;
    image ?: string ;
    phone : string ;
    address ?: string ;
    password : string ;
    role : "user" | "admin" ;
    isActive : boolean ;
}

export interface UserModel extends Model<TUser> {
  isUserExistsById(_id: string): Promise<TUser>;
}

export type TUserRole = keyof typeof userRole ;
