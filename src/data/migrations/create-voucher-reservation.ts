import knex from "../knex";

const createVoucherReservationTable = async () => {
    // check if table exist or not
    const exist = await knex.schema.hasTable('voucher_reservation');
    if (!exist) {
        return knex.schema.createTable('voucher_reservation', (table) => {
            table.increments();
            table
                .integer('voucher_id', 20)
                .unsigned()
                .references('id')
                .inTable('vouchers')
                .notNullable();
            table
                .integer('customer_id', 20)
                .unsigned()
                .references('id')
                .inTable('customers')
                .notNullable();
            table.enum('status', ['REQUESTED', 'EXPIRED', 'DISTRIBUTED']).defaultTo('REQUESTED');
            table.timestamp('expired_at');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table
                .timestamp('updated_at')
                .defaultTo(
                    knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
                );
        });
    }
};

export default createVoucherReservationTable;