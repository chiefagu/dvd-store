export function makeDeleteMovie({ removeMovie, logger }) {
  return async function deleteMovie(httpRequest) {
    const headers = { "Content-Type": "application/json" };
    try {
      const movie = await removeMovie(httpRequest?.params?.id);
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
