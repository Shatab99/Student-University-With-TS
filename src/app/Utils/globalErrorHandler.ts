/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod';
import { TErroSource } from '../GlobalInterface/error.interface';
import handleZodError from '../GlobalHandlers/zodError.handler';
import config from '../config';
import ValidationErrorHandler from '../GlobalHandlers/validationError.handler';
import castErrorHandler from '../GlobalHandlers/castError.handler';

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong !!";

    let errorSource : TErroSource = [{
        path :'',
        message : 'Something went wrong !'
    }]


    if(err instanceof ZodError){
        const error = handleZodError(err);
        statusCode = error.statusCode;
        message = error.message;
        errorSource = error.errorSource
    }else if(err?.name === 'ValidationError'){
        const error = ValidationErrorHandler(err)
        statusCode = error.statusCode;
        message = error.message;
        errorSource = error.errorSource
    }else if(err?.name === 'CastError' ){
        const error = castErrorHandler(err)
        statusCode = error.statusCode;
        message = error.message;
        errorSource = error.errorSource
    }

    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        // err,
        stack : config.nodeEnv === 'development' ?  err.stack : 'Unaccessable for production ',
    })
}

export default globalErrorHandler