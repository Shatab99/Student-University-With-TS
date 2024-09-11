import catchAsync from "../../Utils/catchAsync.global";
import { OfferedCourseModel } from "../OfferedCourse/OfferedCourse.model";
import { StudentModel } from "../students/student.model";
import { EnrollCourseModel } from "./EnrollCourse.model";

const create = catchAsync(async (req, res) => {
    const { id } = req.user;
    const { offeredCourse } = req.body

    const offerCourse = await OfferedCourseModel.findById(offeredCourse)

    if (!offerCourse) {
        throw new Error("This Offer course Does not Exists")
    }

    const student = await StudentModel.findOne({ id }).select("id")

    // check if a student already enrolled !! 

    const isallReadyEnrolled = await EnrollCourseModel.findOne({
        offeredCourse,
        student: student?._id,
    })
    if (isallReadyEnrolled) {
        throw new Error("This student Already enrolled !!")
    }

    if (offerCourse?.maxCapacity <= 0) {
        throw new Error('Room is full !!')
    }

    const { semesterRegistration, academicDepartment, academicSemester, course, faculty } = offeredCourse

    const result = await EnrollCourseModel.create({
        semesterRegistration, academicDepartment, academicSemester, course, faculty, student: student?._id, offeredCourse
    })

    //update Offered Course capacity
    const {maxCapacity} = offerCourse


    const upadate = await OfferedCourseModel.findByIdAndUpdate(offeredCourse, {
        maxCapacity : maxCapacity-1
    })

    res.send({result,upadate})


})

export const enrollCourseController = {
    create
}