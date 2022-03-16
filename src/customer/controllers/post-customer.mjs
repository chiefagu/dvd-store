export function makePostCustomer({ addCustomer, logger }) {
  return async function postCustomer(httpRequest) {
    const headers = { "Content-Type": "application/json" };
    try {
      const customer = await addCustomer(httpRequest.body);
      return {
        headers,
        statusCode: 201,
        body: { message: customer },
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
