export function makePutGenre({ editGenre, logger }) {
  return async function putGenre(httpRequest) {
    const headers = { "Content-Type": "application/json" };
    try {
      const genre = await editGenre({
        id: httpRequest.params.id,
        name: httpRequest.body.name,
      });
      return {
        headers,
        statusCode: 201,
        body: genre,
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
