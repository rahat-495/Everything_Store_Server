
export interface TLoginUser {
  email ?: string;
  phone ?: string;
  password : string;
}

export interface TUpdatePassword {
  currentPassword : string ;
  newPassword : string ;
}
