export function makeListGenres({ genreDb }) {
  return async function listGenres() {
    return await genreDb.findAll();
  };
}
