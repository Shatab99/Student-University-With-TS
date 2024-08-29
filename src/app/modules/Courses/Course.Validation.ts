import { z } from "zod";

// Zod schema for TPreRequisiteCourses
const TPreRequisiteCoursesSchema = z.object({
  course: z.string(), // Assuming Mongoose ObjectId
  isDeleted: z.boolean(),
});

// Zod schema for TCourse
const createCourseValidation = z.object({
  body:z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z.array(TPreRequisiteCoursesSchema).optional(),
    isDeleted : z.boolean().optional()
  })
});

const updateCourseValidation = z.object({
  body:z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    preRequisiteCourses: z.array(TPreRequisiteCoursesSchema).optional(),
    isDeleted : z.boolean().optional()
  })
});

const courseFacultyValidation = z.object({
  body:z.object({
    faculty : z.array(z.string())
  })
})


export const courseValidation = {
    createCourseValidation,updateCourseValidation,courseFacultyValidation
};