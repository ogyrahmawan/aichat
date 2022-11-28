import knex from '../knex';
import baseModel from '../../helpers/model';

const name = 'PurchaseTransaction';
const tableName = 'purchase_transaction';
const pk = `${tableName}.id`;

const props = [
    'id',
    'customer_id',
    'total_spent',
    'total_saving',
    'transaction_at',
];

const selectableProps = props.map(each => `${tableName}.${each}`);

export default {
    ...baseModel({
        knex,
        name,
        tableName,
        selectableProps,
    }),
    pk,
    props,
};
