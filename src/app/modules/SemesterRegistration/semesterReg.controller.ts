import QueryBuilder from "../../builder/Query.Builder";
import catchAsync from "../../Utils/catchAsync.global";
import { AcademicSemesterModel } from "../Academic/academic.model";
import { semesterRegModel } from "./semesterReg.model";

const createSemesterRegistration = catchAsync(async (req, res) => {
    const { academicSemester } = req.body;
    const isAlreadyRegistered = await semesterRegModel.findOne({ academicSemester });
    const isSemesterExists = await AcademicSemesterModel.findById(academicSemester)
    const isUpcomingOrOngoingExists = await semesterRegModel.findOne({
        $or: [
            { status: "UPCOMING" }, { status: "ONGOING" }
        ]
    })

    if (isUpcomingOrOngoingExists) {
        throw new Error(`There is already an ${isUpcomingOrOngoingExists.status} semester exists`)
    }

    if (!isSemesterExists) {
        throw new Error("Semester not found !")
    }

    if (isAlreadyRegistered) {
        throw new Error("Semester Already Exists !");
    }

    const result = await semesterRegModel.create(req.body);
    res.send(result)
})

const getAllSemesterReg = catchAsync(async (req, res) => {
    const query = req.query;
    const searchableFields = [""]
    const result = new QueryBuilder(semesterRegModel.find().populate("academicSemester"), query).search(searchableFields).filtering().paginate().fields()
    res.send(await result.modelQuery)
})

const getSemesterRegById = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await semesterRegModel.findById(id)
    res.send(result)
})

const updateSemRegByID = catchAsync(async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const checkSemester = await semesterRegModel.findById(id);
    if (checkSemester?.status === 'ENDED') {
        throw new Error(`This semester is alreadty ended !!`)
    }

    if(checkSemester?.status === 'UPCOMING' && body?.status === 'ENDED'){
        throw new Error(`You cannot switch directly to ENDED from UPCOMING !!`)
    }
    if(checkSemester?.status === 'ONGOING' && body?.status === 'UPCOMING'){
        throw new Error(`You cannot go back ONGOING to UPCOMING !!`)
    }

    const result = await semesterRegModel.findByIdAndUpdate(id, body, { new: true })
    res.send(result)
})


export const semesterRegController = {
    createSemesterRegistration, getAllSemesterReg, getSemesterRegById, updateSemRegByID
} 