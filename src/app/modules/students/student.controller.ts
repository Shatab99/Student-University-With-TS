import { StudentModel } from "./student.model";
import catchAsync from "../../Utils/catchAsync.global";



const getAllStudents = catchAsync(async (req, res) => {
    const result = await StudentModel.find().populate('semesterId').populate({
        path :"departmentId",
        populate :{
            path : 'facultyId'
        }
    });
    res.send(result)
})

const getSingleStudent = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await StudentModel.findById(id).populate('semesterId').populate({
        path : "departmentId",
        populate :{
            path : "facultyId"
        }
    });
    res.send(result)
})

const updateStudent= catchAsync(async(req, res)=>{
    const id = req.params.id;
    const {student} = req.body;
    res.send(await StudentModel.findOneAndUpdate({id}, student))
})

export const StudendController = {
    getAllStudents, getSingleStudent, updateStudent
}