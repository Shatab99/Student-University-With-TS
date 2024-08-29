/* eslint-disable @typescript-eslint/no-unused-vars */
import catchAsync from "../../Utils/catchAsync.global";
import { semesterNameCodeMapper } from "./academic.const";
import { AcademicSemesterModel } from "./academic.model";

const createAcademicSemester = catchAsync(async (req, res) => {

    const semesterInfo = req.body;

    // Matching Codes with semester name

    if (semesterNameCodeMapper[semesterInfo.name] !== semesterInfo.code) {
        throw new Error('Mismatched Code !! Please check codes carefully .')
    }

    const result = await AcademicSemesterModel.create(semesterInfo);
    res.send(result);
})


const getAllSemesters = catchAsync(async (req, res) => {
    const {role} = req.user;
    if(role !== "admin"){
        throw new Error("Only admin can see semesters!!")
    }
    res.send(await AcademicSemesterModel.find());
})

const getSemesterById = catchAsync(async (req, res) => {
    res.send(await AcademicSemesterModel.findById(req.params.id));
})

const updateSemesterById = catchAsync(async (req, res) => {
    const semesterInfo = req.body;
    if (semesterNameCodeMapper[semesterInfo.name] !== semesterInfo.code) {
        throw new Error('Mismatched Code !! Please check codes carefully .')
    }
    res.send(await AcademicSemesterModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    ))
})


export const AcademicSemesterController = {
    createAcademicSemester, getAllSemesters, getSemesterById, updateSemesterById
}