import { makeAddGenre } from "./add-genre.mjs";
import { buildFakeGenre } from "../../../__tests__/fixtures/genre.mjs";

describe("add-genre", () => {
  let addGenre;
  const genreDb = { findByName: jest.fn(), insert: jest.fn() };
  beforeAll(() => {
    addGenre = makeAddGenre({ genreDb });
  });

  describe("finds existing genre", () => {
    it("return genre", async () => {
      const genreInfo = buildFakeGenre();

      genreDb.findByName.mockResolvedValueOnce(genreInfo);

      const actual = await addGenre(genreInfo);

      expect(genreDb.findByName).toHaveBeenCalledWith(genreInfo.name);
      expect(genreDb.findByName).toHaveBeenCalledTimes(1);

      expect(genreDb.insert).not.toHaveBeenCalled();

      expect(actual).toEqual(genreInfo);
    });
  });

  describe("A unique genre", () => {
    it("save genre", async () => {
      const genreInfo = buildFakeGenre();

      genreDb.findByName.mockResolvedValueOnce(null);
      genreDb.insert.mockResolvedValueOnce(genreInfo);

      const actual = await addGenre(genreInfo);

      expect(genreDb.findByName).toHaveBeenCalledWith(genreInfo.name);
      expect(genreDb.findByName).toHaveBeenCalledTimes(1);

      expect(genreDb.insert).toHaveBeenCalledWith({ name: genreInfo.name });
      expect(genreDb.insert).toHaveBeenCalledTimes(1);

      expect(actual).toEqual(genreInfo);
    });
  });
});
