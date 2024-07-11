import catchAsync from "../../Utils/catchAsync.global";
import { facultModal } from "./faculty.modal";

const createFaculty = catchAsync(async (req, res) => {
    res.send(await facultModal.create(req.body));
})


const getAllFaculties = catchAsync(async(req , res)=>{
    res.send(await facultModal.find())
})

const getSingleFaculty = catchAsync(async (req, res)=>{
    res.send(await facultModal.findById(req.params.id))
})

const updateFacultyById = catchAsync(async (req, res)=>{
    const updatedBody =req.body
    res.send(await facultModal.findByIdAndUpdate(req.params.id, {updatedBody}))
})


export const facultyController = {
    createFaculty,getAllFaculties, getSingleFaculty, updateFacultyById 
}