import knex from "../knex";

 const createPurchaseTransactonTable = async () => {
    const exist = await knex.schema.hasTable('purchase_transaction')
    if (!exist) {
        return knex.schema.createTable('purchase_transaction', (table) => {
            table.increments();
            table
                .integer('customer_id', 20)
                .unsigned()
                .references('id')
                .inTable('customers')
                .notNullable();
            table.decimal('total_spent', 10, 2).notNullable();
            table.decimal('total_saving', 10, 2).notNullable();
            table.timestamp('transaction_at').defaultTo(knex.fn.now());
        });
    }

}

export default createPurchaseTransactonTable;