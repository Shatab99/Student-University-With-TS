import { Router } from "express";
import { courseController } from "./Course.controller";
import { courseValidation } from "./Course.Validation";
import validate from "../../Utils/validation.middleware";

const router = Router()
const {createCourseValidation,updateCourseValidation, courseFacultyValidation} = courseValidation


router.post("/create-course", validate(createCourseValidation), courseController.createCourse)
router.patch("/update/:id", validate(updateCourseValidation), courseController.updateCourseById)
router.get("/courses",  courseController.getAllCourse)
router.get("/courses/:id",  courseController.getCourseById)
router.put("/assignFaculty/:id", validate(courseFacultyValidation),courseController.assignFaculty)
router.put("/removeFaculty/:id", validate(courseFacultyValidation),courseController.removeFaculty)
router.delete("/delete-course/:id",  courseController.deleteCourseById)



export const courseRouter = router