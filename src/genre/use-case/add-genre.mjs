import { makeGenre } from "../index.mjs";

export function makeAddGenre({ genreDb }) {
  return async function addGenre(genreInfo) {
    const { getName } = makeGenre(genreInfo);

    const exists = await genreDb.findByName(getName());

    if (exists) {
      return exists;
    }

    return await genreDb.insert({ name: getName() });
  };
}
