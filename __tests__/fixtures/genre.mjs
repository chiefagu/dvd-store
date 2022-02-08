import { Id } from "../../src/utils/Id.mjs";

export function buildFakeGenre(overrides) {
  const genre = { _id: Id.makeId(), name: "Comedy" };

  return {
    ...genre,
    ...overrides,
  };
}
