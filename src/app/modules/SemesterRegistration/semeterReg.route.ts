import { Router } from "express";
import { semesterRegController } from "./semesterReg.controller";

const router = Router()

router.post('/create-semester-reg', semesterRegController.createSemesterRegistration)
router.get('/all-semester-reg', semesterRegController.getAllSemesterReg)
router.get('/semester-reg/:id', semesterRegController.getSemesterRegById)
router.patch('/update-semester-reg/:id', semesterRegController.updateSemRegByID)

export const semesterRegRouter = router