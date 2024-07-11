import { z } from "zod";

const createDept = z.object({
    body : z.object({
        name : z.string(),
        facultyId : z.string()
    })
})
const updateDept = z.object({
    body : z.object({
        name : z.string().optional(),
        facultyId : z.string().optional()
    })
})


export const departmentValidation ={
    createDept,updateDept
}