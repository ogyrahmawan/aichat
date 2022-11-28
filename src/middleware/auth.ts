import { NextFunction, Request, Response } from "express";
import { errors, validator } from "../helpers";
import { verifyAccessToken } from "../helpers/jwt";
import { IGetUserAuthInfoRequest, LoggedInUser } from "../types/auth";
import { RoleName } from "../variable";

const verifyToken = async (req: any, res: Response, headers: any) => {
    let token = headers.authorization;
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    const decodedJwt = verifyAccessToken(token);

    const user: LoggedInUser = {
        user_id: decodedJwt?.payload.user_id,
        username: decodedJwt?.payload.username,
        role_id: decodedJwt?.payload.role_id,
        role_name: decodedJwt?.payload.role_name,
    } 

    req.user = user;
};

export const closedAuth = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { headers } = req;
        const errorValidator = [];
        const errs: any = [];

        errorValidator.push(
            validator.required(headers, 'authorization', 'header'),
        );

        errorValidator.forEach((each) => {
            if (each.error) errs.push(each.error);
        });

        if (errs.length > 0) throw errors.httpError.badRequest(errs);

        if (headers.authorization) {
            await verifyToken(req, res, headers);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export const onlyAdmin = async (
    req: any,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { user } = req;
        if (user.role_name !== RoleName.Admin) throw new errors.internalError.Forbidden()
        next();
    } catch (error) {
        next(error);
    }
};