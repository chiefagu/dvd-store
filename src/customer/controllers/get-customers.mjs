export function makeGetCustomers({ listCustomers, logger }) {
  return async function getCustomers() {
    const headers = { "Content-Type": "application/json" };
    try {
      const customers = await listCustomers();
      return {
        headers,
        statusCode: 200,
        body: { message: customers },
      };
    } catch (e) {
      logger.warn(e.message, e);
      return {
        headers,
        statusCode: 400,
        body: { message: e.message },
      };
    }
  };
}
