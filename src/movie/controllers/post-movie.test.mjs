import { makePostMovie } from "./post-movie.mjs";
import { Id } from "../../utils/index.mjs";

describe("post movie controller", () => {
  const addMovie = jest.fn();
  const logger = { warn: jest.fn() };
  let postMovie;

  beforeAll(() => {
    postMovie = makePostMovie({ addMovie, logger });
  });

  it("successfully posts a movie", async () => {
    const userInput = {
      id: Id.makeId(),
      title: "A title",
      numberInStock: "100",
      dailyRentalRate: "10",
    };

    const headers = { "Content-type": "application/json" };

    const request = {
      body: userInput,
    };

    addMovie.mockResolvedValue(userInput);

    try {
      const movie = await postMovie(request);

      expect(addMovie).toHaveBeenCalledWith(request.body);
      expect(addMovie).toHaveBeenCalledTimes(1);

      expect(movie).toMatchObject({
        headers,
        statusCode: 200,
        body: userInput,
      });
    } catch (e) {
      expect(e.message).toBeNull();
    }
  });

  it("fails to posts a movie", async () => {
    const userInput = {
      id: Id.makeId(),
      title: "A title",
      numberInStock: "100",
      dailyRentalRate: "10",
    };

    const headers = { "Content-type": "application/json" };

    const request = {
      body: userInput,
    };

    const error = new Error("tears");

    addMovie.mockRejectedValue(error);

    const movie = await postMovie(request);

    expect(addMovie).toHaveBeenCalledWith(request.body);
    expect(addMovie).toHaveBeenCalledTimes(1);

    expect(logger.warn).toHaveBeenCalledWith(error.message, error);
    expect(logger.warn).toHaveBeenCalledTimes(1);

    expect(movie).not.toMatchObject({
      headers,
      statusCode: 200,
      body: userInput,
    });

    expect(movie).toMatchObject({
      headers,
      statusCode: 400,
      body: error.message,
    });
  });
});
