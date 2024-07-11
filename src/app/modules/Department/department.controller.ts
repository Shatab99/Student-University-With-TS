import catchAsync from "../../Utils/catchAsync.global";
import { departmentModal } from "./department.model";

const createDept = catchAsync(async (req, res) => {
    res.send(await departmentModal.create(req.body))
})

const updateDeptById = catchAsync(async (req, res) => {
    const doc = req.body;
    res.send(await departmentModal.findByIdAndUpdate(req.params.id, { doc }))
})

const getAllDept = catchAsync(async (req, res) => {
    const result = await departmentModal.find().populate('facultyId')
    res.send(result)
})

const getDeptById = catchAsync(async (req, res) => {
    res.send(await departmentModal.findById(req.params.id).populate('facultyId'))
})


export const departmentController = {
    createDept, updateDeptById, getAllDept, getDeptById
}