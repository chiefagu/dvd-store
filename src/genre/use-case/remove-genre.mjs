export function makeRemoveGenre({ genreDb, Id }) {
  return async function removeGenre(id) {
    if (!(id && Id.validate(id))) {
      throw new Error("invalid id, you must supply a valid id");
    }

    const exists = await genreDb.findById(id);

    if (!exists) {
      throw new Error("no such genre found");
    }

    return await genreDb.remove(id);
  };
}
