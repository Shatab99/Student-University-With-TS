import { TErroSource } from "./error.interface";

export type TGenericError = {
    statusCode : number;
    message : string;
    errorSource : TErroSource;
}