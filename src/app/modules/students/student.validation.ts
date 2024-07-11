import { z } from 'zod';

const studentNameSchema = z.object({
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string()
});

const stuContactNoSchema = z.object({
    studentNumber: z.string(),
    emergencyNumber: z.string()
});

const stuAddressSchema = z.object({
    presentAddress: z.string(),
    permanentAddress: z.string()
});

const stuGuardianSchema = z.object({
    fatherName: z.string(),
    fatherProfession: z.string(),
    motherName: z.string(),
    motherProfession: z.string()
});

const stuLocalGuardianSchema = z.object({
    Name: z.string(),
    contactNo: z.string(),
    address: z.string()
});

const studentSchema = z.object({
    body: z.object({
        password: z.string(),
        student: z.object({
            name: studentNameSchema,
            gender: z.string(),
            dateOfBirth: z.string(),
            email: z.string().email(),
            contactNo: stuContactNoSchema,
            bloodGroup: z.string(),
            address: stuAddressSchema,
            guardianInfo: stuGuardianSchema,
            localGuardian: stuLocalGuardianSchema
        }),
    })
});

// Export the schema for use in your controllers
export default  studentSchema ;
