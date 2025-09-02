
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
