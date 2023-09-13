export interface myApiErrorObject{
    error:ApiError;
}

export interface ApiError{
    errors: ErrorDetail;
}
export interface ErrorDetail{
    Message : string[];
}