import { Status as VoucherStatus } from "../data/entity/voucher";

export type VoucherType = {
    id: number,
    voucher_code: string,
    customer_id: number,
    status: VoucherStatus,
    created_at: string,
    updated_at: string,
}

export type UpdateVoucherPayloadType = {
    customer_id?: number | null,
    status?: VoucherStatus,
}

export type UpdateStockForReserveType = {
    customer_id: number,
    status: VoucherStatus.Reserved,
}