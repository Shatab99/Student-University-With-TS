import { z } from "zod";

export const semesterRegValidation = z.object({
    body: z.object({
        academicSemester: z.string(),
        status: z.enum(["UPCOMING", "ONGOING", "ENDED"]).default("UPCOMING"),
        startDate: z.date(),
        endDate: z.date(),
        minCredit: z.number().min(0, "Minimum credit must be at least 0."),
        maxCredit: z.number().min(0, "Maximum credit must be at least 0."),
    })
});
