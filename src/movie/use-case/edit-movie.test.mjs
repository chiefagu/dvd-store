import { makeEditMovie } from "./edit-movie.mjs";
import { Id } from "../../utils/index.mjs";

describe("edit movie use-case", () => {
  let editMovie;

  const movieDb = { findById: jest.fn(), update: jest.fn() };
  const genreDb = { findById: jest.fn() };

  beforeAll(() => {
    editMovie = makeEditMovie({ movieDb, genreDb, Id });
  });

  describe("supplied with invalid arguments", () => {
    it("throws an error if the id is invalid", async () => {
      const userInput = { id: "invalid", title: "a title" };

      try {
        await editMovie(userInput);
        expect(movieDb.findById).not.toHaveBeenCalled();
      } catch (error) {
        expect(error.message).toMatchInlineSnapshot(
          `"you must supply a valid id"`
        );
      }
    });

    it("throws an error if movie doesn't exist", async () => {
      const userInput = { id: Id.makeId(), title: "a title" };

      movieDb.findById.mockResolvedValueOnce(null);

      try {
        await editMovie(userInput);
        expect(movieDb.findById).toHaveBeenCalledWith(userInput.id);
        expect(movieDb.findById).toHaveBeenCalledTimes(1);
      } catch (error) {
        expect(error.message).toMatchInlineSnapshot(`"no such movie exists"`);
      }
    });

    it("throws an error if genreId is invalid", async () => {
      const userInput = {
        id: Id.makeId(),
        title: "a title",
        genreId: "invalid",
        numberInStock: 50,
        dailyRentalRate: 10,
      };

      movieDb.findById.mockResolvedValueOnce({ ...userInput });

      try {
        await editMovie(userInput);
      } catch (error) {
        expect(error.message).toMatchInlineSnapshot(
          `"Movie must have a valid genreId"`
        );
      }
    });

    it("throws an error if no genre exists", async () => {
      const userInput = {
        id: Id.makeId(),
        title: "a title",
        genreId: Id.makeId(),
        numberInStock: 50,
        dailyRentalRate: 10,
      };

      movieDb.findById.mockResolvedValueOnce({ ...userInput });

      genreDb.findById.mockResolvedValueOnce(null);

      try {
        await editMovie(userInput);
        expect(movieDb.findById).toHaveBeenCalledWith(userInput.id);
        expect(movieDb.findById).toHaveBeenCalledTimes(1);

        expect(genreDb.findById).toHaveBeenCalledWith(userInput.genreId);
        expect(genreDb.findById).toHaveBeenCalledTimes(1);
      } catch (error) {
        expect(error.message).toMatchInlineSnapshot(`"no such genre exists"`);
      }
    });
  });

  describe("supplied valid arguments", () => {
    it("successfully updates and returns the movie", async () => {
      const userInput = {
        id: Id.makeId(),
        title: "A title",
        genreId: Id.makeId(),
        numberInStock: 50,
        dailyRentalRate: 10,
      };

      movieDb.findById.mockResolvedValueOnce({ ...userInput });

      const genre = { _id: Id.makeId(), name: "Action" };
      genreDb.findById.mockResolvedValueOnce(genre);

      try {
        await editMovie(userInput);

        expect(movieDb.findById).toHaveBeenCalledWith(userInput.id);
        expect(movieDb.findById).toHaveBeenCalledTimes(1);

        expect(genreDb.findById).toHaveBeenCalledWith(userInput.genreId);
        expect(genreDb.findById).toHaveBeenCalledTimes(1);

        expect(movieDb.update).toHaveBeenCalledWith(userInput.id, {
          title: userInput.title,
          genre: { _id: genre._id, name: genre.name },
          dailyRentalRate: userInput.dailyRentalRate,
          numberInStock: userInput.numberInStock,
        });
        expect(movieDb.update).toHaveBeenCalledTimes(1);
      } catch (error) {
        expect(error.message).toBeNull();
      }
    });
  });
});
