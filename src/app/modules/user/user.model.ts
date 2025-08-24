
import { model, Schema } from "mongoose";
import { TName, TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const nameSchema = new Schema<TName>({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
})

const userSchema = new Schema<TUser>({
    name : {
        type : nameSchema ,
        required: true,
    },
    image : {
        type : String ,
        default : "" ,
    },
    email : {
        type : String ,
        required: true,
        unique : true,
    },
    phone : {
        type : Number ,
        required: true,
        unique : true,
    },
    address : {
        type : String ,
        required: true,
    },
    isActive : {
        type : Boolean ,
        default : true,
    },
    password : {
        type : String ,
        required : true,
    },
    role : {
        type : String ,
        enum : ["user", "admin"],
        default : "user",
    },
},{
    timestamps : true ,
})

userSchema.pre("save" , async function(next){
    const user = this ;
    user.password = await bcrypt.hash(user.password , Number(config.bcryptSaltRounds)) ;
})

userSchema.post("save" , function(doc , next) {
    doc.password = "" ,
    next() ;
})

userSchema.post("find" , function(doc , next) {
    doc.forEach((user : TUser) => {
        user.password = "" ;
    })
    next() ;
})

userSchema.post("findOne" , function(doc , next) {
    doc.password = "" ;
    next() ;
})

export const userModel = model<TUser>("user" , userSchema) ;
