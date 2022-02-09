import { buildFakeGenre } from "../../../__tests__/fixtures/genre.mjs";
import { makeGetGenres } from "./get-genres.mjs";

describe("get-genres controller", () => {
  let getGenres;

  const listGenres = jest.fn();
  const logger = { warn: jest.fn() };

  beforeAll(() => {
    getGenres = makeGetGenres({ listGenres, logger });
  });

  describe("successfully gets genres", () => {
    it("returns a list of genres", async () => {
      const genres = [buildFakeGenre(), buildFakeGenre({ name: "Action" })];

      const headers = { "Content-Type": "application/json" };

      listGenres.mockResolvedValueOnce(genres);

      const actual = await getGenres();

      expect(listGenres).toHaveBeenCalledWith(/** nothing */);
      expect(listGenres).toHaveBeenCalledTimes(1);

      expect(actual).toMatchObject({
        headers,
        statusCode: 200,
        body: genres,
      });
    });
  });

  describe("failed to gets genres", () => {
    it("returns an error message & statusCode", async () => {
      const headers = { "Content-Type": "application/json" };

      const error = new Error("blah");

      listGenres.mockRejectedValueOnce(error);

      const actual = await getGenres();

      expect(listGenres).toHaveBeenCalledWith(/** nothing */);
      expect(listGenres).toHaveBeenCalledTimes(1);

      expect(logger.warn).toHaveBeenCalledWith(error);
      expect(logger.warn).toHaveBeenCalledTimes(1);

      expect(actual).toMatchObject({
        headers,
        statusCode: 400,
        body: error.message,
      });
    });
  });
});
