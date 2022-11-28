import { faker } from '@faker-js/faker';
import moment from 'moment';
import { Customer } from '../entity';
import knex from '../knex';

const customerSeeder = async function() {
  // Deletes ALL existing entries
  const createCustomer = (i: number) => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    return {
      id: i,
      first_name: firstName,
      last_name: lastName,
      gender: faker.name.gender(),
      date_of_birth: moment(faker.date.birthdate()).format('YYYY-MM-DD HH:mm:ss'),
      contact_number: faker.phone.number(),
      email: faker.helpers.unique(faker.internet.email, [
        firstName,
        lastName,
      ])
    }
  }

  // check data is exist or not
  const exist = await Customer.findOne(null, {}, Customer.selectableProps);
  if (!exist) {
    for (let i = 1; i <= 20; i++) {
      await knex('customers').insert(createCustomer(i));
    }
  }
};

export default customerSeeder;

