import { Router } from "express";
import { departmentController } from "./department.controller";
import validate from "../../Utils/validation.middleware";
import { departmentValidation } from "./department.validation";

const router = Router()

router.post('/create-dept',validate(departmentValidation.createDept), departmentController.createDept)
router.put('/update-dept/:id',validate(departmentValidation.updateDept), departmentController.updateDeptById)
router.get('/get-all-dept', departmentController.getAllDept)
router.get('/get-dept/:id', departmentController.getDeptById)


export const departmentRouter = router