/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from "./user.interface";
import { Student } from "../students/student-Interface";
import config from "../../config";
import { UserModel } from "./user.model";
import { StudentModel } from "../students/student.model";
import catchAsync from "../../Utils/catchAsync.global";
import {  generateStudentId } from "./user.utils";
import { AcademicSemesterModel } from "../Academic/academic.model";
import mongoose from "mongoose";

const createUser = catchAsync(async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const userData = req.body;
    const studentDataFromRequest = userData.student;

    const academicSemester: any = await AcademicSemesterModel.findById(studentDataFromRequest.semesterId);

    // Transaction 1
    const studentId = await generateStudentId(academicSemester);

    // Create user object
    const user: Partial<TUser> = {
      id: studentId,
      password: userData.password || config.defaultPass,
      needsPasswordChange: userData.needsPasswordChange,
      role: "student",
      status: userData.status,
      isDeleted: userData.isDeleted,
    };

    const userResult = await UserModel.create([user], { session });
    if (userResult.length) {
      // Create student object
      const studentData: Partial<Student> = {
        ...studentDataFromRequest,
        userId: userResult[0]._id,
        id: studentId,
      };

      const newStudent = await StudentModel.create([studentData], { session });
      await session.commitTransaction();
      res.status(201).send({ newStudent, userResult });
    } else {
      await session.abortTransaction();
      res.status(400).send({ message: "User creation failed" });
    }
  } catch (err: any) {
    await session.abortTransaction();
    next(err)
  } finally {
    session.endSession();
  }
});

const deleteUser = catchAsync(async (req, res) => {

  const session = await mongoose.startSession()
  try {
    session.startTransaction();
    const id = req.params.id;
    const resultUser = await UserModel.findOneAndUpdate({ id: id }, { isDeleted: true }, { new: true, session })
    const resultStudent = await StudentModel.findOneAndUpdate({ id: id }, { isDeleted: true }, { new: true, session })
    await session.commitTransaction()
    res.send({ resultStudent, resultUser })
  } catch (err: any) {
    await session.abortTransaction()
    console.log(err.message)
  }
  finally {
    session.endSession()
  }
})




export const UserController = {
  createUser, deleteUser
};
