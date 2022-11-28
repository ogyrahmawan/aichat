import knex from "../knex";


 const createVoucherTable = async () => {
    // check table is exist or not
    const exist = await knex.schema.hasTable('vouchers')
    if (!exist) {
        return knex.schema.createTable('vouchers', (table) => {
            table.increments();
            table.text('voucher_code').notNullable();
            table
                .integer('customer_id', 20)
                .unsigned()
                .references('id')
                .inTable('customers')
            table
                .enum('status', ['AVAILABLE', 'REDEEMED', 'RESERVED'])
                .defaultTo('AVAILABLE');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table
                .timestamp('updated_at')
                .defaultTo(
                    knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
                );
        });
    }

};

export default createVoucherTable;