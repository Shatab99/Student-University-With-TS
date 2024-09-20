/* eslint-disable no-unsafe-optional-chaining */
import catchAsync from "../../Utils/catchAsync.global";
import { courseModel } from "../Courses/Course.model";
import { OfferedCourseModel } from "../OfferedCourse/OfferedCourse.model";
import { semesterRegModel } from "../SemesterRegistration/semesterReg.model";
import { StudentModel } from "../students/student.model";
import { TcourseMarks, TEnrollCourse } from "./EnrollCourse.interface";
import { EnrollCourseModel } from "./EnrollCourse.model";
import { calculateGrade } from "./enrolled.utils";

const create = catchAsync(async (req, res) => {
    const { id } = req.user;
    const { offeredCourse } = req.body

    const offerCourse = await OfferedCourseModel.findById(offeredCourse)

    if (!offerCourse) {
        throw new Error("This Offer course Does not Exists")
    }

    const student = await StudentModel.findOne({ id }).select("_id")


    // check if a student already enrolled !! 

    const isallReadyEnrolled = await EnrollCourseModel.findOne({
        offeredCourse,
        student: student?._id,
        semesterRegistration: offerCourse?.semesterRegistration
    })
    if (isallReadyEnrolled) {
        throw new Error("This student Already enrolled !!")
    }

    if (offerCourse?.maxCapacity <= 0) {
        throw new Error('Room is full !!')
    }

    // Check if the student exceeding semester credit or not

    const semesterRegCred = await semesterRegModel.findById(offerCourse?.semesterRegistration).select("maxCredit")

    const enrollCourses = await EnrollCourseModel.aggregate([
        //stage-1
        {
            $match: {
                semesterRegistration: offerCourse.semesterRegistration,
                student: student?._id
            }
        },
        //stage-2
        {
            $lookup: {
                from: "courses",
                localField: "course",
                foreignField: "_id",
                as: "EnrolledCouses"
            }
        },
        //stage-3 
        {
            $unwind: "$EnrolledCouses"
        },
        //stage-4
        {
            $group: { _id: null, totalEnrolledCreds: { $sum: "$EnrolledCouses.credits" } }
        }
    ])

    //total credit + new Credit > semester max credit makes the error 

    //finding new creds 

    const enrollCourse = await courseModel.findById(offerCourse?.course)

    const newCred = enrollCourse?.credits

    const totalCreds = enrollCourses.length ? enrollCourses[0].totalEnrolledCreds : 0;

    if (totalCreds && (totalCreds + newCred > (semesterRegCred?.maxCredit as number))) {
        throw new Error("There is no more Credits left on this semester !")
    }

    console.log(totalCreds)
    const { semesterRegistration, academicDepartment, academicSemester, course, faculty } = offerCourse

    const result = await EnrollCourseModel.create({
        semesterRegistration, academicDepartment, academicSemester, course, faculty, student: student?._id, offeredCourse
    })

    //update Offered Course capacity
    const { maxCapacity } = offerCourse


    const upadate = await OfferedCourseModel.findByIdAndUpdate(offeredCourse, {
        maxCapacity: maxCapacity - 1
    })

    res.send({ result, upadate })

})

const updateEnrollCourse = catchAsync(async (req, res) => {
    const body = req.body;
    const { semesterRegistration, offeredCourse, student, courseMarks } = body


    //update grade 

    const EnrolledCouse: Partial<TEnrollCourse> | null = await EnrollCourseModel.findOne({ semesterRegistration, offeredCourse, student })

    const result = await EnrollCourseModel.findOneAndUpdate({
        semesterRegistration, offeredCourse, student
    }, {
        courseMarks
    })

    if (courseMarks?.final) {
        const { classTest1, classTest2, mid, final } = EnrolledCouse?.courseMarks as TcourseMarks
        console.log({ classTest1, classTest2, mid, final })
        const total = classTest1 + classTest2 + mid + final
        const changeGrade = calculateGrade(total)
        const changeGradeRes = await EnrollCourseModel.findOneAndUpdate({
            semesterRegistration, offeredCourse, student
        }, {
            grade: changeGrade.grade,
            gradePoints: changeGrade.gradePoints,
            isCompleted : true
        })
        console.log(changeGradeRes)
    }





    res.send({ result })



})


export const enrollCourseController = {
    create, updateEnrollCourse
}