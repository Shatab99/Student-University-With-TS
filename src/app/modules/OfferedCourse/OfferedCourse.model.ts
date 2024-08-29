import { model, Schema } from "mongoose";
import { TOfferedCourse } from "./OfferedCourse.interface";

const Days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const offeredCourseSchema = new Schema<TOfferedCourse>({
    semesterRegistration: {
        type: Schema.Types.ObjectId,
        ref: "SemesterResgistration",
        required: true,
    },
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: "AcademicSemester",
        required: true,
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: true,
    },
    maxCapacity: {
        type: Number,
        required: true,
    },
    section: {
        type: Number,
        required: true,
    },
    days: [
        {
            type: String,
            enum: Days
        }
    ],
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    }
});

export const OfferedCourseModel = model<TOfferedCourse>("OfferedCourse", offeredCourseSchema);
