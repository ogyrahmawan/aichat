import _ from 'lodash';
import { utilities } from '.';
import * as errors from './errors';

const validatorWrapper = (fn: any) => (body: any, key: any, value?: any) => {
    try {
        fn(body, key, value);
        return { data: true, error: null };
    } catch (e) {
        return { data: null, error: e };
    }
};

export const required = validatorWrapper(
    (body: any, key: string, placement = 'body') => {
        if (!_.has(body, key)) {
            throw new errors.internalError.InCompleteKeyError(
                key,
                null,
                placement,
            );
        }
        if (body[key] === '' || body[key] === null) {
            throw new errors.internalError.InCompleteValueError(
                key,
                null,
                placement,
            );
        }
    },
);
export const requiredBody = validatorWrapper(
    (body: any, key: string, placement = 'body') => {
        if (!_.has(body, key)) {
            throw new errors.internalError.InCompleteKeyError(
                key,
                null,
                placement,
            );
        }
    },
);

export const number = validatorWrapper((body: any, key: string) => {
    if (!utilities.isNumber(Number(body[key]))) {
        throw new errors.internalError.InvalidTypeError(key, null);
    }
});

export const string = validatorWrapper((body: any, key: string) => {
    if (!utilities.isString(body[key])) {
        throw new errors.internalError.InvalidTypeError(key, null);
    }
});

export const email = validatorWrapper((body: any, key: string) => {
    if (!utilities.validateEmail(body[key])) {
        throw new errors.internalError.InvalidTypeError(key, null);
    }
});

export const inObject = validatorWrapper(
    (body: any, key: string, object: object) => {
        if (
            body[key]
            && Object.values(object).indexOf(body[key].toUpperCase()) < 0
        ) {
            throw new errors.internalError.InvalidOptionError(key, null);
        }
    },
);
export const inArray = validatorWrapper(
    (body: any, key: string, array: Array<any>) => {
        if (!array.includes(body[key])) {
            throw new errors.internalError.InvalidOptionError(key, null);
        }
    },
);

export const integer = validatorWrapper((body: any, key: string) => {
    if (!utilities.isInteger(Number(body[key]))) {
        throw new errors.internalError.InvalidTypeError(key, null);
    }
});

export const boolean = validatorWrapper((body: any, key: string) => {
    if (typeof body[key] !== 'boolean') {
        throw new errors.internalError.InvalidTypeError(key, null);
    }
});

export const dateTime = validatorWrapper((body: any, key: string) => {
    const dtRegex = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
    if (!dtRegex.test(body[key])) throw new errors.internalError.InvalidTypeError(key, null);
});


export const isArray = validatorWrapper((body: any, key: string) => {
    if (!Array.isArray(body[key])) {
        throw new errors.internalError.InvalidTypeError(key);
    }
});

