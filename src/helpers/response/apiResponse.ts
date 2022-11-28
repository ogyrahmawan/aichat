export const errorResponse = (errors: any) => {
    const response = {
        errors: errors.errors,
        meta: errors.meta,
    };

    delete response.errors.meta;

    return response;
};

export const successResponse = (
    code: string,
    status: string,
    msg: string,
    data: any,
) => ({
    meta: {
        code,
        status,
        message: msg,
    },
    data,
});

export const successPaginationResponse = (
    code: string,
    status: string,
    msg: string,
    data: any,
    draw: string,
    recordsTotal: number,
    recordsFiltered: number,
) => ({
    meta: {
        code,
        status,
        message: msg,
        draw,
        recordsTotal,
        recordsFiltered,
    },
    data,
});
