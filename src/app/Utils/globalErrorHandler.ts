/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express'

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const message = err.message || "Something went wrong !!";
    return res.status(500).json({
        success: false,
        message,
        error: err
    })
}

export default globalErrorHandler