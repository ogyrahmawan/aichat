import knex from "../knex";

const createCustomerTable = async () => {
    // check table is exist or not
    const exist = await knex.schema.hasTable('customers');
    if (!exist) {
        return knex.schema.createTable('customers', (table) => {
            table.increments();
            table.string('first_name', 255).notNullable();
            table.string('last_name', 255).notNullable();
            table.string('gender', 50).notNullable();
            table.date('date_of_birth').notNullable();
            table.string('contact_number', 50).notNullable();
            table.string('email', 255).unique().notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table
                .timestamp('updated_at')
                .defaultTo(
                    knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
                );
        });
    }
};

export default createCustomerTable;