import { Knex } from "knex";
import { errors } from "../../helpers";
import { CustomerEligibleRawResponseType, CustomerType } from "../../types/customer";
import { Customer, PurchaseTransaction, Voucher } from "../entity";
import knex from "../knex";

const getCustomerById = async (trx: Knex.Transaction | null, id: number): Promise<CustomerType> => {
    try {
        const resp = await Customer.findById(trx, id);
        return resp;
    } catch (error) {
        throw new errors.internalError.FindResourceError('customer by id', error);
    }
}

const getLast30DaysTransactionByIdCustomer = async (trx: Knex.Transaction | null, id: number): Promise<CustomerEligibleRawResponseType> => {
    try {
        const where = {
            [`${PurchaseTransaction.tableName}.customer_id`]: id,
        }
        const select = [
            `${Customer.tableName}.id`,
            `${Customer.tableName}.first_name`,
            `${Customer.tableName}.last_name`,
            `${Customer.tableName}.email`,
            knex.raw(`sum(${PurchaseTransaction.tableName}.total_spent) as monthly_spent_nominal`),
            knex.raw(`count(${PurchaseTransaction.tableName}.total_spent) as monthly_spent_frequence`),
            knex.raw(`if (count(${PurchaseTransaction.tableName}.total_spent) < 3 OR sum(${PurchaseTransaction.tableName}.total_spent) < 100, false, true) as eligible_status`),
        ]
        const resp = await PurchaseTransaction.find(trx, where, select)
            .leftJoin(Customer.tableName, `${Customer.tableName}.id`, `${PurchaseTransaction.tableName}.customer_id`)
            .whereRaw(`transaction_at >= NOW() - INTERVAL 30 day`)
            .groupBy(`${Customer.tableName}.id`)
        console.log(resp, 'isi resp');
        return resp[0];
    } catch (error) {
        throw new errors.internalError.FindResourceError('customer transaction by id', error);
    }
}

export {
    getCustomerById,
    getLast30DaysTransactionByIdCustomer,
};
