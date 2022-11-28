/**
 * Created by WebStorm.
 * User: darmawanefendi
 * Date: 2019-06-18
 * Time: 17:42
 */
import { httpCode } from '../response';

interface HTTPError {
    errors: any;
    status: number;
}

class HTTPError extends Error implements HTTPError {
    constructor(message: string, errors: any) {
        super(message);
        this.name = this.constructor.name;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const notFound = (errors: any) => {
    const error = new HTTPError('Error occurred', errors);
    error.status = httpCode.CLIENT_ERROR.NOT_FOUND.code;
    return error;
};

export const badRequest = (errors: any) => {
    const error = new HTTPError('Error occurred', errors);
    error.status = httpCode.CLIENT_ERROR.BAD_REQUEST.code;
    return error;
};

export const unAuthorize = (errors: any) => {
    const error = new HTTPError('Error occurred', errors);
    error.status = httpCode.CLIENT_ERROR.UNAUTHORIZED.code;
    return error;
};

export const forbidden = (errors: any) => {
    const error = new HTTPError('Error occurred', errors);
    error.status = httpCode.CLIENT_ERROR.FORBIDDEN.code;
    return error;
};

export const internalServerError = (errors: any) => {
    const error = new HTTPError('Error occurred', errors);
    error.status = httpCode.SERVER_ERROR.INTERNAL_SERVER_ERROR.code;
    return error;
};

export const serviceRequestError = (errors: any, status = 400) => {
    const error = new HTTPError('Error occurred', errors);
    error.status = status;
    return error;
};
