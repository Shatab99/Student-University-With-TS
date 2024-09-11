import { Schema, model } from "mongoose";

// Define the TcourseMarks subdocument schema
const courseMarksSchema = new Schema({
    classTest1: { type: Number, default: 0 },
    mid: { type: Number, default: 0 },
    classTest2: { type: Number, default: 0 },
    final: { type: Number, default: 0 },
},{_id : false});

// Define the TEnrollCourse schema
const enrollCourseSchema = new Schema({
    semesterRegistration: { type: Schema.Types.ObjectId, ref: 'SemesterRegistration' },
    academicSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester' },
    academicDepartment: { type: Schema.Types.ObjectId, ref: 'AcademicDepartment' },
    offeredCourse: { type: Schema.Types.ObjectId, ref: 'OfferedCourse' },
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    student: { type: Schema.Types.ObjectId, ref: 'Student' },
    faculty: { type: Schema.Types.ObjectId, ref: 'Faculty' },
    isEnrolled: { type: Boolean, default: false },
    courseMarks: { type: courseMarksSchema,default:{} },
    grade: { type: String, enum: ['A', 'B', 'C', 'D', 'F', 'NA'], default: 'NA' },
    gradePoints: { type: Number, min: 2, max: 4, default: null },
    isCompleted: { type: Boolean, default: false },
}, { timestamps: true });

export const EnrollCourseModel = model('EnrollCourse', enrollCourseSchema);

