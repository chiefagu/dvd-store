import { makeGetMovies } from "./get-movies.mjs";

describe("get movies controller", () => {
  let getMovies;
  const logger = { warn: jest.fn() };
  const listMovies = jest.fn();

  beforeAll(() => {
    getMovies = makeGetMovies({ logger, listMovies });
  });

  describe("successfully GETs movies", () => {
    it("return a status code of 200 and the movies", async () => {
      const headers = { "Content-Type": "application/json" };

      const movies = {
        title: "a title",
        genre: { _id: "1", name: "Action" },
        numberInStock: 100,
        dailyRentalRate: 50,
      };

      const request = {
        body: movies,
      };

      listMovies.mockResolvedValue(movies);

      const actual = await getMovies(request);

      expect(listMovies).toHaveBeenCalledWith(movies);
      expect(listMovies).toHaveBeenCalledTimes(1);

      expect(actual).toMatchObject({
        headers,
        statusCode: 200,
        body: movies,
      });
    });
  });

  describe("failed to GET movies", () => {
    it("return a status code of 400 and error message", async () => {
      const headers = { "Content-Type": "application/json" };

      const movies = {
        title: "a title",
        genre: { _id: "1", name: "Action" },
        numberInStock: 100,
        dailyRentalRate: 50,
      };

      const request = {
        body: movies,
      };

      const error = new Error("bad");
      listMovies.mockRejectedValue(error);

      const actual = await getMovies(request);

      expect(listMovies).toHaveBeenCalledWith(movies);
      expect(listMovies).toHaveBeenCalledTimes(1);

      expect(actual).not.toMatchObject({
        headers,
        statusCode: 200,
        body: movies,
      });

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
