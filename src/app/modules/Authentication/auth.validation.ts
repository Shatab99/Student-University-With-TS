import { z } from 'zod';

const LoginValidationSchema = z.object({
    body: z.object({
        id: z.string({ required_error: "Id is required !! " }),
        password: z.string({ required_error: "Id is required !! " }).min(6, "Password must be at least 6 characters long")
    })
});
const changePasswordValidation = z.object({
    body: z.object({
        oldPassword: z.string({ required_error: "Password is required !! " }),
        password: z.string({ required_error: "Id is required !! " }).min(6, "Password must be at least 6 characters long")
    })
});
const refreshTokenValidation = z.object({
    cookies: z.object({
        Refresh_Token: z.string({ required_error: "Refresh token needed !! " })
    })
});

const forgetPassValidation = z.object({
    body: z.object({
        id: z.string({ required_error: "Refresh token needed !! " })
    })
});
const resetPassValidation = z.object({
    body: z.object({
        id: z.string({ required_error: "Refresh token needed !! " }),
        newPassword: z.string({ required_error: "Refresh token needed !! " })
    })
});


export const authValidation = {
    LoginValidationSchema, changePasswordValidation, refreshTokenValidation, resetPassValidation, forgetPassValidation
}