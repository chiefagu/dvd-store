export function makeDeleteGenre({ removeGenre, logger }) {
  return async function deleteGenre(httpRequest) {
    const headers = { "Content-Type": "application/json" };
    try {
      const genre = await removeGenre(httpRequest.params.id);

      return {
        headers,
        statusCode: 200,
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
