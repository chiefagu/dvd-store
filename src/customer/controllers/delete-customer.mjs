export function makeDeleteCustomer({ removeCustomer, logger }) {
  return async function deleteCustomer(httpRequest) {
    const headers = { "Content-Type": "application/json" };
    try {
      const customer = await removeCustomer(httpRequest.params.id);

      return {
        headers,
        statusCode: 200,
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
