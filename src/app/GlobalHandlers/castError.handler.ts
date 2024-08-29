import mongoose from "mongoose";
import { TGenericError } from "../GlobalInterface/genericError";

const castErrorHandler = (err : mongoose.Error.CastError) : TGenericError=>{

    return {
        statusCode: 500,
        message : "Invalid Id !",
        errorSource :[{
            path : err?.path,
            message : err?.message
        }]
    }
}


export default castErrorHandler