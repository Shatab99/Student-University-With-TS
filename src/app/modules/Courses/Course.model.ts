import { model, Schema } from "mongoose";
import { TCourse, TCourseFaculty, TPreRequisiteCourses } from "./Course.Interface";


const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref:"Course"
    },
    isDeleted: {
        type: Boolean
    }

})

const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    prefix: {
        type: String,
        trim: true,
        required: true
    },
    code: {
        type: Number,
        trim: true,
        required: true
    },
    credits: {
        type: Number,
        trim: true,
        required: true
    },
    preRequisiteCourses: {
        type: [preRequisiteCoursesSchema],
        default: []
    },
    isDeleted:{
        type:Boolean,
        default: false
    }
})

export const courseModel = model<TCourse>("Course", courseSchema)

const courseFacultySchema= new Schema<TCourseFaculty>({
    course : {
        type: Schema.Types.ObjectId,
        ref : 'Course'
    },
    faculty : [{
        type: Schema.Types.ObjectId,
        ref:'Faculty'
    }]
})

export const courseFacultyModel = model<TCourseFaculty>("CourseFaculty", courseFacultySchema)

