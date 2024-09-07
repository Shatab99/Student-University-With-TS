import express from 'express'
import { StudendController } from './student.controller'
import auth from '../../Utils/auth.middleWare'
import { USER_ROLE } from '../user/user.const'

const router = express.Router()

router.get('/all-students', StudendController.getAllStudents)
router.get('/single-student/:id',auth(USER_ROLE.admin) ,StudendController.getSingleStudent)
router.patch('/update-student/:id', StudendController.updateStudent)


export const StudentRoutes = router