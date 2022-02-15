export function makeListMovies({ movieDb }) {
  return async function listMovies() {
    const movies = await movieDb.findAll();

    if (!movies?.length) {
      throw new Error("no movies found");
    }

    return movies;
  };
}
