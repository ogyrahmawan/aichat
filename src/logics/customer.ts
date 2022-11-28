import { Knex } from "knex"
import moment from "moment"
import { Voucher, VoucherReservation } from "../data/entity"
import { ReservationStatus } from "../data/entity/voucher-reservation"
import knex from "../data/knex"
import { customerRepository, voucherRepository, voucherReservationRepository } from "../data/repository"
import { errors, utilities } from "../helpers"
import { fromBase64 } from "../helpers/utilities"
import { UploadPhotoBodyType } from "../types/customer"
import { UpdateStockForReserveType, UpdateVoucherPayloadType } from "../types/voucher"
import { CreateVoucherReservationType } from "../types/voucher-reservation"

const checkEliebleCustomer = async (id: number) => {
    return await knex.transaction(async (trx: Knex.Transaction) => {
        // check customer by id first
        const customerData = await customerRepository.getCustomerById(trx, id);
        if (!customerData) throw new errors.internalError.ResourceNotFoundError('customer');
        // check transaction in last 30 days
        const checkTransactionInLast30Days = await customerRepository.getLast30DaysTransactionByIdCustomer(trx, id);
        // check if monthly transaction is exist or not
        if (!checkTransactionInLast30Days) throw new errors.internalError.ResourceNotFoundError('Monthly customer transaction')
        
        // check eligible status
        if (!checkTransactionInLast30Days.eligible_status) {
            if (checkTransactionInLast30Days.monthly_spent_frequence < 100) throw new errors.internalError.GeneralError('Monthly total transaction less than $100', checkTransactionInLast30Days.monthly_spent_nominal);
            if (checkTransactionInLast30Days.monthly_spent_frequence < 3) throw new errors.internalError.GeneralError('Monthly transaction frequence less than 3', checkTransactionInLast30Days.monthly_spent_frequence);

            throw new errors.internalError.GeneralError('Customer is not eligible', null);
        }

        // check if customer already get voucher or not
        const customerVoucher = await voucherRepository.getVoucherByCustomerId(trx, id);
        // make validation if customer have voucher
        // check if customer voucher status is reserved
        if (customerVoucher?.status === Voucher.Status.Reserved) throw new errors.internalError.GeneralError('Customer already make voucher reservation, but hasnot uploaded photo', null);

        // check if customer voucher status is redeemed
        if (customerVoucher?.status === Voucher.Status.Redeemed) throw new errors.internalError.GeneralError('Customer already redeem a voucher', null);

        // get available stock
        const stock = await voucherRepository.getAvailableVoucherForUpdate(trx);
        if (!stock) throw new errors.internalError.GeneralError('Not enougth Stock', null);
        
        // make stock reservation
        const payload: CreateVoucherReservationType = {
            voucher_id: stock.id,
            customer_id: id,
            expired_at: moment().add(10, 'minute').format('YYYY-MM-DD HH:mm:ss'),
            status: VoucherReservation.ReservationStatus.Requested,
        }
        await voucherReservationRepository.createReservation(trx, payload);

        // update stock

        const stockPayload: UpdateStockForReserveType = {
            customer_id: id,
            status: Voucher.Status.Reserved,
        }

        await voucherRepository.reserveStock(trx, stock.id, stockPayload);
        return {
            customer_id: customerData.id,
            email: customerData.email,
            monthly_spent_frequence: checkTransactionInLast30Days.monthly_spent_frequence,
            monthly_spent_nominal: checkTransactionInLast30Days.monthly_spent_nominal,
            eligible_status: !!checkTransactionInLast30Days.eligible_status,
        }
    })
}

const checkPhoto = async (base64Image: string): Promise<boolean> => {
    return true;
}

const checkUploadPhoto = async(data: UploadPhotoBodyType, customerId: number) => {
    return await knex.transaction(async (trx) => {
        // check customer by id first
        const customerData = await customerRepository.getCustomerById(trx, customerId);
        if (!customerData) throw new errors.internalError.ResourceNotFoundError('customer');

        // check photo is valid or not
        const photoValidity = await checkPhoto(data.image);
        if (!photoValidity) throw new errors.internalError.GeneralError('Photo is not eligible', null);

        // get voucher reservation data
        const reservationData = await voucherReservationRepository.getReservationByCustomerId(trx, customerId);
        if (!reservationData) throw new errors.internalError.GeneralError('failed because the customer has not clicked on the url link', null)
        if (reservationData.status === ReservationStatus.Expired) throw new errors.internalError.GeneralError('Reservation status is expired, need to make new reservation by click url link', null);

        // if requested, check expired time
        if (reservationData.status === ReservationStatus.Requested) {
            if (new Date(reservationData.exipired_at).getTime() < new Date().getTime()) {
                throw new errors.internalError.GeneralError('Reservation status is expired, need to make new reservation by click url link', null);
            }
        } 
        // check if reservation status is distributed
        if (reservationData.status === ReservationStatus.Distributed) throw new errors.internalError.GeneralError('Customer already got voucher, cannot redeem more than one voucher', null);

        // get voucher data
        const voucherData = await voucherRepository.getVoucherByIdForUpdate(trx, reservationData.voucher_id);
        if (!voucherData) throw new errors.internalError.ResourceNotFoundError(`voucher id ${reservationData.voucher_id}`);

        // distribute voucher
        await voucherReservationRepository.updateStatusVoucherReservation(trx, [reservationData.id], ReservationStatus.Distributed);

        // update voucher status
        const updateVoucherPayload: UpdateVoucherPayloadType = {
            status: Voucher.Status.Redeemed,
        };
        await voucherRepository.updateStockStatus(trx, [reservationData.voucher_id], updateVoucherPayload);

        const base64VoucherCode = utilities.voucherCodeDecrypt(voucherData.voucher_code);
        const plainVoucherCode = fromBase64(base64VoucherCode);

        return {
            voucher_code: plainVoucherCode,
        }
    })
}

export {
    checkEliebleCustomer,
    checkUploadPhoto,
    checkPhoto,
};
