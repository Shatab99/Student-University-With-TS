import { z } from "zod";

const startTimeEndTimeSchema = z.string().refine(time => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/
    return regex.test(time)
}, { message: "Invalid Time Format" })

const createValidation = z.object({
    body: z.object({
        semesterRegistration: z.string(),
        academicSemester: z.string(),
        academicDepartment: z.string(),
        course: z.string(),
        faculty: z.string(),
        maxCapacity: z.number().min(1, "Max capacity must be at least 1"),
        section: z.number().min(1, "Section must be at least 1"),
        days: z.array(z.enum(["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"])).min(1, "At least one day must be selected"),
        startTime: startTimeEndTimeSchema,
        endTime: startTimeEndTimeSchema
    }).refine(body => {
        const start = new Date(`2000-01-10T${body.startTime}:00`);
        const end = new Date(`2000-01-10T${body.endTime}:00`);
        return start < end
    }, { message: "Start time must be smaller than end time" })
});
const updateValidation = z.object({
    body: z.object({
        faculty: z.string(),
        maxCapacity: z.number().min(1, "Max capacity must be at least 1"),
        section: z.number().min(1, "Section must be at least 1"),
        days: z.array(z.enum(["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"])).min(1, "At least one day must be selected"),
        startTime: startTimeEndTimeSchema,
        endTime: startTimeEndTimeSchema
    }).refine(body => {
        const start = new Date(`2000-01-10T${body.startTime}:00`);
        const end = new Date(`2000-01-10T${body.endTime}:00`);
        return start < end
    }, { message: "Start time must be smaller than end time" })
});



export const offeredCourseValidation = {
    createValidation, updateValidation
}
