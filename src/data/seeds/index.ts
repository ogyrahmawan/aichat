import customerSeeder from "./customer_seeder"
import transactionSeeder from "./transaction_seeder"
import voucherSeeder from "./voucher_seeder"

const initSeeder = async () => {
    await customerSeeder()
    await transactionSeeder()
    await voucherSeeder()
}

export default initSeeder