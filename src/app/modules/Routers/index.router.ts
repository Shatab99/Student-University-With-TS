import { Router } from "express";
import { UserRouter } from "../user/user.route";
import { StudentRoutes } from "../students/student.route";
import { academicRouter } from "../Academic/academic.route";
import { facultyRouter } from "../Faculty/faculty.routes";
import { departmentRouter } from "../Department/department.route";
import { courseRouter } from "../Courses/Course.Route";
import { semesterRegRouter } from "../SemesterRegistration/semeterReg.route";
import { offeredCourseRouter } from "../OfferedCourse/OfferedCourse.route";
import { authRoute } from "../Authentication/auth.route";
import { adminRoute } from "../Admin/admin.route";

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
    {
        path: "/courses",
        route: courseRouter
    },
    {
        path: "/semesterReg",
        route: semesterRegRouter
    },
    {
        path: "/offeredCourse",
        route: offeredCourseRouter
    },
    {
        path: "/auth",
        route: authRoute
    },
    {
        path: "/admin",
        route: adminRoute
    },
]

modules.forEach(route => router.use(route.path, route.route))

export default router