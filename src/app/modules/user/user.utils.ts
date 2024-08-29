import { AcademicSemester } from "../Academic/academic.interface";
import { UserModel } from "./user.model";

const findLastStudentId = async () => {
    const lastStudent = await UserModel.findOne({ role: "student" }, { id: 1, _id: 0 }).sort({
        createdAt: -1
    }).lean()

    return lastStudent?.id ? lastStudent.id : undefined;

}

export const generateStudentId = async (payload: AcademicSemester) => {

    // this is current id 0000
    let currentId = (0).toString()

    const lastStudentId = await findLastStudentId();
    //2030 01 0001
    const lastSemesterYear = lastStudentId?.substring(0, 4)
    const lastSemesterCode = lastStudentId?.substring(4, 6)
    const currentSemesterYear = payload.year;
    const currentSemesterCode = payload.code;

    if (lastStudentId && lastSemesterCode === currentSemesterCode && lastSemesterYear === currentSemesterYear) {
        currentId = lastStudentId.substring(6);
    }

    let incrementId = (parseInt(currentId) + 1).toString().padStart(4, "0");
    incrementId = `${payload.year}${payload.code}${incrementId}`

    return incrementId;

}


