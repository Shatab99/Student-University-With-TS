import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./semesterReg.interface";

const semesterRegSchema = new Schema<TSemesterRegistration>({
    academicSemester: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "AcademicSemester"
    },
    status: {
        type: String,
        enum: ["UPCOMING", "ONGOING", "ENDED"],
        default: 'UPCOMING'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    minCredit: {
        type: Number,
        required: true
    },
    maxCredit: {
        type: Number,
        required: true
    }
}, { timestamps: true })


export const semesterRegModel = model<TSemesterRegistration>("SemesterResgistration", semesterRegSchema)
