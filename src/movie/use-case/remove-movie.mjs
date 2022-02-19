export function makeRemoveMovie({ movieDb, Id }) {
  return async function removeMovie(id) {
    if (!(id && Id.validate(id))) {
      throw new Error("You must supply a valid id");
    }

    const exists = await movieDb.findById(id);

    if (!exists) {
      throw new Error("No such movie available");
    }

    const deleted = await movieDb.remove(id);

    return deleted;
  };
}
