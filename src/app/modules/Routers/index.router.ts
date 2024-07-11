import { Router } from "express";
import { UserRouter } from "../user/user.route";
import { StudentRoutes } from "../students/student.route";
import { academicRouter } from "../Academic/academic.route";
import { facultyRouter } from "../Faculty/faculty.routes";
import { departmentRouter } from "../Department/department.route";

const router = Router()

const modules = [
    {
        path: "/users",
        route: UserRouter
    },
    {
        path: "/students",
        route: StudentRoutes
    },
    {
        path: "/academic",
        route: academicRouter
    },
    {
        path: "/faculty",
        route: facultyRouter
    },
    {
        path: "/department",
        route: departmentRouter
    },
]

modules.forEach(route => router.use(route.path, route.route))

export default router