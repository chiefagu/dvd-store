import { makeEditGenre } from "./edit-genre.mjs";
import { Id } from "../../utils/index.mjs";
import { buildFakeGenre } from "../../../__tests__/fixtures/genre.mjs";

describe("edit-genre use-case", () => {
  const genreDb = { findById: jest.fn(), update: jest.fn() };
  let editGenre;
  beforeAll(() => {
    editGenre = makeEditGenre({ Id, genreDb });
  });

  describe("when invalid id is supplied", () => {
    it("throws an error", async () => {
      const genre = buildFakeGenre({ id: "bad" });
      try {
        await editGenre(genre);
      } catch (e) {
        expect(e.message).toMatchInlineSnapshot(
          `"invalid id, must supply a valid id"`
        );
      }
    });
  });

  describe("when no matching genre found", () => {
    it("throws an error", async () => {
      const genre = buildFakeGenre({ id: Id.makeId() });

      genreDb.findById.mockResolvedValueOnce(null);

      try {
        await editGenre(genre);
      } catch (e) {
        expect(e.message).toMatchInlineSnapshot(`"no genre found"`);
      }
    });
  });

  describe("when matching genre is found", () => {
    it("updates the genre info", async () => {
      const genre = { id: Id.makeId(), name: "Comedy" };

      genreDb.findById.mockResolvedValue(genre);
      genreDb.update.mockResolvedValue(genre);

      const actual = await editGenre(genre);

      expect(genreDb.findById).toHaveBeenCalledWith(genre.id);
      expect(genreDb.findById).toHaveBeenCalledTimes(1);

      expect(genreDb.update).toHaveBeenCalledWith(genre.id, {
        name: genre.name,
      });
      expect(genreDb.update).toHaveBeenCalledTimes(1);

      expect(actual).toEqual(genre);
    });
  });
});
