import { ZodError, ZodIssue } from "zod"
import { TErroSource } from "../GlobalInterface/error.interface"
import { TGenericError } from "../GlobalInterface/genericError"

const handleZodError = (err : ZodError) :TGenericError=>{

    const errorSource :TErroSource = err.issues.map((issue : ZodIssue)=>{
        return {
            path : issue?.path[issue.path.length-1],
            message: issue.message
        }
    })


    return{
        statusCode : 400,
        message : "Validation Error !!",
        errorSource
    }
}

export default handleZodError