import { z } from 'zod';
import { SemesterCode, SemesterMonth, SemesterName } from './academic.const';

// Define the Zod schema for AcademicSemester
const academicValidationSchema = z.object({
    body: z.object({
        name: z.enum([...SemesterName] as [string]),
        code: z.enum([...SemesterCode] as [string]),
        year: z.string(),
        startMonth: z.enum([...SemesterMonth] as [string]),
        endMonth: z.enum([...SemesterMonth] as [string])
    })
});


const updateacademicValidationSchema = z.object({
    body: z.object({
        name: z.enum([...SemesterName] as [string]).optional(),
        code: z.enum([...SemesterCode] as [string]).optional(),
        year: z.string().optional(),
        startMonth: z.enum([...SemesterMonth] as [string]).optional(),
        endMonth: z.enum([...SemesterMonth] as [string]).optional()
    })
});

export const academicValidate = { academicValidationSchema , updateacademicValidationSchema };
