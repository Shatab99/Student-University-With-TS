import { z } from 'zod';

export const genderSchema = z.enum(['Male', 'Female', 'Other']);
export const bloodGroupSchema = z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);

export const userNameSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    middleName: z.string().optional(),
    lastName: z.string().min(1, { message: "Last name is required" }),
});

const adminCreateValidation = z.object({
    body: z.object({
        admin: z.object({
            designation: z.string().min(1, { message: "Designation is required" }),
            name: userNameSchema,
            gender: genderSchema,
            dateOfBirth: z.string().optional(),
            email: z.string().email({ message: "Invalid email address" }),
            contactNo: z.string().min(1, { message: "Contact number is required" }),
            emergencyContactNo: z.string().min(1, { message: "Emergency contact number is required" }),
            bloodGroup: bloodGroupSchema.optional(),
            presentAddress: z.string().min(1, { message: "Present address is required" }),
            permanentAddress: z.string().min(1, { message: "Permanent address is required" }),
            profileImg: z.string().url({ message: "Invalid URL format" }).optional(),
            isDeleted: z.boolean().default(false),
        })
    })
});

export const adminValidation = {
    adminCreateValidation
}
