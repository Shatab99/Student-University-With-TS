import express from 'express'
import { UserController } from './user.controller';
import validate from '../../Utils/validation.middleware';
import studentSchema from '../students/student.validation';
import { adminValidation } from '../Admin/admin.validation';
import { AdminController } from '../Admin/admin.controller';
import auth from '../../Utils/auth.middleWare';
import { USER_ROLE } from './user.const';


const router = express.Router();
const { adminCreateValidation } = adminValidation

// 
router.post('/create-user',auth(USER_ROLE.admin), validate(studentSchema), UserController.createUser)
router.post('/create-admin', validate(adminCreateValidation), AdminController.createAdmin)
router.delete('/delete-user/:id', UserController.deleteUser)

export const UserRouter = router;