import mongoose, { Schema } from "mongoose";
import { TAcademicFaculty } from "./faculty.interface";

const facultSchema = new Schema<TAcademicFaculty>({
    name : {
        type : String,
        required : true,
        unique : true
    }
},{ timestamps : true})


export const facultModal = mongoose.model<TAcademicFaculty>("Faculty", facultSchema);