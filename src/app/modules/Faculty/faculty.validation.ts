import { z } from "zod";

const createValidation = z.object({
    body: z.object({
        name: z.string()
    })
})

const updateValitdation = z.object({
    body: z.object({
        name: z.string().optional()
    })
})

export const facultyValidation = {
    createValidation, updateValitdation
};