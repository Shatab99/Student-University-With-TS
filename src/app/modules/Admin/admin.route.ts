import { Router } from "express";
import { AdminController } from "./admin.controller";
import { USER_ROLE } from "../user/user.const";
import validate from "../../Utils/validation.middleware";
import { adminValidation } from "./admin.validation";
import auth from "../../Utils/auth.middleWare";

const router = Router()

const {updateStatus}=adminValidation

router.patch("/update-status/:id",auth(USER_ROLE.admin),validate(updateStatus),  AdminController.changeStatus)

export const adminRoute = router