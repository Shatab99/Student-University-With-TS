import { z } from "zod";


// Zod schema for TEnrollCourse
const createValidation = z.object({
    body: z.object({
        offeredCourse: z.string(),
    })
});

const updateCoourseMarks = z.object({
    body:z.object({
        semesterRegistration : z.string(),
        offeredCourse : z.string(),
        student:z.string(),
        courseMarks : z.object({
            classTest1 : z.number().optional(),
            mid : z.number().optional(),
            classTest2 : z.number().optional(),
            final : z.number().optional(),
        })
    })
})

export const enrollCourseValidation = {
   updateCoourseMarks, createValidation
}