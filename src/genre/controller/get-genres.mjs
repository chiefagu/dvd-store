export function makeGetGenres({ listGenres, logger }) {
  return async function getGenres() {
    const headers = { "Content-Type": "application/json" };
    try {
      const genres = await listGenres();

      return {
        headers,
        statusCode: 200,
        body: genres,
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
