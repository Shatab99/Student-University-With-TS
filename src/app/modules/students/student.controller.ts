/* eslint-disable @typescript-eslint/no-unused-vars */
import { StudentModel } from "./student.model";
import catchAsync from "../../Utils/catchAsync.global";
import QueryBuilder from "../../builder/Query.Builder";



const getAllStudents = catchAsync(async (req, res) => {

    const query = req.query
    const searchableFields = ['email', 'name.lastName', 'address.presentAddress']
    const studentQuery = new QueryBuilder(StudentModel.find().populate('semesterId')
        .populate({
            path: "departmentId",
            populate: {
                path: 'facultyId'
            }
        }), query).search(searchableFields).filtering().paginate().fields()

    res.send(await studentQuery.modelQuery);

})

const getSingleStudent = catchAsync(async (req, res) => {
    const id = req.params.id;
    const result = await StudentModel.findById(id).populate('semesterId').populate({
        path: "departmentId",
        populate: {
            path: "facultyId"
        }
    });
    res.send(result)
})

const updateStudent = catchAsync(async (req, res) => {
    const id = req.params.id;
    const { student } = req.body;
    const { name, localGuardian, guardianInfo, contactNo, address, ...remaiming } = student;
    // eslint-disable-next-line prefer-const
    let modifiedStudent = { ...remaiming }

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedStudent[`name.${key}`] = value;
        }
    }

    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedStudent[`localGuardian.${key}`] = value;
        }
    }

    if (guardianInfo && Object.keys(guardianInfo).length) {
        for (const [key, value] of Object.entries(guardianInfo)) { // ['fatherOccupation' , "engineer"]
            modifiedStudent[`guardianInfo.${key}`] = value
        }
    }

    if (contactNo && Object.keys(contactNo)) {
        for (const [key, value] of Object.entries(contactNo)) {
            modifiedStudent[`contactNo.${key}`] = value;
        }
    }

    if (address && Object.keys(address).length) {
        for (const [key, value] of Object.entries(address)) {
            modifiedStudent[`address.${key}`] = value
        }
    }


    res.send(await StudentModel.findOneAndUpdate({ id }, modifiedStudent, { new: true }))
})


export const StudendController = {
    getAllStudents, getSingleStudent, updateStudent
}


