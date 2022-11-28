import { faker } from '@faker-js/faker';
import { PurchaseTransaction } from '../entity';
import knex from '../knex';

const transactionSeeder = async function() {
  // Deletes ALL existing entries
  const createTransaction = () => {
    const customerId = Math.ceil(Math.random() * 20);
    const total_spent = +Math.random().toFixed(1) * 100;
    return {
      customer_id: customerId,
      total_spent: total_spent,
      total_saving: 0,
      transaction_at: faker.date.between('2022-10-01T00:00:00.000Z', '2022-11-T00:00:00.000Z'),
    }
  }

  // check is any data on table or not
  const exist = await PurchaseTransaction.findOne(null, {});

  if (!exist) {
    for (let i = 0; i < 50; i++) {
      await knex('purchase_transaction').insert(createTransaction());
    }
  }
};

export default transactionSeeder;