import { Knex } from "knex";
import { errors } from "../../helpers";
import { CreateVoucherReservationType, VoucherReservaationType } from "../../types/voucher-reservation";
import { VoucherReservation } from "../entity";
import { ReservationStatus } from "../entity/voucher-reservation";

const createReservation = async (trx: Knex.Transaction | null, data: CreateVoucherReservationType) => {
    try {
        await VoucherReservation.create(trx, data);
    } catch (error) {
        throw new errors.internalError.CreateResourceError('reserve voucher', error);
    }
}

const getExpiredVoucherReservation = async(trx: Knex.Transaction | null, limit: number): Promise<VoucherReservaationType[]> => {
    try {
        const where = {
            status: VoucherReservation.ReservationStatus.Requested,
        }
        const resp = await VoucherReservation.find(trx, where, VoucherReservation.selectableProps)
            .whereRaw('expired_at <= NOW()')
            .limit(limit)
            .forUpdate();

        return resp;
    } catch (error) {
        throw new errors.internalError.FindResourceError('expired voucher reservation', error);
    }
}

const updateStatusVoucherReservation = async (trx: Knex.Transaction | null, reservationId: number[], status: ReservationStatus) => {
    try {
        const where = {};
        await VoucherReservation.updateWhere(trx, where, { status})
            .whereIn(`${VoucherReservation.tableName}.id`, reservationId);
    } catch (error) {
        throw new errors.internalError.UpdateResourceError('update voucher reservation', error);
    }
}

const getReservationByCustomerId = async (trx: Knex.Transaction | null, customerId: number): Promise<VoucherReservaationType> => {
    try {
        const where = {
            customer_id: customerId,
        }

        const resp = await VoucherReservation.find(trx, where, VoucherReservation.selectableProps)
            .limit(1)
            .orderBy('id', 'DESC')
            .forUpdate();
        return resp[0]
    } catch (error) {
        throw new errors.internalError.FindResourceError('reservation by customer id', error);
    }
}

export {
    createReservation,
    getExpiredVoucherReservation,
    updateStatusVoucherReservation,
    getReservationByCustomerId,
};
