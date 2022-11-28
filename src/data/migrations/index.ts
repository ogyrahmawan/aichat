import createCustomerTable from "./create-customers"
import createPurchaseTransactonTable from "./create-purchase-transaction"
import createVoucherReservationTable from "./create-voucher-reservation"
import createVoucherTable from "./create-vouchers"

const initMigration = async () => {
    await createCustomerTable()
    await createPurchaseTransactonTable()
    await createVoucherTable()
    await createVoucherReservationTable()
}

export default initMigration
