import { Router } from "express";
import { AcademicSemesterController } from "./academic.controller";
import validate from "../../Utils/validation.middleware";
import { academicValidate } from "./academic.validation";
import auth from "../../Utils/auth.middleWare";
import { USER_ROLE } from "../user/user.const";


const router = Router()

router.post('/create-academic-semester', validate(academicValidate.academicValidationSchema), AcademicSemesterController.createAcademicSemester)
router.get('/all-academic-semesters',auth(USER_ROLE.admin), AcademicSemesterController.getAllSemesters)
router.get('/academic-semester/:id', AcademicSemesterController.getSemesterById)
router.put('/update-academic-semester/:id', validate(academicValidate.updateacademicValidationSchema), AcademicSemesterController.updateSemesterById)



export const academicRouter = router;