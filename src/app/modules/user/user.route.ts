import express from 'express'
import { UserController } from './user.controller';
import validate from '../../Utils/validation.middleware';
import studentSchema  from '../students/student.validation';


const router = express.Router();



router.post('/create-user', validate(studentSchema) ,UserController.createUser)
router.delete('/delete-user/:id', UserController.deleteUser )

export const UserRouter = router;