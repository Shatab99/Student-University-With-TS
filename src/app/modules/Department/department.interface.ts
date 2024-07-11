import { Types } from "mongoose"

export type TDepartment = {
    name : string;
    facultyId : Types.ObjectId;
}