import knex from '../knex';
import baseModel from '../../helpers/model';

const name = 'VoucherReservation';
const tableName = 'voucher_reservation';
const pk = `${tableName}.id`;

export enum ReservationStatus {
    Requested = 'REQUESTED',
    Expired = 'EXPIRED',
    Distributed = 'DISTRIBUTED',
}

const props = [
    'id',
    'voucher_id',
    'customer_id',
    'status',
    'expired_at',
    'created_at',
    'updated_at',
];

const selectableProps = props.map(each => `${tableName}.${each}`);

export default {
    ...baseModel({
        knex,
        name,
        tableName,
        selectableProps,
    }),
    ReservationStatus,
    pk,
    props,
};
