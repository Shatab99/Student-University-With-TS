import {Router} from 'express'
import { facultyController } from './faculty.Controller'
import validate from '../../Utils/validation.middleware'
import { facultyValidation } from './faculty.validation'


const router = Router()


router.post('/create-faculty',validate(facultyValidation.createValidation), facultyController.createFaculty)

router.get('/get-all-faculties', facultyController.getAllFaculties)
router.get('/get-faculty/:id', facultyController.getSingleFaculty)
router.put('/update-faculty/:id', facultyController.updateFacultyById)

export const facultyRouter = router