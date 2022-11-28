export type CustomerType = {
    id: number,
    first_name: string,
    last_name: string,
    gender: string,
    date_of_birth: string,
    contact_number: string,
    email: string,
    created_at: Date,
    updated_at: Date,
}

export type CheckEligebleQuery = {
    customer_id: number,
}

export type CustomerEligibleRawResponseType = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    monthly_spent_nominal: number,
    monthly_spent_frequence: number,
    eligible_status: boolean,
}

export type UploadPhotoBodyType = {
    image: string,
}

export type UploadPhotoReqBodyType = {
    image: string,
}