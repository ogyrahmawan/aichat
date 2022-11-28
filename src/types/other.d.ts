export interface TypedCustomeRequest<T, L> extends Express.Request {
    body: T,
    params: L
}

export type TypedParamsWithId = {
    id: number,
}