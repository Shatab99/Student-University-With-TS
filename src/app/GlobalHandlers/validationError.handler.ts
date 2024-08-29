import mongoose, { CastError } from "mongoose";
import { TErroSource } from "../GlobalInterface/error.interface";
import { TGenericError } from "../GlobalInterface/genericError";

const ValidationErrorHandler = (err : mongoose.Error.ValidationError) :TGenericError =>{

    const errorSource : TErroSource = Object.values(err.errors).map((val :mongoose.Error.ValidatorError | CastError ) =>{
        return {
            path : val?.path,
            message : val?.message
        }
    })
    
    return{
        statusCode : 400,
        message : "Validation Error",
        errorSource
    }
}

export default ValidationErrorHandler