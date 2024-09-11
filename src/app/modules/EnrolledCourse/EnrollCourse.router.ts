import { Router } from "express";
import { enrollCourseValidation } from "./EnrollCourse.validation";
import validate from "../../Utils/validation.middleware";
import auth from "../../Utils/auth.middleWare";
import { USER_ROLE } from "../user/user.const";
import { enrollCourseController } from "./EnrollCourse.Controller";

const router = Router()
const { createValidation } = enrollCourseValidation

router.post('/create-enroll-course',auth(USER_ROLE.student), validate(createValidation), enrollCourseController.create )

export const enrollCourseRouter = router