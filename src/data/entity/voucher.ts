import knex from '../knex';
import baseModel from '../../helpers/model';

const name = 'Voucher';
const tableName = 'vouchers';
const pk = `${tableName}.id`;

export enum Status {
    Available = 'AVAILABLE',
    Reserved = 'RESERVED',
    Redeemed = 'REDEEMED',
}

const props = [
    'id',
    'voucher_code',
    'customer_id',
    'status',
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
    Status,
    pk,
    props,
};
