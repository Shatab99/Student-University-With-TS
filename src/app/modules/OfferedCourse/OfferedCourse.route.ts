import { Router } from "express";
import { offeredCourseValidation } from "./OfferedCourse.validation";
import validate from "../../Utils/validation.middleware";
import { offeredCourseController } from "./OfferedCourse.Controller";

const router = Router()
const {createValidation} = offeredCourseValidation

router.post("/create-offered-course", validate(createValidation), offeredCourseController.createOfferedCourse)
router.get("/all-offered-course", offeredCourseController.getAllOfferedCourse)
router.get("/all-offered-course/:id", offeredCourseController.getAllOfferedCourseByID)
router.patch("/update-offered-course/:id", offeredCourseController.updateOfferedCourseById)
router.delete("/delete-offered-course/:id", offeredCourseController.deleteOfferedCourseById)

export const offeredCourseRouter = router