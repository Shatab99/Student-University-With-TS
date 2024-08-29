/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import QueryBuilder from "../../builder/Query.Builder";
import catchAsync from "../../Utils/catchAsync.global";
import { courseFacultyModel, courseModel } from "./Course.model";

const createCourse = catchAsync(async (req, res) => {
    const result = await courseModel.create(req.body);
    res.send(result)
})

const getAllCourse = catchAsync(async (req, res) => {
    const query = req.query
    const searchableFields = ["title", "prefix", "code"]
    const course = new QueryBuilder(courseModel.find().populate("preRequisiteCourses.course"), query).search(searchableFields).filtering().paginate().fields()
    const result = await course.modelQuery
    res.send(result)
})

const getCourseById = catchAsync(async (req, res) => {
    const result = await courseModel.findById(req.params.id).populate("preRequisiteCourses.course")
    res.send(result)
})

const deleteCourseById = catchAsync(async (req, res) => {
    const id = req.params.id
    const result = await courseModel.findByIdAndUpdate(id, {
        isDeleted: true
    }, { new: true })
    res.send(result)
})

const updateCourseById = catchAsync(async (req, res) => {
    const { preRequisiteCourses, ...remainingData } = req.body;
    const id = req.params.id;
    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        const result = await courseModel.findByIdAndUpdate(
            id,
            remainingData,
            {
                new: true,
                session
            }
        )

        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            const haveToDeleteCourse = preRequisiteCourses.filter((el: { course: any; isDeleted: any; }) => el.course && el.isDeleted).map((el: { course: any }) => el.course)
            const haveToAddCourse = preRequisiteCourses.filter((el: { course: any; isDeleted: any; }) => el.course && !el.isDeleted)

            console.log(haveToDeleteCourse)
            const deletePreRequisiteCourses = await courseModel.findByIdAndUpdate(
                id,
                {
                    $pull: { preRequisiteCourses: { course: { $in: haveToDeleteCourse } } },
                },
                {
                    new: true,
                    session
                }
            )
            const saveIntoPreRequisiteCourses = await courseModel.findByIdAndUpdate(
                id,
                { $addToSet: { preRequisiteCourses: { $each: haveToAddCourse } } },
                {
                    new: true,
                    session
                }
            )
            await session.commitTransaction();
            await session.endSession();
            res.send({ result, deletePreRequisiteCourses, saveIntoPreRequisiteCourses })
        }

        else {
            await session.commitTransaction();
            await session.endSession()
            res.send(result)
        }
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error("Can not be updated")
    }
})

const assignFaculty = catchAsync(async (req, res) => {
    const id = req.params.id;
    const { faculty } = req.body;
    console.log(id)
    const result = await courseFacultyModel.findByIdAndUpdate(
        id,
        {
            course: id,
            $addToSet: { faculty: { $each: faculty } }
        },
        {
            upsert: true,
            new: true
        }
    )
    res.send(result);
})

const removeFaculty = catchAsync(async (req, res) => {
    const id = req.params.id;
    const { faculty } = req.body;
    const result = await courseFacultyModel.findByIdAndUpdate(
        id,
        {
            $pull: { faculty: { $in: faculty } }
        }
    )
    res.send(result)
})


export const courseController = {
    createCourse, getAllCourse, getCourseById, deleteCourseById, updateCourseById, assignFaculty, removeFaculty
}