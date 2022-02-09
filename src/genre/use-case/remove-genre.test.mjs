import { makeRemoveGenre } from "./remove-genre.mjs";
import { Id } from "../../utils/index.mjs";

describe("remove-genre use-case", () => {
  const genreDb = { findById: jest.fn(), remove: jest.fn() };

  let removeGenre;

  beforeAll(() => {
    removeGenre = makeRemoveGenre({ Id, genreDb });
  });

  it("throws an error when supplied an invalid id", () => {
    const genre = { id: "bad-id", name: "Horror" };

    removeGenre(genre.id).catch((e) => {
      expect(e.message).toMatchInlineSnapshot(
        `"invalid id, you must supply a valid id"`
      );
    });
  });

  it("throws an error if genre wasnt found", async () => {
    const genre = { id: Id.makeId(), name: "Horror" };

    genreDb.findById.mockResolvedValueOnce(null);

    removeGenre(genre.id).catch((error) => {
      expect(genreDb.findById).toHaveBeenCalledWith(genre.id);
      expect(genreDb.findById).toHaveBeenCalledTimes(1);

      expect(error.message).toMatchInlineSnapshot(`"no such genre found"`);
    });
  });

  it("returns the deleted genre", async () => {
    const genre = { id: Id.makeId(), name: "Horror" };

    genreDb.findById.mockResolvedValueOnce(genre);
    genreDb.remove.mockResolvedValueOnce(genre);

    const result = await removeGenre(genre.id);

    expect(genreDb.remove).toHaveBeenCalledWith(genre.id);
    expect(genreDb.remove).toHaveBeenCalledTimes(1);

    expect(result).toEqual(genre);
  });
});
