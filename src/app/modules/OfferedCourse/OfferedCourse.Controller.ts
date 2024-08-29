/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from "../../builder/Query.Builder";
import catchAsync from "../../Utils/catchAsync.global";
import { AcademicSemesterModel } from "../Academic/academic.model";
import { courseModel } from "../Courses/Course.model";
import { departmentModal } from "../Department/department.model";
import { facultModal } from "../Faculty/faculty.modal";
import { semesterRegModel } from "../SemesterRegistration/semesterReg.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourseModel } from "./OfferedCourse.model";
import { hasTimeConflict } from "./offeredCourse.utils";


const createOfferedCourse = catchAsync(async (req, res) => {
    const body: Partial<TOfferedCourse> = req.body
    const { academicDepartment, academicSemester, course, faculty, semesterRegistration, section, startTime, endTime, days } = body

    const isAcademicDeptExists = await departmentModal.findById(academicDepartment);

    if (!isAcademicDeptExists) {
        throw new Error(`Cannot Find Department by this ${academicDepartment}`)
    }
    const isSemesterExists = await AcademicSemesterModel.findById(academicSemester);

    if (!isSemesterExists) {
        throw new Error(`Cannot Find Department by this ${academicSemester}`)
    }
    const isCourseExists = await courseModel.findById(course);

    if (!isCourseExists) {
        throw new Error(`Cannot Find Department by this ${course}`)
    }
    const isFacultyExists = await facultModal.findById(faculty);

    if (!isFacultyExists) {
        throw new Error(`Cannot Find faculty by this ${faculty}`)
    }
    const isSemesterRegExists = await semesterRegModel.findById(semesterRegistration);

    if (!isSemesterRegExists) {
        throw new Error(`Cannot Find Department by this ${semesterRegistration}`)
    }

    //check deparment exists in the faculty

    const isDeptExistsInFaculty = await departmentModal.findOne({
        _id: academicDepartment,
        facultyId: faculty
    })

    if (!isDeptExistsInFaculty) {
        throw new Error(`${isAcademicDeptExists.name} is not exists in ${isFacultyExists.name}`)
    }

    const isSameSectionExistsWithSameRegisterAndCourse = await OfferedCourseModel.findOne(
        {
            semesterRegistration,
            course,
            section
        }
    )

    if (isSameSectionExistsWithSameRegisterAndCourse) {
        throw new Error('Section is already exists !!')
    }


    const existingShcedules = await OfferedCourseModel.find({
        startTime, endTime, days: { $in: days }
    })

    const newSchedule = {
        days, startTime, endTime
    }

    if (hasTimeConflict(existingShcedules, newSchedule)) {
        throw new Error("Slot is not availavle ! Please choose another Slot . ")
    }


    res.send(await OfferedCourseModel.create(body))
    // res.send({})
})

const getAllOfferedCourse = catchAsync(async (req, res) => {
    const query = req.query;
    const searchFields = [""]
    const result = new QueryBuilder(OfferedCourseModel.find(), query).search(searchFields).filtering().paginate().sort().fields()
    res.send(await result.modelQuery)
})

const getAllOfferedCourseByID = catchAsync(async (req, res) => {
    const id = req.params.id;
    res.send(await OfferedCourseModel.findById(id).populate("semesterRegistration").populate("semesterRegistration").populate("academicDepartment").populate("course").populate("faculty"));
})

const updateOfferedCourseById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const { faculty, days, startTime, endTime } = body
    const isOfferedCourseExists = await OfferedCourseModel.findById(id)
    if (!isOfferedCourseExists) {
        throw new Error("OfferCourse Doesn't Exists !!")
    }

    const isFacultyExists = await facultModal.findById(faculty);

    if (!isFacultyExists) {
        throw new Error(`Cannot Find Faculty by this ${faculty}`)
    }

    const existingShcedules = await OfferedCourseModel.find({
        startTime, endTime, days: { $in: days }
    })

    const newSchedule = {
        days, startTime, endTime
    }

    if (hasTimeConflict(existingShcedules, newSchedule)) {
        throw new Error("Slot is not availavle ! Please choose another Slot . ")
    }

    //check status of the registered semester if it's upcoming

    const semesterReg = await semesterRegModel.findById(isOfferedCourseExists?.semesterRegistration)

    if (semesterReg?.status === "ENDED" || semesterReg?.status === "ONGOING") {
        throw new Error(`Can not be changed because it's already ${semesterReg?.status}`)
    }

    const result = await OfferedCourseModel.findByIdAndUpdate(id, body)

    res.send(result)

})

const deleteOfferedCourseById = catchAsync(async (req, res) => {
    const id = req.params.id;

    const offererCourse = await OfferedCourseModel.findById(id)
    const semesterReg = await semesterRegModel.findById(offererCourse?.semesterRegistration)
    if (semesterReg?.status === "ONGOING") {
        throw new Error(`Can not be Deleted because it's already ${semesterReg?.status}`)
    }
    res.send(await OfferedCourseModel.findByIdAndDelete(id))
})




export const offeredCourseController = {
    createOfferedCourse, getAllOfferedCourse, getAllOfferedCourseByID, updateOfferedCourseById, deleteOfferedCourseById
}