
export interface TLoginUser {
  email ?: string;
  phone ?: string;
  password : string;
}

export interface TUpdatePassword {
  oldPassword : string ;
  newPassword : string ;
}
