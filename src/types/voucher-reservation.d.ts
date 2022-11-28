import { ReservationStatus } from "../data/entity/voucher-reservation"

export type CreateVoucherReservationType = {
    voucher_id: number,
    customer_id: number,
    status: ReservationStatus.Requested,
    expired_at: string,
}

export type UpdateStockToExpiredType = {
    voucher_ids: number[],
    voucher_reservation_ids: number[],
}

export type UpdateVoucherReservationType = {
    status: ReservationStatus,
}

export type VoucherReservaationType = {
    id: number,
    voucher_id: number,
    customer_id: number,
    status: ReservationStatus,
    exipired_at: Date,
    created_at: Date,
    updated_at: Date,
}