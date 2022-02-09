export function makePostGenre({ addGenre, logger }) {
  return async function postGenre(httpRequest) {
    const headers = { "Content-Type": "application/json" };
    try {
      const genre = await addGenre(httpRequest.body);

      return {
        headers,
        statusCode: 200,
        body: genre,
      };
    } catch (e) {
      logger.warn(e);
      return {
        headers,
        statusCode: 400,
        body: e.message,
      };
    }
  };
}
