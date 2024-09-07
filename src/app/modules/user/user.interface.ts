import { Model } from "mongoose"
import { USER_ROLE } from "./user.const"

export interface TUser {
    id: string
    email : string
    password: string
    needsPasswordChange: boolean
    passwordChangedAt?: Date
    role: 'admin' | 'student' | 'faculty'
    status: 'in-progress' | 'blocked'
    isDeleted: boolean
}

export type TUserRole = keyof typeof USER_ROLE;

export interface User extends Model<TUser> {
    isUserExists(id: string): Promise<TUser>;
    isPasswordCorrect(plain: string, hash: string): Promise<boolean>;
    isJWTIssuedbeforePassword (passwordChangeTime : Date, jwtIssuedTime : number) : boolean ;
}
