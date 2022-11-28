import { Knex } from "knex";
import { Voucher, VoucherReservation } from "../data/entity";
import knex from "../data/knex";
import { voucherRepository, voucherReservationRepository } from "../data/repository";
import { UpdateVoucherPayloadType } from "../types/voucher";
import { UpdateStockToExpiredType } from "../types/voucher-reservation";

const updateStockToExpired = async (trx: Knex.Transaction, data: UpdateStockToExpiredType) => {
    // update stock reservation to expired
    await voucherReservationRepository.updateStatusVoucherReservation(trx, data.voucher_reservation_ids, VoucherReservation.ReservationStatus.Expired);

    // update stock to available and remove customer id
    const updatedStockPayload: UpdateVoucherPayloadType = {
        customer_id: null,
        status: Voucher.Status.Available,
    } 
    await voucherRepository.updateStockStatus(trx, data.voucher_ids, updatedStockPayload);
}

const cronUpdateStockToExpired = async (limit: number): Promise<number> => {
    const length = await knex.transaction(async (trx) => {
        // get expired stock reservation
        const resp = await voucherReservationRepository.getExpiredVoucherReservation(trx, limit);
        // loop to update voucher and voucher reservation
        if (resp.length) {
            // get array of voucher id and array for reservation for update
            const voucherIdsForUpdate: number[] = []
            const reservationIdsForUpdate: number[] = []
            resp.forEach(each => {
                voucherIdsForUpdate.push(each.voucher_id);
                reservationIdsForUpdate.push(each.id)
            })
            
            const payload: UpdateStockToExpiredType = {
                voucher_ids: voucherIdsForUpdate,
                voucher_reservation_ids: reservationIdsForUpdate,
            }
            await updateStockToExpired(trx, payload);
        }
        return resp.length;
    })
    return length
};

export {
    cronUpdateStockToExpired,
    updateStockToExpired,
}