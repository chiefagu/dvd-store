import { makeGenre } from "../index.mjs";

export function makeEditGenre({ Id, genreDb }) {
  return async function editGenre({ id, name }) {
    if (!(id && Id.validate(id))) {
      throw new Error("invalid id, must supply a valid id");
    }

    const exists = await genreDb.findById(id);

    if (!exists) {
      throw new Error("no genre found");
    }

    const { getName } = makeGenre({ name });

    return await genreDb.update(id, { name: getName() });
  };
}
