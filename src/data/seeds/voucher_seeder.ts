import { generateRandomString, toBase64, voucherCodeEncrypt } from '../../helpers/utilities';
import { Voucher } from '../entity';
import knex from '../knex';

const voucherSeeder = async function() {
  const createVoucher = () => {
    return {
      voucher_code: voucherCodeEncrypt(toBase64(generateRandomString(8))),
    }
  }
  const exist = await Voucher.findOne(null, {});
  if (!exist) {
    for (let i = 0; i < 1000; i++) {
      await knex('vouchers').insert(createVoucher());
    }
  }
};

export default voucherSeeder;