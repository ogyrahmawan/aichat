import knex from '../knex';
import baseModel from '../../helpers/model';

const name = 'Customer';
const tableName = 'customers';
const pk = `${tableName}.id`;

const props = [
    'id',
    'first_name',
    'last_name',
    'gender',
    'date_of_birth',
    'contact_number',
    'email',
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
    pk,
    props,
};
