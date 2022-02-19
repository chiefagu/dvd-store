import { makeRemoveMovie } from "./remove-movie.mjs";
import { Id } from "../../utils/index.mjs";

describe("Remove movie use-case", () => {
  let removeMovie;
  const movieDb = { findById: jest.fn(), remove: jest.fn() };

  beforeAll(() => {
    removeMovie = makeRemoveMovie({ movieDb, Id });
  });

  describe("fails to remove a movie", () => {
    it("throws an error if id is invalid", () => {
      const movie = { id: null, title: "a movie title" };

      removeMovie(movie.id)
        .catch((error) => {
          expect(error.message).toMatchInlineSnapshot(
            `"You must supply a valid id"`
          );
        })
        .then(() => {
          expect(movieDb.findById).not.toHaveBeenCalled();
        });
    });

    it("throws an error if movie is not found", () => {
      const movie = { id: Id.makeId(), title: "a movie title" };

      movieDb.findById.mockResolvedValueOnce(null);

      removeMovie(movie.id).catch((error) => {
        expect(error.message).toMatchInlineSnapshot(
          `"No such movie available"`
        );
      });
    });
  });

  describe("successfully removed a movie", () => {
    it("deletes the movie and returns the movie object", async () => {
      const movie = { id: Id.makeId(), title: "A movie title" };

      movieDb.findById.mockResolvedValueOnce(movie);
      movieDb.remove.mockResolvedValueOnce(movie);

      const deleted = await removeMovie(movie.id);

      expect(movieDb.findById).toHaveBeenCalledWith(movie.id);
      expect(movieDb.findById).toHaveBeenCalledTimes(1);

      expect(movieDb.remove).toHaveBeenCalledWith(movie.id);
      expect(movieDb.remove).toHaveBeenCalledTimes(1);

      expect(deleted).toEqual(movie);
    });
  });
});
