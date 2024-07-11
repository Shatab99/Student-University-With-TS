import express from 'express'
import { StudendController } from './student.controller'

const router = express.Router()

router.get('/all-students', StudendController.getAllStudents)
router.get('/single-student/:id', StudendController.getSingleStudent)
router.patch('/update-student/:id', StudendController.updateStudent)


export const StudentRoutes = router