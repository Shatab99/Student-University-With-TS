import mongoose, { Schema } from "mongoose";
import { TDepartment } from "./department.interface";

const departmentSchema = new Schema<TDepartment>({
    name: String,
    facultyId: {
        type : Schema.Types.ObjectId,
        ref : 'Faculty'
    }
}, { timestamps: true })


departmentSchema.pre('save', async function (next) {
    const isDeptExist = await departmentModal.findOne({ name: this.name })
    if (isDeptExist) {
        throw new Error("Department already Exists !")
    }
    next()
})



export const departmentModal = mongoose.model<TDepartment>("Department", departmentSchema)