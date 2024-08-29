import { Router } from "express";
import { authValidation } from "./auth.validation";
import validate from "../../Utils/validation.middleware";
import { authController } from "./auth.controller";
import auth from "../../Utils/auth.middleWare";
import { USER_ROLE } from "../user/user.const";

const router = Router()
const { LoginValidationSchema, changePasswordValidation, refreshTokenValidation } = authValidation

router.post("/login", validate(LoginValidationSchema), authController.logInUser)

router.post("/refresh-token", validate(refreshTokenValidation), authController.refreshToken)

router.post("/change-password", auth(USER_ROLE.student,USER_ROLE.admin, USER_ROLE.faculty), validate(changePasswordValidation), authController.changePassword)

export const authRoute = router 