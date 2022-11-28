import { Response } from 'express';
import * as apiResponse from './apiResponse';
import HTTP_CODE from './httpCode';
import INTERNAL_CODE from './internalCode';

/**
 * Good Response http handler
 */
export const ok = (res: Response, message: string, data?: any) => {
    const response = apiResponse.successResponse(
        INTERNAL_CODE.SUCCESS.OK.code,
        INTERNAL_CODE.SUCCESS.OK.status,
        message,
        data,
    );
    res.status(HTTP_CODE.SUCCESS.OK.code).send(response);
};

export const okPagination = (
    res: Response,
    message: string,
    data: any,
    draw: string,
    recordsTotal: number,
    recordsFiltered: number,
) => {
    const response = apiResponse.successPaginationResponse(
        INTERNAL_CODE.SUCCESS.OK.code,
        INTERNAL_CODE.SUCCESS.OK.status,
        message,
        data,
        draw,
        recordsTotal,
        recordsFiltered,
    );
    res.status(HTTP_CODE.SUCCESS.OK.code).send(response);
};

export const created = (res: Response, message: string, data: any) => {
    res.status(HTTP_CODE.SUCCESS.CREATED.code).send(
        apiResponse.successResponse(
            INTERNAL_CODE.SUCCESS.CREATED.code,
            INTERNAL_CODE.SUCCESS.CREATED.status,
            message,
            data,
        ),
    );
};

/**
 * Bad Response http handler
 */
export const notFound = (res: Response, errors: any) => {
    res.status(HTTP_CODE.CLIENT_ERROR.NOT_FOUND.code).send(
        apiResponse.errorResponse(errors),
    );
};
export const badRequest = (res: Response, errors: any) => {
    res.status(HTTP_CODE.CLIENT_ERROR.BAD_REQUEST.code).send(
        apiResponse.errorResponse(errors),
    );
};
export const unauthorized = (res: Response, errors: any) => {
    res.status(HTTP_CODE.CLIENT_ERROR.UNAUTHORIZED.code).send(
        apiResponse.errorResponse(errors),
    );
};
export const forbidden = (res: Response, errors: any) => {
    res.status(HTTP_CODE.CLIENT_ERROR.FORBIDDEN.code).send(
        apiResponse.errorResponse(errors),
    );
};
export const internalServerError = (res: Response, errors: any) => {
    res.status(HTTP_CODE.SERVER_ERROR.INTERNAL_SERVER_ERROR.code).send(
        apiResponse.errorResponse(errors),
    );
};

/**
 * Handler general error
 */
export const errorHandler = (
    res: Response,
    responseCode: number,
    errors: any,
) => {
    switch (responseCode) {
        case HTTP_CODE.CLIENT_ERROR.NOT_FOUND.code: {
            notFound(res, errors);
            break;
        }
        case HTTP_CODE.CLIENT_ERROR.BAD_REQUEST.code: {
            badRequest(res, errors);
            break;
        }
        case HTTP_CODE.CLIENT_ERROR.UNAUTHORIZED.code: {
            unauthorized(res, errors);
            break;
        }
        case HTTP_CODE.CLIENT_ERROR.FORBIDDEN.code: {
            forbidden(res, errors);
            break;
        }
        case HTTP_CODE.SERVER_ERROR.INTERNAL_SERVER_ERROR.code: {
            internalServerError(res, errors);
            break;
        }
        default: {
            internalServerError(res, errors);
            break;
        }
    }
};
