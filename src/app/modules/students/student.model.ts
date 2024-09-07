import { Schema, model } from 'mongoose';
import { Address, ContactNo, Guardian, LocalGuardian, Name, Student } from './student-Interface';
import validator from 'validator';

const studentName = new Schema<Name>({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
        validate: {
            validator: (value: string) => validator.isAlpha(value),
            message: "{VALUE} is not a string"
        }
    }
});

const stuContactNo = new Schema<ContactNo>({
    studentNumber: {
        type: String,
        required: true
    },
    emergencyNumber: {
        type: String,
        required: true
    }
});

const stuAddress = new Schema<Address>({
    presentAddress: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
        required: true
    }
});

const stuGuardian = new Schema<Guardian>({
    fatherName: {
        type: String,
        required: true
    },
    fatherProfession: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    motherProfession: {
        type: String,
        required: true
    }
});

const stuLocalGuardian = new Schema<LocalGuardian>({
    Name: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
});

const studentSchema = new Schema<Student>({
    id: {
        type: String,
        required: true, 
        unique : true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'Uid is required'],
        unique: true
    },
    semesterId: {
        type: Schema.Types.ObjectId,
        ref: "AcademicSemester",
        required: [true, 'Semester Id is required'],
    },
    departmentId: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: [true, 'Semester Id is required'],
    },
    name: {
        type: studentName,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contactNo: {
        type: stuContactNo,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    address: {
        type: stuAddress,
        required: true
    },
    guardianInfo: {
        type: stuGuardian,
        required: true
    },
    localGuardian: {
        type: stuLocalGuardian,
        required: true
    },
    profileImage: {
        type: String,
    },
    isDeleted:{
        type: Boolean,
        required :true
    }
});

export const StudentModel = model<Student>("Student", studentSchema);
