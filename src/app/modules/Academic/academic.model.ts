import { Schema, model } from "mongoose";
import { AcademicSemester } from "./academic.interface";
import { SemesterCode, SemesterMonth, SemesterName } from "./academic.const";

const academicSemesterSchema = new Schema<AcademicSemester>({
  name: {
    type: String,
    enum: SemesterName,
    required: true
  },
  code: {
    type: String,
    enum: SemesterCode,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  startMonth: {
    type: String,
    enum: SemesterMonth,
    required: true
  },
  endMonth: {
    type: String,
    enum: SemesterMonth,
    required: true
  }
});

academicSemesterSchema.pre('save', async function (next) {
  const isExistSemester = await AcademicSemesterModel.findOne({
    name: this.name, year: this.year
  })
  if (isExistSemester) {
    throw new Error('Semester Already Exists !!')
  }
  next()
})



// Create the Mongoose model
export const AcademicSemesterModel = model<AcademicSemester>('AcademicSemester', academicSemesterSchema);