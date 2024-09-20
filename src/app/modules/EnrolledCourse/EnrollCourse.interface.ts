import { Types } from "mongoose"

export type TcourseMarks = {
    classTest1 :number;
    mid: number
    classTest2 : number
    final : number
}

export type TEnrollCourse={
    semesterRegistration : Types.ObjectId
    academicSemester : Types.ObjectId
    academicDepartment : Types.ObjectId
    offeredCourse : Types.ObjectId
    course : Types.ObjectId
    student : Types.ObjectId
    faculty : Types.ObjectId
    isEnrolled : boolean
    courseMarks :  TcourseMarks
    grade : ['A+'|'A'| 'B' | 'C' | 'D' | 'F' |'NA']
    gradePoints : number
    isCompleted : boolean
}


