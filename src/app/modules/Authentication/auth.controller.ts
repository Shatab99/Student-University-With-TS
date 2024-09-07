import config from "../../config";
import catchAsync from "../../Utils/catchAsync.global";
import { UserModel } from "../user/user.model";
import bcrypt from "bcrypt"
import { createToken } from "./auth.utils";
import jwt, { JwtPayload } from "jsonwebtoken";
import sendEmail from "../../Utils/sendMail";



const logInUser = catchAsync(async (req, res) => {
    const { id, password } = req.body
    const isExists = await UserModel.isUserExists(id)

    if (!isExists) {
        throw new Error(`User not found by this ${id}`)
    }

    if (isExists.isDeleted) {
        throw new Error("This user is already deleted !! ")
    }
    if (isExists.status === 'blocked') {
        throw new Error("Sorry you are blocked by admin !! ")
    }
    //check password 

    const isPasswordCorrect = await UserModel.isPasswordCorrect(password, isExists?.password);

    if (!isPasswordCorrect) {
        throw new Error("Incorrect Password !! ")
    }


    const token = createToken({ id, role: isExists.role }, config.jwtSecret as string, "1d")
    const refreshToken = createToken({ id, role: isExists.role }, config.jwtSecret as string, "365d")

    res.cookie("Refresh_Token", refreshToken, {
        secure: config.nodeEnv === "production",
        httpOnly: true
    })

    res.send({ token, needsPasswordChange: isExists?.needsPasswordChange })
})

const changePassword = catchAsync(async (req, res) => {

    const user = req.user;
    const passwordData = req.body;
    const hashPassword = await UserModel.findOne({ id: user.id }).select("password")

    const passwordMatched = await UserModel.isPasswordCorrect(passwordData.oldPassword, hashPassword?.password as string)

    if (!passwordMatched) {
        throw new Error("Invalid old Password !!")
    }

    const hash = await bcrypt.hash(passwordData.password, 10)

    const result = await UserModel.findOneAndUpdate({ id: user.id, role: user.role }, {
        password: hash,
        needsPasswordChange: false,
        passwordChangedAt: new Date()
    })

    res.send(result)
})

const refreshToken = catchAsync(async (req, res) => {
    const { Refresh_Token } = req.cookies;

    //verify token 

    const decode = jwt.verify(Refresh_Token, config.jwtSecret as string) as JwtPayload;

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

    if (user.passwordChangedAt && UserModel.isJWTIssuedbeforePassword(user.passwordChangedAt, iat as number)) {
        throw new Error("Token Expired !!")
    }

    const token = createToken({ id, role }, config.jwtSecret as string, "1d")

    res.send(token)
})


const forgetPass = catchAsync(async (req, res) => {
    const { id } = req.body

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


    const resetToken = createToken({ id: user.id, role: user.role }, config.jwtSecret as string, "10min")

    const resetUrl = `http://localhost:3000/id=${user.id}&token=${resetToken}`

    sendEmail(user.email, resetUrl)

    res.send(resetUrl)


})

const resetPass = catchAsync(async (req, res) => {
    const token = req.headers.authorization
    const id = req.body.id;
    const newPassword = req.body.newPassword

    const user = await UserModel.isUserExists(id);

    if (!user) {
        throw new Error(`User not found by this ${id}`)
    }

    if (user.isDeleted) {
        throw new Error("This user is already deleted !! ")
    }
    if (user.status === 'blocked') {
        throw new Error("This user is Blocked by admin!! ")
    }

    const { id: tokenId } = jwt.verify(token as string, config.jwtSecret as string) as JwtPayload

    if (id !== tokenId) {
        throw new Error("Unauthorized !! ")
    }

    const hash =await bcrypt.hash(newPassword, 10)

    const updatePassword = await UserModel.findOneAndUpdate({ id: user.id, role: user.role }, {
        password: hash,
        needsPasswordChange: false,
        passwordChangedAt: new Date()
    })


    res.send(updatePassword)
})


export const authController = {
    logInUser, changePassword, refreshToken, resetPass, forgetPass
}