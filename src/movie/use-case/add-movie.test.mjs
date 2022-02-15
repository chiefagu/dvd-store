import { makeAddMovie } from "./add-movie.mjs";
import { Id } from "../../utils/index.mjs";

describe("add movie use-case", () => {
  let addMovie;
  const movieDb = { insert: jest.fn() };
  const genreDb = { findById: jest.fn() };

  beforeAll(() => {
    addMovie = makeAddMovie({ Id, movieDb, genreDb });
  });

  describe("user supplied an invalid argument", () => {
    it("throws an error if genreId is invalid", async () => {
      const userInput = { genreId: "bad id", title: "A movie title" };

      try {
        await addMovie(userInput);
      } catch (error) {
        expect(error.message).toMatchInlineSnapshot(
          `"you must supply a valid genreId"`
        );
      }
    });
  });

  describe("genre data doesn't exists", () => {
    it("throws an error", async () => {
      const userInput = { genreId: Id.makeId(), title: "A movie" };

      genreDb.findById.mockResolvedValue(null);

      try {
        await addMovie(userInput);
      } catch (error) {
        expect(error.message).toMatchInlineSnapshot(`"no genre found"`);
      }
    });

    describe("user arguments are valid", () => {
      it("successfully adds a movie", async () => {
        const userInput = {
          genreId: Id.makeId(),
          title: "A movie",
          dailyRentalRate: "100",
          numberInStock: "9",
        };

        const genre = { _id: Id.makeId(), name: "Comedy" };

        genreDb.findById.mockResolvedValue(genre);
        movieDb.insert.mockResolvedValue(userInput);

        try {
          const movie = await addMovie(userInput);

          expect(movieDb.insert).toHaveBeenCalledWith({
            title: userInput.title,
            dailyRentalRate: userInput.dailyRentalRate,
            numberInStock: userInput.numberInStock,
            genre,
          });

          expect(movieDb.insert).toHaveBeenCalledTimes(1);

          expect(movie).toEqual(userInput);
        } catch (error) {
          expect(error.message).toBeNull();
        }
      });
    });
  });
});
