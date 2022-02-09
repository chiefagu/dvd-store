import { makePostGenre } from "./post-genre.mjs";
import { buildFakeGenre } from "../../../__tests__/fixtures/genre.mjs";

describe("post genre", () => {
  let postGenre;
  const logger = { warn: jest.fn() };
  const addGenre = jest.fn();
  beforeAll(() => {
    postGenre = makePostGenre({ addGenre, logger });
  });

  describe("successfully posts a genre", () => {
    it("returns a genre to the user", async () => {
      const genre = buildFakeGenre();
      const headers = { "Content-Type": "application/json" };

      addGenre.mockResolvedValueOnce(genre);

      const actual = await postGenre({ body: genre });

      expect(addGenre).toHaveBeenCalledTimes(1);
      expect(addGenre).toHaveBeenCalledWith(genre);

      expect(actual).toEqual({
        headers,
        statusCode: 200,
        body: genre,
      });
    });
  });

  describe("failed to post a genre", () => {
    it("responds with an error code and message", async () => {
      const genre = buildFakeGenre();
      const headers = { "Content-Type": "application/json" };
      const error = new Error("bad!");

      addGenre.mockRejectedValueOnce(error);

      const actual = await postGenre({ body: genre });

      expect(logger.warn).toHaveBeenCalledWith(error.message, error);
      expect(logger.warn).toHaveBeenCalledTimes(1);

      expect(actual).toMatchObject({
        headers,
        statusCode: 400,
        body: error.message,
      });
    });
  });
});
