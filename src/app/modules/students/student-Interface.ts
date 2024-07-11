import { Types } from "mongoose";

export type Guardian = {
    fatherName: string;
    fatherProfession: string;
    motherName: string;
    motherProfession: string;
}

export type Name = {
    firstName: string;
    middleName: string;
    lastName: string
}

export type ContactNo = {
    studentNumber: string
    emergencyNumber: string
}

export type Address = {
    presentAddress: string;
    permanentAddress: string;
};

export type LocalGuardian = {
    Name: string;
    contactNo: string;
    address: string;
}

export type Student = {
    id: string;
    userId : Types.ObjectId;
    semesterId : Types.ObjectId;
    departmentId : Types.ObjectId;
    name: Name;
    gender: "male" | "female";
    dateOfBirth: string;
    email: string;
    contactNo: ContactNo;
    bloodGroup?: string;
    address: Address;
    guardianInfo: Guardian;
    localGuardian: LocalGuardian;
    isDeleted : boolean
}