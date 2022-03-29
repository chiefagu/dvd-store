export function makePutCustomer({ editCustomer, logger }) {
  return async function putCustomer(httpRequest) {
    const headers = { "Content-Type": "application/json" };

    try {
      const customer = await editCustomer({
        id: httpRequest.params.id,
        ...httpRequest.body,
      });
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
