import knex, { Knex } from "knex";
import { errors } from "../../helpers";
import { UpdateStockForReserveType, UpdateVoucherPayloadType, VoucherType } from "../../types/voucher";
import { Voucher } from "../entity";

const getAvailableVoucherForUpdate = async (trx: Knex.Transaction | null): Promise<VoucherType> => {
    try {
        const where = {
            status: Voucher.Status.Available
        }
        const resp = await Voucher.find(trx, where, Voucher.selectableProps)
            .limit(1)
            .forUpdate();

        return resp[0];
    } catch (error) {
        throw new errors.internalError.FindResourceError('available voucher', error);
    }
}

const getVoucherByCustomerId = async (trx: Knex.Transaction | null, customerId: number): Promise<VoucherType> => {
    try {
        const where = {
            customer_id: customerId
        }
        const resp = await Voucher.findOne(trx, where);
        return resp;
    } catch (error) {
        throw new errors.internalError.FindResourceError('voucher by customer id', error);
    }
}
const updateStockStatus = async (trx: Knex.Transaction | null, voucherIds: number[], data: UpdateVoucherPayloadType) => {
    try {
        const where = {}
        await Voucher.updateWhere(trx, where, data)
            .whereIn(`${Voucher.tableName}.id`, voucherIds);
    } catch (error) {
        throw new errors.internalError.UpdateResourceError('update stock', error);
    }
}

const reserveStock = async (trx: Knex.Transaction | null, id: number, data: UpdateStockForReserveType) => {
    try {
        await Voucher.update(trx, id, data);
    } catch (error) {
        throw new errors.internalError.UpdateResourceError('voucher', error);
    }
}

const getVoucherByIdForUpdate = async (trx: Knex.Transaction | null, id: number): Promise<VoucherType> => {
    try {
        const resp = await Voucher.find(trx, { id }, Voucher.selectableProps)
            .forUpdate();
        return resp[0];
    } catch (error) {
        throw new errors.internalError.FindResourceError('voucher by id', error);
    }
}

export {
    getAvailableVoucherForUpdate,
    updateStockStatus,
    reserveStock,
    getVoucherByCustomerId,
    getVoucherByIdForUpdate,
}