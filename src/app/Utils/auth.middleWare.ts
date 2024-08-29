import { NextFunction, Request, Response } from "express";
import catchAsync from "./catchAsync.global";
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { UserModel } from "../modules/user/user.model";

const auth = (...roles: TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new Error("You are unauthorized ! There is no token .")
        }

        //verify token 

        const decode = jwt.verify(token, config.jwtSecret as string) as JwtPayload;

        const { id, role, iat } = decode as JwtPayload;

        //Inspect the user

        const user = await UserModel.isUserExists(id)

        if (!user) {
            throw new Error(`User not found by this ${id}`)
        }

        if (user.isDeleted) {
            throw new Error("This user is already deleted !! ")
        }
        if (user.status === 'blocked') {
            throw new Error("This user is Blocked by admin!! ")
        }

        //check token issued time 

        if (user.passwordChangedAt && UserModel.isJWTIssuedbeforePassword(user.passwordChangedAt, iat as number)){
            throw new Error("Token Expired !!")
        }


            if (roles && !roles.includes(role)) {
                throw new Error("Unauthorized !!!")
            }

        req.user = decode as JwtPayload;
        next()

    }
    )
}

export default auth;