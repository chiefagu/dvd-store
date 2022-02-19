import { Id } from "../../utils/Id.mjs";
import { makeDeleteMovie } from "./delete-movie.mjs";

describe("delete movie controller", () => {
  let deleteMovie;
  const removeMovie = jest.fn();
  const logger = { warn: jest.fn() };

  beforeAll(() => {
    deleteMovie = makeDeleteMovie({ removeMovie, logger });
  });

  it("fails to delete a movie", async () => {
    const movie = { id: Id.makeId(), title: "A movie title" };

    const headers = { "Content-Type": "application/json" };

    const request = {
      params: { id: movie.id },
    };
    const error = new Error("bad");
    removeMovie.mockRejectedValueOnce(error);

    const deleted = await deleteMovie(request);

    expect(logger.warn).toHaveBeenCalledWith(error.message, error);
    expect(logger.warn).toHaveBeenCalledTimes(1);

    expect(deleted).toMatchObject({
      headers,
      statusCode: 400,
      body: error.message,
    });
  });

  it("successfully deletes the movie with the given id", async () => {
    const movie = { id: Id.makeId(), title: "A movie title" };

    const headers = { "Content-Type": "application/json" };

    const request = {
      params: { id: movie.id },
    };

    removeMovie.mockResolvedValue(movie);

    const deleted = await deleteMovie(request);

    expect(logger.warn).not.toHaveBeenCalled();

    expect(deleted).toMatchObject({
      headers,
      statusCode: 200,
      body: movie,
    });
  });
});
