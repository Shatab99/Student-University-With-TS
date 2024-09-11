import { z } from "zod";


// Zod schema for TEnrollCourse
const createValidation = z.object({
    body: z.object({
        offeredCourse: z.string(),
    })
});

export const enrollCourseValidation = {
    createValidation
}