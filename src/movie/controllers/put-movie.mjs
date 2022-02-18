export function makePutMovie({ editMovie, logger }) {
  return async function putMovie(httpRequest) {
    const headers = { "Content-Type": "application/json" };

    try {
      const updated = await editMovie({
        id: httpRequest.params.id,
        ...httpRequest.body,
      });

      return {
        headers,
        statusCode: 201,
        body: updated,
      };
    } catch (e) {
      logger.warn(e.message, e);
      return {
        headers,
        statusCode: 400,
        body: e.message,
      };
    }
  };
}
