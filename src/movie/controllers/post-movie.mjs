export function makePostMovie({ addMovie, logger }) {
  return async function postMovie(httpRequest) {
    const headers = { "Content-type": "application/json" };

    try {
      const movie = await addMovie(httpRequest.body);
      return {
        headers,
        statusCode: 200,
        body: movie,
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
