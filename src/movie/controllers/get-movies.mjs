export function makeGetMovies({ listMovies, logger }) {
  return async function getMovies(httpRequest) {
    const headers = { "Content-Type": "application/json" };
    try {
      const movies = await listMovies(httpRequest.body);
      return {
        headers,
        statusCode: 200,
        body: movies,
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
