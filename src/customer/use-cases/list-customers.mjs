export function makeListCustomers({ customerDb }) {
  return async function listCustomers() {
    const customers = await customerDb.findAll();

    return customers.length ? customers : [];
  };
}
